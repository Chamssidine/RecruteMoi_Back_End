
export interface Metier {
  Fr: string;
  En: string;
  Rome: string;
}

export interface Category {
  Fr: string;
  En: string;
  Metiers: Metier[];
}

export interface Job {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  requiredSkills: string[];
  softSkills: string[];
}

export interface Prompt {
  id: string;
  jobId: string;
  text: string;
}

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};
