
export type UserRole = 'patient' | 'doctor' | 'community';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  created_at: string;
  email: string;
}

export interface PatientProfile extends UserProfile {
  age?: number;
  gender?: string;
  medical_history?: string;
  allergies?: string[];
  medications?: string[];
}

export interface DoctorProfile extends UserProfile {
  specialization?: string;
  qualification?: string;
  experience_years?: number;
  license_number?: string;
  languages?: string[];
  consultation_schedule?: {
    days: string[];
    hours: string;
  };
}

export interface CommunityProfile extends UserProfile {
  organization_name?: string;
  service_area?: string[];
  programs_offered?: string[];
  contact_number?: string;
}
