import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { buildSecurityHeaders } from '@/lib/security/headers'
import { checkRateLimit } from '@/lib/security/rate-limit'
import { isValidMutationOrigin } from '@/lib/security/csrf'

const AUTH_RATE_LIMIT = {
  maxRequests: 60,
  windowMs: 60_000,
}

const WEBHOOK_RATE_LIMIT = {
  maxRequests: 120,
  windowMs: 60_000,
}

function getClientIp(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function isAuthPath(pathname: string): boolean {
  return pathname.startsWith('/auth/')
}

function isWebhookPath(pathname: string): boolean {
  return pathname === '/api/flutterwave/webhook'
}

function isApiMutation(request: NextRequest): boolean {
  const method = request.method.toUpperCase()
  return request.nextUrl.pathname.startsWith('/api/') && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)
}

export async function middleware(request: NextRequest) {
  const ip = getClientIp(request)
  const path = request.nextUrl.pathname

  if (isAuthPath(path)) {
    const result = checkRateLimit({
      key: `auth:${ip}`,
      maxRequests: AUTH_RATE_LIMIT.maxRequests,
      windowMs: AUTH_RATE_LIMIT.windowMs,
    })

    if (!result.allowed) {
      return new Response('Too many auth requests. Please try again shortly.', {
        status: 429,
        headers: {
          'Retry-After': String(result.retryAfterSeconds),
        },
      })
    }
  }

  if (isWebhookPath(path)) {
    const result = checkRateLimit({
      key: `webhook:${ip}`,
      maxRequests: WEBHOOK_RATE_LIMIT.maxRequests,
      windowMs: WEBHOOK_RATE_LIMIT.windowMs,
    })

    if (!result.allowed) {
      return new Response('Webhook rate limit exceeded.', {
        status: 429,
        headers: {
          'Retry-After': String(result.retryAfterSeconds),
        },
      })
    }
  }

  if (isApiMutation(request) && !isWebhookPath(path)) {
    if (!isValidMutationOrigin(request)) {
      return new Response('Invalid request origin.', { status: 403 })
    }
  }

  const response = await updateSession(request)
  const securityHeaders = buildSecurityHeaders()
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
