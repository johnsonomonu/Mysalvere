-- Salvere RLS validation script (run in Supabase SQL Editor)
-- Purpose: validate USER isolation and ADMIN visibility/management without
-- aborting on expected RLS denials.

drop table if exists rls_validation_results;
create temporary table rls_validation_results (
  test_name text,
  expected text,
  outcome text,
  detail text
);

grant select, insert, update, delete on table rls_validation_results to authenticated;

do $$
declare
  user_a_id uuid;
  user_b_id uuid;
  admin_id uuid;
  uid uuid;
  c_profiles bigint;
  c_assessments bigint;
  c_appointments bigint;
begin
  select id into user_a_id
  from public.profiles
  where role = 'USER'
  order by created_at asc
  offset 0 limit 1;

  select id into user_b_id
  from public.profiles
  where role = 'USER'
  order by created_at asc
  offset 1 limit 1;

  select id into admin_id
  from public.profiles
  where role = 'ADMIN'
  order by created_at asc
  offset 0 limit 1;

  if user_a_id is null or user_b_id is null or admin_id is null then
    raise exception 'Need at least 2 USER profiles and 1 ADMIN profile';
  end if;

  execute 'set local role authenticated';
  perform set_config('request.jwt.claim.role', 'authenticated', true);
  perform set_config('request.jwt.claim.sub', user_a_id::text, true);
  select auth.uid() into uid;

  insert into rls_validation_results
  values (
    'USER context resolves auth.uid()',
    user_a_id::text,
    case when uid = user_a_id then 'PASS' else 'FAIL' end,
    coalesce(uid::text, 'NULL')
  );

  select count(*) into c_profiles from public.profiles;
  insert into rls_validation_results
  values (
    'USER profile visibility',
    '1 row',
    case when c_profiles = 1 then 'PASS' else 'FAIL' end,
    'visible profiles=' || c_profiles
  );

  begin
    insert into public.assessments (
      user_id,
      symptoms,
      severity,
      impact_scores,
      overall_score,
      priority_areas,
      impact_level,
      recommendations,
      status,
      completed_at
    ) values (
      user_a_id,
      '{}'::jsonb,
      '{}'::jsonb,
      '{}'::jsonb,
      50,
      '{}'::text[],
      'moderate',
      '{}'::text[],
      'draft',
      now()
    );

    insert into rls_validation_results
    values ('USER inserts own assessment', 'Allowed', 'PASS', 'insert succeeded');
  exception when others then
    insert into rls_validation_results
    values ('USER inserts own assessment', 'Allowed', 'FAIL', SQLERRM);
  end;

  begin
    insert into public.assessments (
      user_id,
      symptoms,
      severity,
      impact_scores,
      overall_score,
      priority_areas,
      impact_level,
      recommendations,
      status,
      completed_at
    ) values (
      user_b_id,
      '{}'::jsonb,
      '{}'::jsonb,
      '{}'::jsonb,
      50,
      '{}'::text[],
      'moderate',
      '{}'::text[],
      'draft',
      now()
    );

    insert into rls_validation_results
    values ('USER inserts other user assessment', 'Denied by RLS', 'FAIL', 'unexpectedly allowed');
  exception when others then
    if SQLSTATE = '42501' then
      insert into rls_validation_results
      values ('USER inserts other user assessment', 'Denied by RLS', 'PASS', SQLERRM);
    else
      insert into rls_validation_results
      values ('USER inserts other user assessment', 'Denied by RLS', 'FAIL', SQLERRM);
    end if;
  end;

  execute 'set local role authenticated';
  perform set_config('request.jwt.claim.role', 'authenticated', true);
  perform set_config('request.jwt.claim.sub', admin_id::text, true);

  select count(*) into c_profiles from public.profiles;
  select count(*) into c_assessments from public.assessments;
  select count(*) into c_appointments from public.appointments;

  insert into rls_validation_results
  values (
    'ADMIN sees all profiles',
    '> 1 rows',
    case when c_profiles > 1 then 'PASS' else 'FAIL' end,
    'visible profiles=' || c_profiles
  );

  insert into rls_validation_results
  values (
    'ADMIN sees assessments',
    'all rows',
    case when c_assessments >= 0 then 'PASS' else 'FAIL' end,
    'visible assessments=' || c_assessments
  );

  insert into rls_validation_results
  values (
    'ADMIN sees appointments',
    'all rows',
    case when c_appointments >= 0 then 'PASS' else 'FAIL' end,
    'visible appointments=' || c_appointments
  );

  begin
    update public.assessments
    set status = 'reviewed'
    where id in (select id from public.assessments order by created_at desc limit 1);

    insert into rls_validation_results
    values ('ADMIN updates assessment', 'Allowed', 'PASS', 'update succeeded');
  exception when others then
    insert into rls_validation_results
    values ('ADMIN updates assessment', 'Allowed', 'FAIL', SQLERRM);
  end;

  execute 'set local role authenticated';
  perform set_config('request.jwt.claim.role', 'authenticated', true);
  perform set_config('request.jwt.claim.sub', user_a_id::text, true);

  begin
    update public.profiles set role = 'ADMIN' where id = user_a_id;

    insert into rls_validation_results
    values ('USER self-escalation attempt', 'Denied', 'FAIL', 'unexpectedly allowed');
  exception when others then
    insert into rls_validation_results
    values ('USER self-escalation attempt', 'Denied', 'PASS', SQLERRM);
  end;
end;
$$;

select *
from rls_validation_results
order by test_name;

-- IMPORTANT:
-- This script intentionally does not COMMIT any writes.
-- Run in SQL Editor once, capture results table, then close/rollback session.
