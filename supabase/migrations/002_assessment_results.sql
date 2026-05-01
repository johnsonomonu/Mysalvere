-- Create assessment_results table
CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  overall_score INTEGER NOT NULL,
  category_scores JSONB NOT NULL,
  priority_areas TEXT[] NOT NULL,
  impact_level TEXT NOT NULL,
  recommendations TEXT[] NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;

-- Users can view their own results
CREATE POLICY "Users can view their own assessment results" ON assessment_results
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own results
CREATE POLICY "Users can insert their own assessment results" ON assessment_results
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can view all results
CREATE POLICY "Admins can view all assessment results" ON assessment_results
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'ADMIN')
  );
