-- Seed realistic dashboard data for existing USER profiles.
-- Safe to re-run: each user is only seeded up to a target minimum volume.

DO $$
DECLARE
  user_record RECORD;
  current_assessments INTEGER;
  current_appointments INTEGER;
  i INTEGER;
  generated_score INTEGER;
  generated_status TEXT;
  generated_level TEXT;
  generated_priorities TEXT[];
BEGIN
  FOR user_record IN
    SELECT id
    FROM public.profiles
    WHERE role = 'USER'
    ORDER BY created_at ASC
  LOOP
    SELECT COUNT(*) INTO current_assessments
    FROM public.assessments
    WHERE user_id = user_record.id;

    IF current_assessments < 8 THEN
      FOR i IN 1..(8 - current_assessments) LOOP
        generated_score := 45 + floor(random() * 45)::INT;

        generated_status := CASE
          WHEN i = 1 THEN 'draft'
          WHEN random() > 0.35 THEN 'completed'
          ELSE 'reviewed'
        END;

        generated_level := CASE
          WHEN generated_score < 55 THEN 'high'
          WHEN generated_score < 70 THEN 'moderate'
          ELSE 'low'
        END;

        generated_priorities := CASE (i % 4)
          WHEN 0 THEN ARRAY['Energy', 'Sleep']
          WHEN 1 THEN ARRAY['Blood Sugar', 'Weight']
          WHEN 2 THEN ARRAY['Hormones', 'Brain Fog']
          ELSE ARRAY['Stress', 'Recovery']
        END;

        INSERT INTO public.assessments (
          user_id,
          symptoms,
          severity,
          impact_scores,
          overall_score,
          priority_areas,
          impact_level,
          recommendations,
          status,
          created_at,
          completed_at
        )
        VALUES (
          user_record.id,
          jsonb_build_object(
            'energy', random() > 0.4,
            'sleep', random() > 0.5,
            'weight', random() > 0.6,
            'hormones', random() > 0.7,
            'brain_fog', random() > 0.55,
            'diabetes', random() > 0.75
          ),
          jsonb_build_object(
            'energy', 1 + floor(random() * 5)::INT,
            'sleep', 1 + floor(random() * 5)::INT,
            'weight', 1 + floor(random() * 5)::INT,
            'hormones', 1 + floor(random() * 5)::INT,
            'brain_fog', 1 + floor(random() * 5)::INT,
            'diabetes', 1 + floor(random() * 5)::INT
          ),
          jsonb_build_object(
            'daily_life', 1 + floor(random() * 5)::INT,
            'work_productivity', 1 + floor(random() * 5)::INT,
            'relationships', 1 + floor(random() * 5)::INT,
            'mental_health', 1 + floor(random() * 5)::INT,
            'physical_activity', 1 + floor(random() * 5)::INT
          ),
          generated_score,
          generated_priorities,
          generated_level,
          ARRAY['Sleep consistency plan', 'Hydration + movement baseline'],
          generated_status,
          now() - (i * INTERVAL '9 days'),
          now() - (i * INTERVAL '9 days')
        );
      END LOOP;
    END IF;

    SELECT COUNT(*) INTO current_appointments
    FROM public.appointments
    WHERE user_id = user_record.id;

    IF current_appointments < 4 THEN
      FOR i IN 1..(4 - current_appointments) LOOP
        INSERT INTO public.appointments (
          user_id,
          coach_id,
          type,
          status,
          scheduled_at,
          duration_minutes,
          notes,
          meeting_link,
          created_at
        )
        VALUES (
          user_record.id,
          NULL,
          CASE (i % 3)
            WHEN 0 THEN 'coaching_session'
            WHEN 1 THEN 'follow_up'
            ELSE 'discovery_call'
          END,
          CASE
            WHEN i = 1 THEN 'scheduled'
            WHEN i = 2 THEN 'confirmed'
            WHEN i = 3 THEN 'completed'
            ELSE 'scheduled'
          END,
          now() + ((i - 2) * INTERVAL '10 days'),
          CASE WHEN i % 2 = 0 THEN 45 ELSE 30 END,
          'Auto-seeded demo appointment for dashboard realism.',
          CASE WHEN i <= 2 THEN 'https://meet.salvere.com/session-' || i::TEXT ELSE NULL END,
          now() - (i * INTERVAL '7 days')
        );
      END LOOP;
    END IF;
  END LOOP;
END;
$$;