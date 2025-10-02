import type { Category, Job, Prompt } from './types';

let categories: Category[] = [
  { id: '1', name: 'Information Technology', description: 'Jobs related to computers, software, and networking.', jobCount: 2 },
  { id: '2', name: 'Healthcare', description: 'Jobs related to providing medical services.', jobCount: 1 },
  { id: '3', name: 'Sales', description: 'Jobs related to selling products or services.', jobCount: 1 },
];

let jobs: Job[] = [
  { 
    id: '1', 
    categoryId: '1', 
    title: 'Frontend Developer', 
    description: 'Builds user interfaces for web applications.',
    requiredSkills: ['React', 'TypeScript', 'CSS', 'Next.js'],
    softSkills: ['Communication', 'Teamwork', 'Problem-solving']
  },
  { 
    id: '2', 
    categoryId: '1', 
    title: 'Unity Developer', 
    description: 'Creates experiences using the Unity engine.',
    requiredSkills: ['Unity', 'C#', '3D Math', 'VR/AR'],
    softSkills: ['Creativity', 'Attention to Detail', 'Collaboration']
  },
  { 
    id: '3', 
    categoryId: '2', 
    title: 'Registered Nurse', 
    description: 'Provides patient care in a hospital setting.',
    requiredSkills: ['Patient Assessment', 'Medication Administration', 'Electronic Health Records'],
    softSkills: ['Empathy', 'Communication', 'Stamina']
  },
  { 
    id: '4', 
    categoryId: '3', 
    title: 'Sales Associate', 
    description: 'Assists customers and drives sales.',
    requiredSkills: ['Product Knowledge', 'POS Systems', 'Customer Service'],
    softSkills: ['Persuasion', 'Friendliness', 'Resilience']
  },
];

let prompts: Prompt[] = [
    { id: '1', jobId: '1', text: 'Tell me about a challenging project you worked on with React.' },
    { id: '2', jobId: '1', text: 'How do you ensure your CSS is maintainable and scalable?' },
    { id: '3', jobId: '2', text: 'Describe your experience with performance optimization in Unity.' },
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- Categories ---
export const getCategories = async (): Promise<Category[]> => {
  await delay(50);
  const jobsByCategory = jobs.reduce((acc, job) => {
    acc[job.categoryId] = (acc[job.categoryId] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return categories.map(c => ({...c, jobCount: jobsByCategory[c.id] || 0}));
};

export const getCategory = async (id: string): Promise<Category | undefined> => {
    await delay(50);
    return categories.find(c => c.id === id);
}

export const addCategory = async (data: Omit<Category, 'id' | 'jobCount'>): Promise<Category> => {
  await delay(100);
  const newCategory: Category = { ...data, id: Date.now().toString(), jobCount: 0 };
  categories.push(newCategory);
  return newCategory;
};

export const updateCategory = async (id: string, data: Partial<Omit<Category, 'id' | 'jobCount'>>): Promise<Category | null> => {
    await delay(100);
    let categoryToUpdate = await getCategory(id);
    if (categoryToUpdate) {
        const updatedCategory = { ...categoryToUpdate, ...data };
        categories = categories.map(c => c.id === id ? updatedCategory : c);
        return updatedCategory;
    }
    return null;
}

export const deleteCategory = async (id: string): Promise<boolean> => {
    await delay(100);
    const initialLength = categories.length;
    categories = categories.filter(c => c.id !== id);
    // also delete associated jobs and prompts
    const jobsToDelete = jobs.filter(j => j.categoryId === id).map(j => j.id);
    jobs = jobs.filter(j => j.categoryId !== id);
    prompts = prompts.filter(p => !jobsToDelete.includes(p.jobId));
    return categories.length < initialLength;
}


// --- Jobs ---
export const getJobs = async (): Promise<Job[]> => {
    await delay(50);
    return jobs;
}

export const getJob = async (id: string): Promise<Job | undefined> => {
    await delay(50);
    return jobs.find(j => j.id === id);
}

export const addJob = async (data: Omit<Job, 'id'>): Promise<Job> => {
    await delay(100);
    const newJob: Job = { ...data, id: Date.now().toString() };
    jobs.push(newJob);
    return newJob;
}

export const updateJob = async (id: string, data: Partial<Omit<Job, 'id'>>): Promise<Job | null> => {
    await delay(100);
    let jobToUpdate = await getJob(id);
    if (jobToUpdate) {
        const updatedJob = { ...jobToUpdate, ...data };
        jobs = jobs.map(j => j.id === id ? updatedJob : j);
        return updatedJob;
    }
    return null;
}

export const deleteJob = async (id: string): Promise<boolean> => {
    await delay(100);
    const initialLength = jobs.length;
    jobs = jobs.filter(j => j.id !== id);
    // also delete associated prompts
    prompts = prompts.filter(p => p.jobId !== id);
    return jobs.length < initialLength;
}

// --- Prompts ---
export const getPromptsByJobId = async (jobId: string): Promise<Prompt[]> => {
    await delay(50);
    return prompts.filter(p => p.jobId === jobId);
}

export const addPrompt = async (data: Omit<Prompt, 'id'>): Promise<Prompt> => {
    await delay(100);
    const newPrompt: Prompt = { ...data, id: Date.now().toString() };
    prompts.push(newPrompt);
    return newPrompt;
}

export const deletePrompt = async (id: string): Promise<boolean> => {
    await delay(100);
    const initialLength = prompts.length;
    prompts = prompts.filter(p => p.id !== id);
    return prompts.length < initialLength;
}
