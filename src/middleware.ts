import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const originOf = (url: string | undefined): string | null => {
  if (!url) return null;

  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
};

const contentSecurityPolicy = (): string => {
  const eventsOrigin = originOf(process.env.EVENTS_URL);

  const connectSrc = ["'self'", eventsOrigin].filter(Boolean).join(' ');

  return [
    "default-src 'self'",
    // Inline for Next hydration, wasm for argon2 and lwk.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    `connect-src ${connectSrc}`,
    "worker-src 'self' blob:",
    "frame-src 'none'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
};

const withSecurityHeaders = (response: NextResponse): NextResponse => {
  response.headers.set('Content-Security-Policy', contentSecurityPolicy());
  return response;
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/graphql')) {
    return NextResponse.rewrite(
      new URL(
        `${process.env.SERVER_URL}${request.nextUrl.pathname}` ||
          'http://localhost:5000/api/graphql'
      )
    );
  }
  if (request.nextUrl.pathname.startsWith('/.well-known')) {
    return NextResponse.rewrite(
      new URL(
        `${process.env.SERVER_URL}${request.nextUrl.pathname}${request.nextUrl.search}` ||
          'http://localhost:5000/.well-known'
      )
    );
  }
  if (request.nextUrl.pathname.startsWith('/lnurlp')) {
    return NextResponse.rewrite(
      new URL(
        `${process.env.SERVER_URL}${request.nextUrl.pathname}${request.nextUrl.search}` ||
          'http://localhost:5000/lnurlp'
      )
    );
  }
  if (request.nextUrl.pathname.startsWith('/proxy/api/event')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('cookie', '');
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return withSecurityHeaders(NextResponse.next());
}
