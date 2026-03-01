import { NextResponse, type NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow assets, API routes, join page, thankyou page, and Next internals
  const allowedPrefixes = [
    '/join',
    '/thankyou',
    '/api',
    '/_next',
    '/favicon',
    '/imgs',
    '/downloads',
    '/public',
    '/videos',
    '/testimavatar',
    '/success',
    '/upsell',
    '/ana-ai-offer-flow',
    '/terms',
    '/privacy',
    '/how-to-hit-10k',
    '/hit-10k-success',
    '/launch-stack',
    '/10k-template',
    '/10k-launch-lab',
    '/10k-launch-lab-upsell',
    '/10k-launch-lab-success',
    '/ana-offer-genius',
    '/100-genius-launch-ideas',
    '/100-genius-launch-ideas-success',
    '/show-dont-tell',
    '/ecosystem',
    '/vdpb',
    '/admidash',
  ];

  if (pathname === '/' || allowedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/join';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

