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
    '/public',
    '/videos',
    '/testimavatar',
  ];

  if (allowedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = '/join';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

