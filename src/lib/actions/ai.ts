'use server';

import { generateInitialPrompts } from '@/ai/flows/generate-initial-prompts';
import { simulateJobInterview } from '@/ai/flows/simulate-job-interview';
import { getJob } from '@/lib/db';
import type { Message } from '@/lib/types';

export async function generatePromptsAction(jobId: string) {
  try {
    const job = await getJob(jobId);
    if (!job) {
      throw new Error('Job not found');
    }

    const jobDescription = `Title: ${job.title}\nDescription: ${
      job.description
    }\nRequired Skills: ${job.requiredSkills.join(
      ', '
    )}\nSoft Skills: ${job.softSkills.join(', ')}`;

    const result = await generateInitialPrompts({ jobDescription });

    return {
      success: true,
      prompts: result.initialPrompts,
    };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      success: false,
      error: `Failed to generate prompts: ${errorMessage}`,
    };
  }
}

export async function runInterviewTurnAction(
  jobId: string,
  messages: Message[]
): Promise<{ success: boolean; response?: string; error?: string }> {
  try {
    const job = await getJob(jobId);
    if (!job) {
      return { success: false, error: 'Job not found' };
    }

    // A simple prompt combining job details and the main task
    const jobPrompt = `
      You are an AI interviewer for the position of ${job.title}.
      Description: ${job.description}.
      The ideal candidate has skills like: ${job.requiredSkills.join(', ')} and ${job.softSkills.join(', ')}.
      Ask relevant questions to assess the candidate's fitness for this role.
      Keep your questions concise and focused. Start the interview now.
    `;

    const lastUserMessage = messages.filter(m => m.role === 'user').pop();

    const result = await simulateJobInterview({
      jobPrompt: jobPrompt,
      candidateResponse: lastUserMessage?.content,
    });
    
    return { success: true, response: result.interviewerResponse };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      success: false,
      error: `Failed to get AI response: ${errorMessage}`,
    };
  }
}
