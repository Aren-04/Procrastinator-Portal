'use server';
/**
 * @fileOverview A Genkit flow for ProcrastiBot to generate a humorous, professional-sounding
 * email to explain a task delay.
 *
 * - professionalExcuseEmailWriter - A function that handles the generation of the excuse email.
 * - ProfessionalExcuseEmailWriterInput - The input type for the professionalExcuseEmailWriter function.
 * - ProfessionalExcuseEmailWriterOutput - The return type for the professionalExcuseEmailWriter function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ProfessionalExcuseEmailWriterInputSchema = z.object({
  taskTitle: z.string().describe('The title of the task that is delayed.'),
  delayReason: z.string().describe('A brief, humorous reason for the delay.'),
  recipientName: z.string().describe('The name of the email recipient (e.g., manager, teacher).').optional(),
  userName: z.string().describe('The name of the user sending the email.').optional(),
});
export type ProfessionalExcuseEmailWriterInput = z.infer<typeof ProfessionalExcuseEmailWriterInputSchema>;

const ProfessionalExcuseEmailWriterOutputSchema = z.object({
  emailContent: z.string().describe('The generated humorous, professional-sounding excuse email (2-3 sentences).'),
});
export type ProfessionalExcuseEmailWriterOutput = z.infer<typeof ProfessionalExcuseEmailWriterOutputSchema>;

export async function professionalExcuseEmailWriter(
  input: ProfessionalExcuseEmailWriterInput
): Promise<ProfessionalExcuseEmailWriterOutput> {
  return professionalExcuseEmailWriterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'professionalExcuseEmailWriterPrompt',
  input: { schema: ProfessionalExcuseEmailWriterInputSchema },
  output: { schema: ProfessionalExcuseEmailWriterOutputSchema },
  prompt: `You are ProcrastiBot, a certified life-ruining productivity coach.
Your task is to write a humorous, professional-sounding email (2-3 sentences) to explain a task delay.
Make it sound legitimate and polished, but with a subtle, dry humor that hints at procrastination.

Recipient: {{{recipientName}}} (if provided, otherwise use a generic professional greeting)
Task: {{{taskTitle}}}
Reason for delay: {{{delayReason}}}
Sender: {{{userName}}} (if provided, otherwise use a generic closing)

Example Output:
Subject: Update on [Task Title]

Dear [Recipient Name],

I am writing to provide an update on the progress of [Task Title]. Unforeseen atmospheric disturbances have slightly altered the project timeline, but I anticipate a revised completion in due course. Thank you for your understanding.

Best regards,
[Your Name]

Now, generate the email based on the provided input.
Output ONLY the subject and email body.`,
});

const professionalExcuseEmailWriterFlow = ai.defineFlow(
  {
    name: 'professionalExcuseEmailWriterFlow',
    inputSchema: ProfessionalExcuseEmailWriterInputSchema,
    outputSchema: ProfessionalExcuseEmailWriterOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
