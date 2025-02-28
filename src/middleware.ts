import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userRole = req.cookies.get('sb-user-role')?.value;

  if (!userRole) {
    return NextResponse.redirect(new URL('/home', req.nextUrl.origin));
  }
  if (userRole === 'buyer') {
    return NextResponse.next();
  }
  if (pathname.startsWith('/settings') || pathname.startsWith('/order')) {
    return NextResponse.redirect(new URL('/home', req.nextUrl.origin));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/settings/:path*', '/order/:path*'],
};