-- Salvere Assessments Table
-- This table stores wellness assessments taken by users

CREATE TABLE IF NOT EXISTS public.assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  -- Symptoms selected (stored as JSONB for flexibility)
  symptoms JSONB NOT NULL DEFAULT '{}',
  
  -- Severity scores for each symptom (1-5)
  severity JSONB NOT NULL DEFAULT '{}',
  
  -- Impact scores for life areas (1-5)
  impact_scores JSONB NOT NULL DEFAULT '{}',
  
  -- Calculated results
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  priority_areas TEXT[] NOT NULL DEFAULT '{}',
  impact_level TEXT NOT NULL CHECK (impact_level IN ('low', 'moderate', 'high', 'severe')),
  recommendations TEXT[] NOT NULL DEFAULT '{}',
  
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('draft', 'completed', 'reviewed')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster user lookups
CREATE INDEX IF NOT EXISTS assessments_user_id_idx ON public.assessments(user_id);
CREATE INDEX IF NOT EXISTS assessments_created_at_idx ON public.assessments(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own assessments" 
  ON public.assessments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" 
  ON public.assessments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments" 
  ON public.assessments FOR UPDATE 
  USING (auth.uid() = user_id);

-- Admin can view all assessments
CREATE POLICY "Admins can view all assessments" 
  ON public.assessments FOR SELECT 
  USING (public.is_admin(auth.uid()));

-- Admin can update any assessment (for reviewing)
CREATE POLICY "Admins can update all assessments" 
  ON public.assessments FOR UPDATE 
  USING (public.is_admin(auth.uid()));
