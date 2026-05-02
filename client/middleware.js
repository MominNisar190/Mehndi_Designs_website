import { NextResponse } from 'next/server';

// Protected routes that require authentication
const protectedRoutes = ['/account', '/booking'];
const adminRoutes = ['/admin'];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check for token in cookies (for SSR protection)
  // Client-side auth is handled in components
  // This middleware handles basic route structure

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
