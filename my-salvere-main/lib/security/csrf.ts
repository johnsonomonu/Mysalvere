type RequestLike = {
  headers: {
    get(name: string): string | null
  }
}

function normalizeHost(value: string): string {
  return value.trim().toLowerCase()
}

export function isValidMutationOrigin(request: RequestLike): boolean {
  const originHeader = request.headers.get('origin')
  const hostHeader = request.headers.get('host')

  if (!originHeader) {
    // Non-browser requests may not include Origin.
    return true
  }

  if (!hostHeader) {
    return false
  }

  let originHost = ''
  try {
    originHost = normalizeHost(new URL(originHeader).host)
  } catch {
    return false
  }

  const requestHost = normalizeHost(hostHeader)
  if (originHost === requestHost) {
    return true
  }

  const trustedOrigins = (process.env.TRUSTED_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  return trustedOrigins.some((origin) => {
    try {
      return normalizeHost(new URL(origin).host) === originHost
    } catch {
      return false
    }
  })
}