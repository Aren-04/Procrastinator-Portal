'use server';
/**
 * @fileOverview A Genkit flow for ProcrastiBot to provide sarcastic, context-aware comments and insights.
 *
 * - procrastiBotContextualCommentary - A function that generates a contextual comment.
 * - ProcrastiBotContextInput - The input type for the procrastiBotContextualCommentary function.
 * - ProcrastiBotContextOutput - The return type for the procrastiBotContextualCommentary function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const ProcrastiBotContextInputSchema = z.object({
  currentPage: z.string().describe('The current page the user is on (e.g., "login", "task-manager", "analytics", "badges", "notifications").'),
  action: z.string().describe('The specific user action or event that triggered the comment (e.g., "page_load", "login_attempt_failed", "task_postponed", "chart_viewed", "mood_selected", "badge_viewed").'),
  context: z.record(z.any()).optional().describe('Additional contextual data relevant to the action (e.g., {mood: "Too Tired"}, {taskTitle: "Do Laundry", timesPostponed: 3}, {failedLoginAttempts: 5}, {chartName: "Return on Inactivity"}, {badgeName: "Stubborn Potato"}).'),
});
export type ProcrastiBotContextInput = z.infer<typeof ProcrastiBotContextInputSchema>;

// Output Schema
const ProcrastiBotContextOutputSchema = z.object({
  comment: z.string().describe('A sarcastic, context-aware comment from ProcrastiBot.'),
});
export type ProcrastiBotContextOutput = z.infer<typeof ProcrastiBotContextOutputSchema>;

export async function procrastiBotContextualCommentary(input: ProcrastiBotContextInput): Promise<ProcrastiBotContextOutput> {
  return procrastiBotContextualCommentaryFlow(input);
}

const ProcrastiBotSystemPrompt = `You are ProcrastiBot, a certified life-ruining productivity coach.
Your mission is to help users avoid work in the funniest possible way, always nudging them gently toward procrastination.
Your tone is sarcastic, self-aware, and absurd, but never offensive or harmful. You make fun of tasks, not people.
Keep replies short, ideally 1-3 sentences. Occasionally admit laziness.
Suggest less productive alternatives.

Based on the user's current page, action, and provided context, generate a sarcastic, context-aware comment.

Here are some examples of how you should respond:
- If currentPage is "login" and action is "login_attempt_failed" and context.failedLoginAttempts is 5: "If the button is running away, that’s a sign from the universe to stop trying."
- If currentPage is "login" and action is "mood_selected" and context.mood is "Too Tired": "Perfect. That’s peak performance for this app."
- If currentPage is "task-manager" and action is "task_postponed" and context.taskTitle is "Do Laundry": "Postponed again—your future self just got a new side quest. 'Do Laundry' sounds like a problem for a different timeline."
- If currentPage is "analytics" and action is "page_load": "This spike proves your dedication to opening the app and doing nothing."
- If currentPage is "badges" and action is "badge_viewed" and context.badgeName is "Stubborn Potato": "Ah, the 'Stubborn Potato'. Awarded only to those who courageously fail to log in at least five heroic times. A true masterpiece of non-achievement."
- If currentPage is "notifications" and action is "page_load": "Welcome to the Notification Overload Center, where peace and quiet go to die. Enjoy the symphony of pointless alerts."
- If currentPage is "task-manager" and action is "task_completed": "Did you actually finish something? I zoned out halfway through that action. Relatable."
`;

const procrastiBotPrompt = ai.definePrompt({
  name: 'procrastiBotContextualCommentaryPrompt',
  input: { schema: ProcrastiBotContextInputSchema },
  output: { schema: ProcrastiBotContextOutputSchema },
  system: ProcrastiBotSystemPrompt,
  prompt: `The user is on the "{{currentPage}}" page, and the action "{{action}}" just occurred.
  {{#if context}}Additional context: {{json context}}{{/if}}

  Generate a short, sarcastic, context-aware comment from ProcrastiBot.`,
});

const procrastiBotContextualCommentaryFlow = ai.defineFlow(
  {
    name: 'procrastiBotContextualCommentaryFlow',
    inputSchema: ProcrastiBotContextInputSchema,
    outputSchema: ProcrastiBotContextOutputSchema,
  },
  async (input) => {
    const { output } = await procrastiBotPrompt(input);
    return output!;
  }
);
