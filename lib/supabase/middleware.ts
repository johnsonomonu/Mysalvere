import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const protectedPaths = ['/dashboard', '/admin']

export function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some((path) => pathname.startsWith(path))
}

export function isAdminPath(pathname: string): boolean {
  return pathname.startsWith('/admin')
}

export function hasAdminRole(role: string | undefined, profileError: unknown): boolean {
  return !profileError && role === 'ADMIN'
}

export async function updateSession(request: NextRequest) {
  const protectedRoute = isProtectedPath(request.nextUrl.pathname)

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Public pages can still render, but protected routes must fail closed.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (protectedRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/error'
      url.searchParams.set('message', 'Authentication is not configured for this environment.')
      return NextResponse.redirect(url)
    }

    return NextResponse.next({ request })
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options?: any }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (protectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // Admin-only routes
  if (isAdminPath(request.nextUrl.pathname) && user) {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = hasAdminRole(profile?.role, profileError)

    if (!isAdmin) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
