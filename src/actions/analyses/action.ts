"use server";

import { db } from "@/db";

export async function getAnalysesByTranscriptId(reflectionResponseTranscriptId: number) {
    const analyses = await db.categoryBucket.findMany({
        where: {
            reflectionResponseTranscriptId: reflectionResponseTranscriptId
        },
        select: {
            id: true,
            category: true,
            bucket: true
        },
    });
    return analyses
}


interface AddAnalysisProps {
    reflectionResponseTranscriptId: number,
    category: string;
    bucket: string;
}

export async function writeAnalysisForTranscriptId({ reflectionResponseTranscriptId, category, bucket }: AddAnalysisProps) {
    await db.categoryBucket.create({
        data: {
            reflectionResponseTranscriptId: reflectionResponseTranscriptId,
            category: category,
            bucket: bucket,
            reflectionId: "default-reflection-id",
            modelId: "default-model-id",
        }
    });
}
