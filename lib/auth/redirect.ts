export function getSafeRedirectPath(
  redirect: string | null | undefined,
  fallback = "/dashboard"
): string {
  if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
    return fallback
  }

  return redirect
}