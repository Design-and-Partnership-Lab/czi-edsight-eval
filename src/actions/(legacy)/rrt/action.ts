"use server";

import { db } from "@/db";

interface upsertStudentTranscript {
    questionId: number;
    reflectionId: string;
    studentEmail: string;
    transcript: string;
}

export async function upsertTranscript({ questionId, reflectionId, studentEmail, transcript }: upsertStudentTranscript) {
    await db.reflectionResponseTranscript.upsert({
        where: {
            studentEmail_reflectionId_questionId: {
                studentEmail: "283test@student.auhsd.us",
                reflectionId: reflectionId,
                questionId: 16630,
            }
        },
        create: {
            transcript: transcript,
            studentEmail: "283test@student.auhsd.us",
            reflectionId: reflectionId,
            questionId: 16630,
        },
        update: {
            transcript: transcript,
        },
    });
}
