-- Allow trusted SQL Editor / migration context to update roles safely.
-- This keeps user self-escalation blocked for authenticated end users.

CREATE OR REPLACE FUNCTION public.prevent_role_self_escalation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  requester_id UUID;
  requester_role TEXT;
BEGIN
  IF NEW.role = OLD.role THEN
    RETURN NEW;
  END IF;

  requester_id := auth.uid();

  -- Trusted server context (SQL Editor/migration/service-role execution)
  -- has no auth.uid(); allow role update.
  IF requester_id IS NULL THEN
    RETURN NEW;
  END IF;

  SELECT role INTO requester_role
  FROM public.profiles
  WHERE id = requester_id;

  IF requester_role IS DISTINCT FROM 'ADMIN' THEN
    RAISE EXCEPTION 'Only admins can change profile roles';
  END IF;

  RETURN NEW;
END;
$$;
