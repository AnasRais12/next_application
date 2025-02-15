import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userRole = req.cookies.get('sb-user-role')?.value;

  // 1) Agar user role hi nahi hai, to login pe bhejo
  if (!userRole && pathname !== '/home') {
    return NextResponse.redirect(new URL('/home', req.nextUrl.origin));
  }

  if  ((pathname === '/' || pathname === '/home') && userRole){
    if (userRole === 'buyer') {
      return NextResponse.redirect(new URL('/shop/home', req.nextUrl.origin));
    } else if (userRole === 'seller') {
      return NextResponse.redirect(new URL('/sell/dashboard', req.nextUrl.origin));
    }
  }

  // 2) /shop routes → Sirf seller ke liye
  if (pathname.startsWith('/shop')) {
    // Agar user seller nahi hai (yaani buyer), to unko /sell/home pe redirect karo
    if (userRole !== 'buyer') {
      return NextResponse.redirect(new URL('/sell/dashboard', req.nextUrl.origin));
    }
  }

  // 3) /sell routes → Sirf buyer ke liye
  if (pathname.startsWith('/sell')) {
    // Agar user buyer nahi hai (yaani seller), to unko /shop/home pe redirect karo
    if (userRole !== 'seller') {
      return NextResponse.redirect(new URL('/shop/home', req.nextUrl.origin));
    }
  }

  // 4) Sab sahi hai to aage badhne do
  return NextResponse.next();
}
export const config = {
  matcher: ['/', '/home', '/shop/:path*', '/sell/:path*'],
};