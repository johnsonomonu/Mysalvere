-- Promote a specific user to ADMIN by email.
-- Run in Supabase SQL Editor.

begin;

update public.profiles
set role = 'ADMIN'
where lower(email) = lower('timothydivine9@gmail.com');

-- Verification
select id, email, role
from public.profiles
where lower(email) = lower('timothydivine9@gmail.com');

commit;
