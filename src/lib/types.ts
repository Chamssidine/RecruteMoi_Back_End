export interface Category {
  id: string;
  name: string;
  description: string;
  jobCount: number;
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
