
export interface Badge {
  id: string;
  name: string;
  icon: string;
}

export type EducationLevel = 'มัธยม' | '';

export interface UserProfile {
  name: string;
  level: number;
  points: number;
  avatar: string;
  badges: Badge[];
  firstName?: string;
  lastName?: string;
  nickname?: string;
  birthDate?: string; // YYYY-MM-DD
  educationLevel?: EducationLevel;
  educationYear?: string;
  aptitudes?: string[];
  interests?: string[];
  likes?: string[];
}

export type QuestionType = 'multiple-choice-image' | 'multiple-choice-text' | 'open-ended';

export interface QuestionOption {
  value: string;
  label: string;
  image?: string;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  type: QuestionType;
  key: keyof QuizAnswers;
  options?: QuestionOption[];
}

export interface QuizAnswers {
  activity: string;
  subject: string;
  workStyle: string;
  passion: string;
}

export interface CareerSuggestion {
  name: string;
  description: string;
  requiredSkills: string[];
}

export interface EducationSuggestion {
  major: string;
  description: string;
  relatedCareers: string[];
}

export interface ActivitySuggestion {
  type: string;
  name: string;
  description: string;
}

export interface AIRecommendations {
  summary: string;
  careerSuggestions: CareerSuggestion[];
  educationSuggestions: EducationSuggestion[];
  activitySuggestions: ActivitySuggestion[];
  userInsights: {
    aptitudes: string[];
    interests: string[];
    likes: string[];
  };
}