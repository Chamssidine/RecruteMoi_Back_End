'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { addPrompt, deletePrompt } from '@/lib/db';
import { generatePromptsAction } from './ai';

const PromptSchema = z.object({
  text: z.string().min(10, { message: 'Prompt must be at least 10 characters long.' }),
  jobId: z.string(),
});

export type PromptState = {
  errors?: {
    text?: string[];
  };
  message?: string | null;
};

export async function createPrompt(prevState: PromptState, formData: FormData) {
  const validatedFields = PromptSchema.safeParse({
    text: formData.get('text'),
    jobId: formData.get('jobId'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Failed to create prompt.',
    };
  }
  
  const { text, jobId } = validatedFields.data;

  try {
    await addPrompt({ text, jobId });
  } catch (e) {
    return { message: 'Database Error: Failed to create prompt.' };
  }

  revalidatePath(`/jobs/${jobId}`);
  return { message: 'Successfully created prompt.' };
}

export async function createAiPrompts(jobId: string) {
  const result = await generatePromptsAction(jobId);
  if(result.success && result.prompts) {
      try {
          for (const promptText of result.prompts) {
              await addPrompt({ text: promptText, jobId });
          }
      } catch (e) {
          return { message: 'Database Error: Failed to save generated prompts.' };
      }
  } else if (result.error) {
      return { message: result.error };
  }
  revalidatePath(`/jobs/${jobId}`);
  return { message: `Successfully generated ${result.prompts?.length || 0} prompts.` };
}


export async function removePrompt(id: string, jobId: string) {
    try {
        await deletePrompt(id);
    } catch (e) {
        return { message: 'Database Error: Failed to delete prompt.' };
    }
    revalidatePath(`/jobs/${jobId}`);
    return { message: 'Prompt deleted.' };
}
