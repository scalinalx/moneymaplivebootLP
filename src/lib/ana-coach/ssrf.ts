// Ana AI Coach — SSRF address filtering.
//
// isForbiddenAddress() rejects private/reserved/link-local ranges. safeLookup()
// wraps dns.lookup and errors if ANY resolved address is forbidden — used as the
// undici Agent connect.lookup so validation happens at CONNECT time on every
// connection, defeating DNS rebinding (a second resolution can't sneak in a
// private IP).

import dns from 'node:dns';

// Parse an IPv4 string to a 32-bit integer, or null if not IPv4.
function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    const b = Number(p);
    if (!Number.isInteger(b) || b < 0 || b > 255 || !/^\d+$/.test(p)) return null;
    n = (n << 8) | b;
  }
  return n >>> 0;
}

function inV4(ip: number, cidr: string): boolean {
  const [net, bitsStr] = cidr.split('/');
  const bits = Number(bitsStr);
  const netInt = ipv4ToInt(net)!;
  if (bits === 0) return true;
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  return (ip & mask) === (netInt & mask);
}

const V4_BLOCKS = [
  '0.0.0.0/8',      // "this" network
  '10.0.0.0/8',     // private
  '100.64.0.0/10',  // CGNAT
  '127.0.0.0/8',    // loopback
  '169.254.0.0/16', // link-local (cloud metadata: 169.254.169.254)
  '172.16.0.0/12',  // private
  '192.0.0.0/24',   // IETF protocol assignments
  '192.168.0.0/16', // private
  '198.18.0.0/15',  // benchmarking
  '224.0.0.0/4',    // multicast
  '240.0.0.0/4',    // reserved
  '255.255.255.255/32',
];

function isForbiddenV6(ip: string): boolean {
  const s = ip.toLowerCase().split('%')[0]; // strip zone id
  if (s === '::' || s === '::1') return true;              // unspecified / loopback
  if (s.startsWith('fc') || s.startsWith('fd')) return true; // fc00::/7 unique-local
  if (s.startsWith('fe8') || s.startsWith('fe9') || s.startsWith('fea') || s.startsWith('feb')) return true; // fe80::/10 link-local
  // IPv4-mapped (::ffff:a.b.c.d) — re-check the embedded v4.
  const mapped = s.match(/::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isForbiddenAddress(mapped[1]);
  return false;
}

export function isForbiddenAddress(ip: string): boolean {
  const v4 = ipv4ToInt(ip);
  if (v4 !== null) return V4_BLOCKS.some((cidr) => inV4(v4, cidr));
  if (ip.includes(':')) return isForbiddenV6(ip);
  // Unparseable → treat as forbidden (fail closed).
  return true;
}

export function isForbiddenHostname(host: string): boolean {
  const h = host.toLowerCase().replace(/\.$/, '');
  return h === 'localhost' || h.endsWith('.localhost') || h.endsWith('.local') || h.endsWith('.internal');
}

// undici-compatible lookup: resolves all addresses, rejects if ANY is forbidden,
// then returns them in whichever shape the caller asked for (honors options.all).
// Because this runs at connect time on every connection, a DNS-rebinding second
// resolution cannot slip a private IP past the check.
export function safeLookup(
  hostname: string,
  options: dns.LookupAllOptions | dns.LookupOneOptions | undefined,
  callback: (err: NodeJS.ErrnoException | null, address: unknown, family?: number) => void,
): void {
  const wantAll = !!(options && (options as dns.LookupAllOptions).all);
  dns.lookup(hostname, { all: true, verbatim: true }, (err, addresses) => {
    if (err) return callback(err, '', 0);
    if (!addresses || addresses.length === 0) {
      return callback(Object.assign(new Error('ENOTFOUND'), { code: 'ENOTFOUND' }), '', 0);
    }
    for (const a of addresses) {
      if (isForbiddenAddress(a.address)) {
        return callback(
          Object.assign(new Error(`[ana-coach] blocked address ${a.address} for ${hostname}`), { code: 'EACCES' }),
          '',
          0,
        );
      }
    }
    if (wantAll) return callback(null, addresses);
    callback(null, addresses[0].address, addresses[0].family);
  });
}
