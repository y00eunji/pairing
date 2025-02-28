import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

async function validateToken(token: string): Promise<boolean> {
  try {
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseUrl = isDevelopment
      ? 'http://localhost:3000'
      : process.env.NEXT_PUBLIC_BASE_URL || '';

    const response = await fetch(
      `${baseUrl}/member/oauth/token?token=${token}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) return false;

    const data = await response.json();
    return data === true;
  } catch (error) {
    console.error('토큰 검증 오류:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const redirect = NextResponse.redirect(new URL('/login', request.url));

  const pathname = request.nextUrl.pathname;

  const publicPaths = [
    '/login',
    '/',
    '/login/auth-loading',
    '/privacy-consent',
    '/onboarding',
  ];

  if (
    publicPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    )
  ) {
    return response;
  }

  const token = request.cookies.get('accessToken')?.value;

  if (!token) {
    return redirect;
  }

  const isValidToken = await validateToken(token);

  if (!isValidToken) {
    const invalidTokenRedirect = NextResponse.redirect(
      new URL('/login', request.url),
    );
    invalidTokenRedirect.cookies.delete('accessToken');
    return invalidTokenRedirect;
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|$).*)'],
};
