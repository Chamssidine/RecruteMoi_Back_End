'use server';

/**
 * @fileOverview A flow to optimize existing interview prompts with the latest information.
 *
 * - optimizeInterviewPrompt - A function that optimizes an existing interview prompt.
 * - OptimizeInterviewPromptInput - The input type for the optimizeInterviewPrompt function.
 * - OptimizeInterviewPromptOutput - The return type for the optimizeInterviewPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeInterviewPromptInputSchema = z.object({
  existingPrompt: z
    .string()
    .describe('The existing interview prompt to be optimized.'),
  jobTitle: z.string().describe('The job title for which the prompt is intended.'),
  industryTrends: z
    .string()
    .describe('The latest industry trends relevant to the job title.'),
  requiredSkills: z
    .string()
    .describe('The updated list of required skills for the job title.'),
});
export type OptimizeInterviewPromptInput = z.infer<
  typeof OptimizeInterviewPromptInputSchema
>;

const OptimizeInterviewPromptOutputSchema = z.object({
  optimizedPrompt: z
    .string()
    .describe('The optimized interview prompt with the latest information.'),
});
export type OptimizeInterviewPromptOutput = z.infer<
  typeof OptimizeInterviewPromptOutputSchema
>;

export async function optimizeInterviewPrompt(
  input: OptimizeInterviewPromptInput
): Promise<OptimizeInterviewPromptOutput> {
  return optimizeInterviewPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeInterviewPromptPrompt',
  input: {schema: OptimizeInterviewPromptInputSchema},
  output: {schema: OptimizeInterviewPromptOutputSchema},
  prompt: `You are an expert in human resources and interview techniques. Your task is to optimize an existing interview prompt for a specific job title, incorporating the latest industry trends and required skills.

Existing Prompt: {{{existingPrompt}}}

Job Title: {{{jobTitle}}}

Industry Trends: {{{industryTrends}}}

Required Skills: {{{requiredSkills}}}

Based on the provided information, rewrite the existing prompt to ensure it is up-to-date, relevant, and effective in assessing candidates for the specified job title. The optimized prompt should include questions that evaluate the candidate's knowledge of industry trends and their proficiency in the required skills. Return only the optimized prompt.

Optimized Prompt:`,
});

const optimizeInterviewPromptFlow = ai.defineFlow(
  {
    name: 'optimizeInterviewPromptFlow',
    inputSchema: OptimizeInterviewPromptInputSchema,
    outputSchema: OptimizeInterviewPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
