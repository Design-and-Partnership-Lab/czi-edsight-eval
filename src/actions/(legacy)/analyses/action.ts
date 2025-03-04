"use server";

import { db } from "@/db";
import { CategoryBucket_category, CategoryBucket_bucket } from "@prisma/client";

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
    category: CategoryBucket_category;
    bucket: CategoryBucket_bucket;
    reflectionId: string;
    modelId: string;
}

export async function writeAnalysisForTranscriptId({ reflectionResponseTranscriptId, category, bucket, reflectionId, modelId }: AddAnalysisProps) {
    await db.categoryBucket.create({
        data: {
            reflectionResponseTranscriptId: reflectionResponseTranscriptId,
            category: category,
            bucket: bucket,
            reflectionId: reflectionId,
            modelId: modelId,
        }
    });
}
