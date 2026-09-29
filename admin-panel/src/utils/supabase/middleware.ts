import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, {
              ...options,
              path: '/',
              sameSite: 'lax',
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 365, // 1 Year Persistent Remember Device
            })
          )
        },
      },
    }
  )

  let user = null
  try {
    const { data, error } = await supabase.auth.getUser()
    if (!error && data?.user) {
      user = data.user
    } else {
      // Fallback to getSession to avoid kicking user out on transient network timeouts
      const { data: sessionData } = await supabase.auth.getSession()
      if (sessionData?.session?.user) {
        user = sessionData.session.user
      }
    }
  } catch {
    try {
      const { data: sessionData } = await supabase.auth.getSession()
      if (sessionData?.session?.user) {
        user = sessionData.session.user
      }
    } catch {
      // ignore
    }
  }

  const pathname = request.nextUrl.pathname
  const publicRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/auth']
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    const redirectResponse = NextResponse.redirect(url)
    // CRITICAL: Preserve any refreshed session cookies on redirect so they aren't lost!
    supabaseResponse.cookies.getAll().forEach((c) => {
      redirectResponse.cookies.set(c.name, c.value, c)
    })
    return redirectResponse
  }

  // If already logged in and visiting login, go straight to dashboard
  if (user && pathname === '/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    const redirectResponse = NextResponse.redirect(url)
    supabaseResponse.cookies.getAll().forEach((c) => {
      redirectResponse.cookies.set(c.name, c.value, c)
    })
    return redirectResponse
  }

  return supabaseResponse
}
