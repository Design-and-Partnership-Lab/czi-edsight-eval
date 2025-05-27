import { openai } from '@ai-sdk/openai';
import { streamObject } from 'ai';
import { z } from 'zod';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { statementPairs } = await req.json();

  // schema for comparison results
  const comparisonSchema = z.object({
    similarities: z.array(z.string()).describe('Key similarities between the statements'),
    differences: z.array(z.string()).describe('Key differences between the statements'),
    analysis: z.string().describe('Focus on the underlying educational insight or learning outcome that both statements reflect. Write as if addressing educators, emphasizing what this reveals about student learning, growth, or pedagogical effectiveness. Start with "You both agreed that the student..." or "While the AI noted...you pointed out..." Keep it brief and focused on educational value.'),
  });

  // parent schema for all comparisons
  const responseSchema = z.object({
    comparisons: z.array(z.object({
      pairNumber: z.number(),
      statementA: z.string(),
      statementB: z.string(),
      result: comparisonSchema
    }))
  });

  const result = streamObject({
    model: openai('gpt-4o'),
    schema: responseSchema,
    prompt: `You are analyzing feedback statements about student work from an educational perspective. Compare the following pairs of statements and focus on the underlying educational insights, learning outcomes, and pedagogical observations rather than surface-level differences.

    ${statementPairs.map((pair: { statementA: string; statementB: string; }, index: number) => `
    Pair ${index + 1}:
    Statement A: "${pair.statementA}"
    Statement B: "${pair.statementB}"
    `).join('\n')}

    For each pair:
    1. Identify key similarities and differences
    2. Most importantly, provide an analysis that focuses on the educational insight or learning outcome both statements reflect

    For the analysis, think about:
    - What does this reveal about the student's learning process?
    - What pedagogical skills or growth are being observed?
    - What educational value or learning outcome is being highlighted?

    Write the analysis as one brief, insightful statement that emphasizes the educational significance. Examples, follow this format:
    - They were mostly similar: "You both agreed that the student demonstrated growth in their reflection skills."
    - They were mostly similar: "You both agreed that the student showed strong critical thinking abilities."
    - They were mostly different: "While the AI noted the student's analytical skills, you emphasized their creative problem-solving approach."
    - They were mostly different:"Where the AI commented on the student’s ability to use sources effectively, you noted room for improvement."

    `
  });

  return result.toTextStreamResponse();
}