'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { addJob, updateJob, deleteJob } from '@/lib/db';

const JobSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  categoryId: z.string().min(1, 'Please select a category.'),
  requiredSkills: z.string().min(1, 'Please add at least one required skill.'),
  softSkills: z.string().min(1, 'Please add at least one soft skill.'),
});

export type JobState = {
  errors?: {
    title?: string[];
    description?: string[];
    categoryId?: string[];
    requiredSkills?: string[];
    softSkills?: string[];
  };
  message?: string | null;
};

export async function saveJob(prevState: JobState, formData: FormData) {
  const id = formData.get('id') as string | null;

  const validatedFields = JobSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    categoryId: formData.get('categoryId'),
    requiredSkills: formData.get('requiredSkills'),
    softSkills: formData.get('softSkills'),
  });
  
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to save job. Please check the fields.',
    };
  }

  const { title, description, categoryId, requiredSkills, softSkills } = validatedFields.data;
  const skillsToArray = (skills: string) => skills.split(',').map(s => s.trim()).filter(Boolean);

  const jobData = {
    title,
    description,
    categoryId,
    requiredSkills: skillsToArray(requiredSkills),
    softSkills: skillsToArray(softSkills),
  };

  try {
    if (id) {
      await updateJob(id, jobData);
    } else {
      await addJob(jobData);
    }
  } catch (e) {
    return { message: 'Database Error: Failed to save job.' };
  }

  revalidatePath('/jobs');
  revalidatePath('/categories');
  if (id) {
    revalidatePath(`/jobs/${id}`);
  }
  return { message: `Successfully saved job ${title}.` };
}

export async function removeJob(id: string) {
    try {
        await deleteJob(id);
    } catch (e) {
        return { message: 'Database Error: Failed to delete job.' };
    }
    revalidatePath('/jobs');
    revalidatePath('/categories');
}
