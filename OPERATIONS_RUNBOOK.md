# Salvere Operations Runbook

## Scope

This runbook covers:
- App uptime monitoring
- Auth and webhook alerting
- Supabase backup/restore baseline
- Launch-day verification

## Monitoring Baseline

## Endpoints
- App health: `/`
- Auth path health: `/auth/login`
- Payment webhook health: `/api/flutterwave/webhook`

## Recommended uptime checks
- Interval: 1 minute
- Timeout: 10 seconds
- Retries before alert: 3
- Regions: at least 2

## Alert Channels
- Primary: engineering email distribution list
- Secondary: Slack `#salvere-alerts`

## Alert rules
- P1: app unreachable for 5+ minutes
- P1: webhook endpoint non-2xx for 5+ minutes
- P2: auth error spike over normal baseline for 15+ minutes

## Logging Baseline

## Required structured fields
- `timestamp`
- `level`
- `request_id`
- `route`
- `user_id` (when available)
- `error_code`
- `message`

## Critical events to log
- Login failures
- Signup failures
- Password reset failures
- Webhook signature failures
- Webhook processing failures

## Supabase Backup and Restore

## Backup policy
- Daily automated database backup retained for 14 days
- Weekly backup retained for 8 weeks
- Monthly backup retained for 12 months

## Restore drill cadence
- Perform restore drill every 30 days in staging
- Verify at least one sample user profile and one assessment record

## Recovery objective targets
- RPO: 24 hours
- RTO: 2 hours

## Incident Procedures

## Auth outage
1. Confirm Supabase status and project health.
2. Validate `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in hosting secrets.
3. Check auth error rate and recent deploys.
4. Roll back to previous deploy if failure started after release.
5. Post status update to stakeholders.

## Webhook outage
1. Verify `FLUTTERWAVE_WEBHOOK_HASH` matches dashboard configuration.
2. Confirm endpoint receives requests and validates signature.
3. Check duplicate-event protection behavior.
4. Reprocess failed events from log history if needed.
5. Post incident summary and prevention action.

## Launch-Day Runbook

1. Verify all production env vars are present in host settings.
2. Run production build and smoke test auth flow.
3. Confirm `/dashboard` requires auth.
4. Confirm `/admin` denies non-admin user and allows admin user.
5. Perform one webhook test event and confirm processing log.
6. Verify alert channels receive test notifications.
7. Confirm on-call owner for first 48 hours post-launch.
