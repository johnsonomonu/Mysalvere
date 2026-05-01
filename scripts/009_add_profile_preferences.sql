-- Add persisted profile preference fields for dashboard settings.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS timezone TEXT,
  ADD COLUMN IF NOT EXISTS email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS session_reminders BOOLEAN NOT NULL DEFAULT TRUE,
  ADD COLUMN IF NOT EXISTS product_updates BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE public.profiles
SET
  email_notifications = COALESCE(email_notifications, TRUE),
  session_reminders = COALESCE(session_reminders, TRUE),
  product_updates = COALESCE(product_updates, FALSE)
WHERE email_notifications IS NULL
   OR session_reminders IS NULL
   OR product_updates IS NULL;