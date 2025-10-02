'use server';

/**
 * @fileOverview An AI-powered job interview simulator.
 *
 * - simulateJobInterview - A function that simulates a job interview.
 * - SimulateJobInterviewInput - The input type for the simulateJobInterview function.
 * - SimulateJobInterviewOutput - The return type for the simulateJobInterview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateJobInterviewInputSchema = z.object({
  jobPrompt: z.string().describe('The job prompt to use for the interview.'),
  candidateResponse: z.string().optional().describe('The candidate\'s response to the previous question.'),
});
export type SimulateJobInterviewInput = z.infer<typeof SimulateJobInterviewInputSchema>;

const SimulateJobInterviewOutputSchema = z.object({
  interviewerResponse: z.string().describe('The interviewer\'s response/question.'),
});
export type SimulateJobInterviewOutput = z.infer<typeof SimulateJobInterviewOutputSchema>;

export async function simulateJobInterview(input: SimulateJobInterviewInput): Promise<SimulateJobInterviewOutput> {
  return simulateJobInterviewFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simulateJobInterviewPrompt',
  input: {schema: SimulateJobInterviewInputSchema},
  output: {schema: SimulateJobInterviewOutputSchema},
  prompt: `You are an AI job interviewer. Your role is to conduct a job interview with a candidate based on the provided job prompt.  The candidate will respond to your questions, and you should adapt your subsequent questions based on their responses.  If the candidate has not yet responded, start the interview with the first question.

Job Prompt: {{{jobPrompt}}}

{{#if candidateResponse}}
Candidate's Previous Response: {{{candidateResponse}}}
{{/if}}

Interviewer: `,
});

const simulateJobInterviewFlow = ai.defineFlow(
  {
    name: 'simulateJobInterviewFlow',
    inputSchema: SimulateJobInterviewInputSchema,
    outputSchema: SimulateJobInterviewOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
