import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { z } from "zod";

export const maxDuration = 30;

// schema for comparison results
const comparisonSchema = z.object({
    similarities: z
        .array(z.string())
        .describe("Key similarities between the statements"),
    differences: z
        .array(z.string())
        .describe("Key differences between the statements"),
});

// parent schema for all comparisons
const responseSchema = z.object({
    comparisons: z.array(
        z.object({
            pairNumber: z.number(),
            statementA: z.string(),
            statementB: z.string(),
            result: comparisonSchema,
        })
    ),
});

// Export the type at module level
export type ResponseType = z.infer<typeof responseSchema>;

export async function POST(req: Request) {
    const { statementPairs } = await req.json();

    const result = streamObject({
        model: openai("gpt-4o"),
        schema: responseSchema,
        prompt: `You are analyzing feedback statements about student work from an educational perspective. Compare the following pairs of statements and focus on the underlying educational insights, learning outcomes, and pedagogical observations rather than surface-level differences.
    The first statement is from a human teacher, and the second statement is from an AI model. Your task is to identify key similarities and differences in their observations.
    ${statementPairs
        .map(
            (
                pair: { statementA: string; statementB: string },
                index: number
            ) => `
    Pair ${index + 1}:
    Statement A: "${pair.statementA}"
    Statement B: "${pair.statementB}"
    `
        )
        .join("\n")}

    For each pair:
    1. Identify key similarities and differences between the teacher response and the AI response.

    Think about:
    - What does this reveal about the student's learning process?
    - What pedagogical skills or growth are being observed?
    - What educational value or learning outcome is being highlighted?

    When writing similarities and differences, write an insightful paragraph that emphasizes the educational significance. Examples, follow this format:
    - similar: "You both agreed that the student demonstrated growth in their reflection skills..."
    - similar: "You both agreed that the student showed strong critical thinking abilities..."
    - different: "While the AI noted the student's analytical skills, you emphasized their creative problem-solving approach..."
    - different:"Where the AI commented on the student's ability to use sources effectively, you noted room for improvement..."

    `,
    });

    return result.toTextStreamResponse();
}
