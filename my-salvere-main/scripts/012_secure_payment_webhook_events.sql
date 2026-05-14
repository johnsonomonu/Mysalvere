-- Secure payment webhook events with explicit row-level access control.

ALTER TABLE public.payment_webhook_events ENABLE ROW LEVEL SECURITY;

-- Keep policy creation idempotent.
DROP POLICY IF EXISTS "Admins can view all payment webhook events" ON public.payment_webhook_events;
DROP POLICY IF EXISTS "Users can view their own payment webhook events" ON public.payment_webhook_events;

-- Admin visibility for operations and payment audit pages.
CREATE POLICY "Admins can view all payment webhook events"
  ON public.payment_webhook_events FOR SELECT
  USING (public.is_admin(auth.uid()));

-- User visibility is scoped to records where webhook customer email matches the signed-in profile email.
CREATE POLICY "Users can view their own payment webhook events"
  ON public.payment_webhook_events FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM public.profiles p
      WHERE p.id = auth.uid()
        AND lower(coalesce(p.email, '')) = lower(coalesce((payload -> 'data' -> 'customer' ->> 'email'), ''))
    )
  );
