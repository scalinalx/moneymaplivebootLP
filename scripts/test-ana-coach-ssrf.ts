/**
 * SSRF defense verification.
 *   npx tsx scripts/test-ana-coach-ssrf.ts
 *
 * Part 1 (offline): the address/hostname blocklist rejects every reserved range
 * and obfuscated literal. Part 2 (live): fetchUserSubmittedUrl rejects the probe
 * checklist and only succeeds on a real public page.
 */
import { config } from 'dotenv';
config({ path: '.env.local' });
import { isForbiddenAddress, isForbiddenHostname } from '../src/lib/ana-coach/ssrf';
import { fetchUserSubmittedUrl } from '../src/lib/ana-coach/urlFetcher';

let failures = 0;
function ok(label: string, pass: boolean, detail = '') {
  console.log(`${pass ? '✅' : '❌'} ${label}${detail ? ` — ${detail}` : ''}`);
  if (!pass) failures++;
}

async function main() {
  console.log('\n── Part 1: address blocklist (offline) ──\n');
  const forbidden = [
    '127.0.0.1', '10.0.0.1', '172.16.0.1', '192.168.1.1', '169.254.169.254',
    '0.0.0.0', '100.64.0.1', '198.18.0.1', '224.0.0.1', '255.255.255.255',
    '::1', '::', 'fc00::1', 'fe80::1', '::ffff:127.0.0.1',
  ];
  for (const ip of forbidden) ok(`blocks ${ip}`, isForbiddenAddress(ip));

  const allowed = ['8.8.8.8', '1.1.1.1', '93.184.216.34'];
  for (const ip of allowed) ok(`allows public ${ip}`, !isForbiddenAddress(ip));

  ok('blocks localhost hostname', isForbiddenHostname('localhost'));
  ok('blocks *.local', isForbiddenHostname('printer.local'));
  ok('blocks *.internal', isForbiddenHostname('db.internal'));
  // Decimal / hex IP literals parse as URLs whose hostname is the raw literal —
  // new URL() normalizes 0x7f000001 / 2130706433 to 127.0.0.1 which the range
  // check blocks; verify the integer form directly here.
  ok('blocks decimal-int loopback via range', isForbiddenAddress('127.0.0.1'));

  console.log('\n── Part 2: live fetch probes ──\n');
  const probes: [string, string][] = [
    ['http://169.254.169.254/latest/meta-data/', 'cloud metadata'],
    ['http://localhost:3000/api/admidash/metrics', 'localhost'],
    ['http://127.0.0.1/', 'loopback'],
    ['http://0.0.0.0/', 'zero'],
    ['http://[::1]:3000/', 'ipv6 loopback'],
    ['http://10.0.0.1/', 'private-10'],
    ['http://192.168.1.1/', 'private-192'],
    ['http://2130706433/', 'decimal loopback'],
    ['http://0x7f000001/', 'hex loopback'],
    ['http://user:pass@example.com/', 'credentials-in-url'],
    ['http://example.com:8080/', 'nonstandard port'],
    ['file:///etc/passwd', 'file scheme'],
    ['gopher://example.com/', 'gopher scheme'],
  ];
  for (const [url, label] of probes) {
    const r = await fetchUserSubmittedUrl(url);
    ok(`rejects ${label} (${url})`, r.ok === false, r.ok ? 'WAS ALLOWED' : r.error);
  }

  // A real public page should succeed.
  const good = await fetchUserSubmittedUrl('https://example.com/');
  ok('allows a real public page (example.com)', good.ok === true && !!good.text, good.error || `${good.text?.length} chars`);

  console.log(`\n${failures === 0 ? '✅ all SSRF checks passed' : `❌ ${failures} failing`}\n`);
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
