-- Fix RLS recursion on public.profiles admin policy.
-- Run this in Supabase SQL Editor before running scripts/005_validate_rls_real_users.sql

-- 1) Ensure helper exists.
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID DEFAULT auth.uid())
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles p
    WHERE p.id = check_user_id
      AND p.role = 'ADMIN'
  );
$$;

GRANT EXECUTE ON FUNCTION public.is_admin(UUID) TO authenticated;

-- 2) Replace recursive profile admin policy.
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.is_admin(auth.uid()));

-- 3) Replace admin policies on dependent tables to use helper consistently.
DROP POLICY IF EXISTS "Admins can view all assessments" ON public.assessments;
CREATE POLICY "Admins can view all assessments"
  ON public.assessments FOR SELECT
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can update all assessments" ON public.assessments;
CREATE POLICY "Admins can update all assessments"
  ON public.assessments FOR UPDATE
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can view all appointments" ON public.appointments;
CREATE POLICY "Admins can view all appointments"
  ON public.appointments FOR SELECT
  USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.appointments;
CREATE POLICY "Admins can manage all appointments"
  ON public.appointments FOR ALL
  USING (public.is_admin(auth.uid()));
