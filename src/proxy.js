
import { NextResponse } from 'next/server'
import { betterFetch } from '@better-fetch/fetch'

export async function proxy(request) {
 
  const { data: session } = await betterFetch('/api/auth/get-session', {
    baseURL: request.nextUrl.origin, 
    headers: {
      
      cookie: request.headers.get('cookie') ?? '',
    },
  })

  
  if (!session) {
    
    const loginUrl = new URL('/authentication/signin', request.url)
  
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)
    
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}


export const config = {

  matcher: ["/MyListing",'/AddRoom','/MyBookings', "/rooms/:path"], 
}