export interface AccountantProfile {
  id: string;
  name: string;
  age: number;
  photo: string;
  specialization: string;
  experience: 'Junior' | 'Mid-Level' | 'Senior' | 'Partner';
  company: string;
  location: string;
  certifications: string[];
  bio: string;
  yearsExperience: number;
  education: string;
  interests: string[];
}

export interface Match {
  id: string;
  profile1: AccountantProfile;
  profile2: AccountantProfile;
  timestamp: Date;
}

export interface SwipeAction {
  profileId: string;
  action: 'like' | 'pass' | 'super-like';
  timestamp: Date;
}