-- Salvere data hardening and webhook idempotency

-- 1) Strengthen existing table constraints.
ALTER TABLE public.profiles
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN updated_at SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS profiles_email_unique_idx
  ON public.profiles (LOWER(email));

ALTER TABLE public.assessments
  ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE public.appointments
  ALTER COLUMN created_at SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'appointments_duration_positive'
      AND conrelid = 'public.appointments'::regclass
  ) THEN
    ALTER TABLE public.appointments
      ADD CONSTRAINT appointments_duration_positive CHECK (duration_minutes > 0);
  END IF;
END;
$$;

-- 2) Add webhook event table for idempotency and observability.
CREATE TABLE IF NOT EXISTS public.payment_webhook_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL CHECK (provider IN ('flutterwave')),
  dedupe_key TEXT NOT NULL UNIQUE,
  event_id TEXT,
  tx_ref TEXT,
  event_status TEXT NOT NULL CHECK (event_status IN ('received', 'processed', 'failed', 'ignored')),
  payload JSONB NOT NULL,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS payment_webhook_events_event_id_idx
  ON public.payment_webhook_events (event_id)
  WHERE event_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS payment_webhook_events_tx_ref_idx
  ON public.payment_webhook_events (tx_ref)
  WHERE tx_ref IS NOT NULL;

CREATE INDEX IF NOT EXISTS payment_webhook_events_created_at_idx
  ON public.payment_webhook_events (created_at DESC);

DROP TRIGGER IF EXISTS payment_webhook_events_updated_at ON public.payment_webhook_events;
CREATE TRIGGER payment_webhook_events_updated_at
  BEFORE UPDATE ON public.payment_webhook_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();
