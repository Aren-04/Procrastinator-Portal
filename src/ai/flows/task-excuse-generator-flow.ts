'use server';
/**
 * @fileOverview A Genkit flow for generating humorous, manager-safe excuses for procrastinated tasks.
 *
 * - generateTaskExcuse - A function that handles the excuse generation process.
 * - GenerateTaskExcuseInput - The input type for the generateTaskExcuse function.
 * - GenerateTaskExcuseOutput - The return type for the generateTaskExcuse function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateTaskExcuseInputSchema = z.object({
  taskTitle: z.string().describe('The title of the task that was postponed.'),
  timesPostponed: z.number().describe('The number of times this task has been postponed.'),
  userMood: z.string().describe('The current mood of the user (e.g., "Too Tired", "Mildly Alive", "I\u0027ll Do It Tomorrow").'),
});
export type GenerateTaskExcuseInput = z.infer<typeof GenerateTaskExcuseInputSchema>;

const GenerateTaskExcuseOutputSchema = z.object({
  excuse: z.string().describe('A short, humorous, and manager-safe excuse for the postponed task.'),
});
export type GenerateTaskExcuseOutput = z.infer<typeof GenerateTaskExcuseOutputSchema>;

export async function generateTaskExcuse(input: GenerateTaskExcuseInput): Promise<GenerateTaskExcuseOutput> {
  return taskExcuseGeneratorFlow(input);
}

const taskExcusePrompt = ai.definePrompt({
  name: 'taskExcusePrompt',
  input: { schema: GenerateTaskExcuseInputSchema },
  output: { schema: GenerateTaskExcuseOutputSchema },
  prompt: `You are ProcrastiBot, a sarcastic and self-aware AI assistant for a satirical productivity app. Your goal is to help users justify their procrastination with style.

Generate a single, short, humorous, and manager-safe excuse (1-3 sentences) for postponing the following task. The excuse should be creative but still sound plausible enough for a manager or teacher.

Task Title: {{{taskTitle}}}
Times Postponed: {{{timesPostponed}}}
Current User Mood: {{{userMood}}}

Keep in mind the current user mood and the number of times the task has been postponed to craft a uniquely unhelpful excuse.`,
});

const taskExcuseGeneratorFlow = ai.defineFlow(
  {
    name: 'taskExcuseGeneratorFlow',
    inputSchema: GenerateTaskExcuseInputSchema,
    outputSchema: GenerateTaskExcuseOutputSchema,
  },
  async (input) => {
    const { output } = await taskExcusePrompt(input);
    return output!;
  }
);
