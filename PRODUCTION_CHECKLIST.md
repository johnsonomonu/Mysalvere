# Salvere Production Readiness Checklist

This checklist is based on the current codebase state and is ordered for practical execution.

## 0) Current Status Snapshot

- [ ] Real authentication flow is implemented end-to-end
- [ ] RBAC is enforced from a single source of truth
- [ ] Middleware is strict in production (no open demo bypass)
- [ ] Protected pages use real user/session data
- [ ] Build is strict (TypeScript errors fail builds)
- [ ] Monitoring, backups, and launch runbook are in place

---

## 1) Environment and Secrets

- [ ] Set production environment variables
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
  - [ ] FLUTTERWAVE_WEBHOOK_HASH
  - [ ] RESEND_API_KEY
  - [ ] BOOKING_FROM_EMAIL
- [ ] Validate secrets are configured in hosting provider (not only local .env)
- [ ] Rotate any test keys before launch
- [ ] Add environment validation at startup (fail fast if required secrets are missing)

---

## 2) Authentication (Must Fix)

- [ ] Replace mock login in app/auth/login/page.tsx with real Supabase sign-in
  - [ ] Use auth.signInWithPassword
  - [ ] Handle invalid credentials and network errors
  - [ ] Redirect to intended path after login
- [ ] Replace mock signup in app/auth/sign-up/page.tsx with real Supabase sign-up
  - [ ] Use auth.signUp with email/password
  - [ ] Pass full_name metadata
  - [ ] Route to sign-up success only when Supabase call succeeds
- [ ] Implement sign-out action
  - [ ] Add logout UI in header/dashboard
  - [ ] Clear session and redirect to home/login
- [ ] Implement password reset flow
  - [ ] Add forgot-password page and reset confirmation handling

---

## 3) RBAC and Authorization

- [ ] Choose one RBAC source of truth
  - [ ] Recommended: public.profiles.role
- [ ] Align middleware admin check with database role source
  - [ ] Do not rely only on user_metadata.role
- [ ] Ensure profile creation trigger sets safe default role USER
- [ ] Verify no user can self-elevate to ADMIN via client inputs
- [ ] Add server-side admin guard utility for server components and API routes

---

## 4) Middleware Hardening

- [ ] Keep middleware active for protected route patterns
- [ ] Remove or strictly guard demo-mode bypass in production
  - [ ] If env vars missing in production, block protected routes and surface error
- [ ] Preserve redirect target safely (avoid open redirect patterns)
- [ ] Add auth checks for any future API routes requiring user identity

---

## 5) Data and RLS Validation

- [ ] Apply SQL migrations on production database
  - [ ] scripts/001_create_profiles.sql
  - [ ] scripts/002_create_assessments.sql
  - [ ] scripts/003_create_appointments.sql
- [ ] Validate RLS policies with real test users
  - [ ] USER can only read/write own rows
  - [ ] ADMIN can read/manage allowed scopes
- [ ] Add DB constraints where missing (unique keys, not null, enum checks)
- [ ] Add idempotency for payment webhooks (avoid duplicate email sends)

---

## 6) Payments and Email Reliability

- [ ] Confirm Flutterwave webhook endpoint is configured in dashboard
  - [ ] URL points to /api/flutterwave/webhook
  - [ ] Hash secret matches FLUTTERWAVE_WEBHOOK_HASH
- [ ] Confirm Resend sender domain is verified
- [ ] Add webhook event logging table (event id, tx_ref, status, processed_at)
- [ ] Add retry-safe behavior (skip already-processed successful payments)
- [ ] Add alerting for webhook failures and email send failures

---

## 7) App Quality and Build Safety

- [ ] Remove TypeScript ignoreBuildErrors in next.config.mjs for production
- [ ] Fix all TypeScript and lint errors
- [ ] Add basic automated tests
  - [ ] Auth flow test (signup/login/logout)
  - [ ] Middleware route protection test
  - [ ] RBAC test (USER denied /admin, ADMIN allowed)
  - [ ] Webhook signature and success path tests
- [ ] Add error boundaries/fallback pages where needed

---

## 8) Security and Compliance

- [ ] Add rate limiting for auth and webhook endpoints
- [ ] Add CSRF strategy for sensitive form mutations (where applicable)
- [ ] Verify secure cookie settings in production
- [ ] Set strict headers (CSP, X-Frame-Options, Referrer-Policy)
- [ ] Review privacy policy and terms pages for production accuracy

---

## 9) Observability and Operations

- [ ] Configure centralized logging
- [ ] Configure uptime monitoring for app and webhook endpoint
- [ ] Configure alert channels (email/Slack) for auth/webhook failures
- [ ] Define backup and restore process for Supabase
- [ ] Create incident response runbook (auth outage, webhook outage, data issue)

---

## 10) Launch Gates (Go/No-Go)

- [ ] Gate A: Auth and RBAC verified in staging with production-like env
- [ ] Gate B: Payment webhook confirmed with live or sandbox transaction
- [ ] Gate C: No critical/high vulnerabilities in dependency scan
- [ ] Gate D: Performance sanity check complete (Core Web Vitals baseline)
- [ ] Gate E: Stakeholder sign-off on key journeys
  - [ ] Home to assessment
  - [ ] Assessment to booking
  - [ ] Signup/login to dashboard
  - [ ] Admin access control

---

## 11) Post-Launch (First 14 Days)

- [ ] Daily review of auth errors and webhook errors
- [ ] Track conversion funnel metrics
- [ ] Monitor email deliverability and bounce rate
- [ ] Collect user-reported issues and patch quickly
- [ ] Schedule hardening sprint after real traffic insights
