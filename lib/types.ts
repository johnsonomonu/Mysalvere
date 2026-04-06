// Database Types for Salvere Wellness Platform

export type UserRole = 'USER' | 'ADMIN';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  symptoms: SymptomSelection[];
  impact_scores: ImpactScores;
  overall_score: number;
  priority_areas: string[];
  status: 'draft' | 'completed' | 'reviewed';
  created_at: string;
  completed_at: string | null;
}

export interface SymptomSelection {
  id: string;
  name: string;
  category: SymptomCategory;
  severity: 1 | 2 | 3 | 4 | 5;
  selected: boolean;
}

export type SymptomCategory = 
  | 'diabetes'
  | 'energy'
  | 'weight'
  | 'brain_fog'
  | 'sleep'
  | 'hormones';

export interface ImpactScores {
  daily_life: number;
  work_productivity: number;
  relationships: number;
  mental_health: number;
  physical_activity: number;
}

export interface Appointment {
  id: string;
  user_id: string;
  coach_id: string | null;
  type: AppointmentType;
  status: AppointmentStatus;
  scheduled_at: string;
  duration_minutes: number;
  notes: string | null;
  meeting_link: string | null;
  created_at: string;
}

export type AppointmentType = 
  | 'discovery_call'
  | 'coaching_session'
  | 'follow_up'
  | 'corporate_consultation'
  | 'open_house';

export type AppointmentStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no_show';

// Assessment Form Types
export interface AssessmentFormData {
  symptoms: {
    diabetes: boolean;
    energy: boolean;
    weight: boolean;
    brain_fog: boolean;
    sleep: boolean;
    hormones: boolean;
  };
  symptomDetails: Record<SymptomCategory, number>;
  impact: ImpactScores;
}

// UI State Types
export interface AssessmentStep {
  id: number;
  title: string;
  description: string;
}

export interface WellnessMetric {
  label: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}
