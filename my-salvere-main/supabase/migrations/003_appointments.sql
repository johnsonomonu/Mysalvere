-- Create appointments table for storing booked sessions
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,                       -- 'Discovery Call', 'Single Session', etc.
  status TEXT NOT NULL DEFAULT 'confirmed', -- confirmed, cancelled, completed
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  meeting_link TEXT,
  notes TEXT,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  health_concern TEXT,
  amount_paid INTEGER DEFAULT 0,            -- in kobo/smallest currency unit
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Users can read their own appointments
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own appointments
CREATE POLICY "Users can insert own appointments"
  ON appointments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own appointments
CREATE POLICY "Users can update own appointments"
  ON appointments FOR UPDATE
  USING (auth.uid() = user_id);

-- Index for fast lookup
CREATE INDEX idx_appointments_user_id ON appointments(user_id);
CREATE INDEX idx_appointments_scheduled_at ON appointments(scheduled_at);
