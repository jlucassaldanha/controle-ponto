import { auth } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	const session = await auth();

	if (!session) {
		return NextResponse.redirect(new URL('/login', request.url))
	}
  	
	return NextResponse.next()
}
export const config = {
	runtime: 'nodejs',
  	matcher: '/dashboard/:path*',
}