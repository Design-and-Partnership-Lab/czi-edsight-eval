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
    reflectionResponseTranscriptID: number,
    category: string;
    bucket: string;
}
export async function writeAnalysisForTranscriptID( { reflectionResponseTranscriptID, category, bucket }: AddAnalysisProps ) {
    await db.categoryBucket.create({
        data: {
            reflectionResponseTranscriptID: reflectionResponseTranscriptID,
            category: category,
            bucket: bucket,
            reflectionId: "default-reflection-id",
            modelId: "default-model-id",
        } 
    });
}