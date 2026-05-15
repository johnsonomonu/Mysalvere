type SecurityHeaders = Record<string, string>

function buildContentSecurityPolicy(): string {
  const scriptSrc =
    process.env.NODE_ENV === 'development'
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://checkout.flutterwave.com"
      : "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://checkout.flutterwave.com"

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "frame-src 'self' https://checkout.flutterwave.com https://flutterwave.com https://*.flutterwave.com https://*.f4b-flutterwave.com",
    "form-action 'self'",
    "img-src 'self' data: https:",
    scriptSrc,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://api.flutterwave.com https://*.flutterwave.com https://*.ravepay.co https://api.resend.com https://vitals.vercel-insights.com",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join('; ')
}

export function buildSecurityHeaders(): SecurityHeaders {
  const headers: SecurityHeaders = {
    'Content-Security-Policy': buildContentSecurityPolicy(),
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
  }

  if (process.env.NODE_ENV === 'production') {
    headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload'
  }

  return headers
}