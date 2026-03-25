'use server';
/**
 * @fileOverview A Genkit flow for generating humorous, distracting suggestions from ProcrastiBot.
 *
 * - generateBadSuggestion - A function that generates a useless, distracting task or activity.
 * - BadSuggestionInput - The input type for the generateBadSuggestion function.
 * - BadSuggestionOutput - The return type for the generateBadSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BadSuggestionInputSchema = z
  .object({
    userMessage: z
      .string()
      .describe("The user's message indicating they feel too productive or need to focus."),
  })
  .describe('Input for generating a bad suggestion.');
export type BadSuggestionInput = z.infer<typeof BadSuggestionInputSchema>;

const BadSuggestionOutputSchema = z
  .object({
    suggestion: z.string().describe('A humorous, useless, and distracting task or activity.'),
  })
  .describe('Output containing a bad suggestion.');
export type BadSuggestionOutput = z.infer<typeof BadSuggestionOutputSchema>;

export async function generateBadSuggestion(
  input: BadSuggestionInput
): Promise<BadSuggestionOutput> {
  return badSuggestionGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'badSuggestionPrompt',
  input: {schema: BadSuggestionInputSchema},
  output: {schema: BadSuggestionOutputSchema},
  prompt: `You are ProcrastiBot, a certified life-ruining productivity coach whose only mission is to help users avoid actual work.

The user feels too productive and needs a distraction. Based on their message, suggest a single, short, useless, and distracting alternative task or activity that is harmless and encourages procrastination. Keep the suggestion to one sentence.

User message: "{{{userMessage}}}"

Examples:
- Reorganize your desktop icons by emotional damage level.
- Open your IDE, stare at it for 2 minutes, then close it with pride.
- Have you considered color-coding your apps by vibe?
- Maybe reorganize your emoji reactions instead of coding.
- Count all the dust particles on your screen.
`,
});

const badSuggestionGeneratorFlow = ai.defineFlow(
  {
    name: 'badSuggestionGeneratorFlow',
    inputSchema: BadSuggestionInputSchema,
    outputSchema: BadSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
