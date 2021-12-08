import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: any) {
  console.log(`🚀 ~ middleware ~ req`, req);

  // Token will exist if user is logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET as any,
  });
  console.log(`🚀 ~ middleware ~ token`, token);

  const { pathname } = req.nextUrl;
  console.log(`🚀 ~ middleware ~ pathname`, pathname);

  // Allow the requests if the following is true
  // 1) Its a reuest for next-auth session & provider fetching
  // 2) The token exists

  if (
    pathname.includes('/api/auth') ||
    pathname === '/images/spotify-logo.png' ||
    pathname === '/images/Spotify_Logo_CMYK_White.png' ||
    token
  ) {
    return NextResponse.next();
  }

  // Redirect them to login if they dont have token AND are requesting a protected route
  // if (!token && pathname !== '/login') {
  //   return NextResponse.redirect('/login');
  // }

  return NextResponse.next();
}
