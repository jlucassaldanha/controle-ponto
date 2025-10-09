import { auth } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse, NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/preferences'];

export async function middleware(request: NextRequest) {
	const session = await auth();
	const { pathname } = request.nextUrl

	const isLoggedIn = !!session
	const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/signin')
	const isProtectedRoute = protectedRoutes.some((route) => 
		pathname.startsWith(route)
	)

	if (isLoggedIn && isAuthRoute) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
	}
	if (!isLoggedIn && isProtectedRoute) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
  	
	return NextResponse.next()
}
export const config = {
	runtime: 'nodejs',
  	matcher: [
		'/dashboard/:path*',
		'/preferences/:path*',
		'/login',
    	'/signin',
	],
	
}