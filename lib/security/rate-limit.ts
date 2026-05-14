interface RateLimitInput {
  key: string
  maxRequests: number
  windowMs: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

interface Bucket {
  count: number
  resetAt: number
}

const buckets = new Map<string, Bucket>()

export function clearRateLimitBuckets(): void {
  buckets.clear()
}

export function checkRateLimit(input: RateLimitInput): RateLimitResult {
  const now = Date.now()
  const existing = buckets.get(input.key)

  if (!existing || existing.resetAt <= now) {
    buckets.set(input.key, {
      count: 1,
      resetAt: now + input.windowMs,
    })

    return {
      allowed: true,
      remaining: input.maxRequests - 1,
      retryAfterSeconds: Math.ceil(input.windowMs / 1000),
    }
  }

  existing.count += 1
  buckets.set(input.key, existing)

  const remaining = Math.max(0, input.maxRequests - existing.count)
  const retryAfterSeconds = Math.max(1, Math.ceil((existing.resetAt - now) / 1000))

  return {
    allowed: existing.count <= input.maxRequests,
    remaining,
    retryAfterSeconds,
  }
}