"use server";

import { db } from "@/db";
import { UserFeedback_category } from "@prisma/client";

interface upsertReflectionResponse {
    studentId: number;
    agree: boolean;
    reflectionId: string;
    category: UserFeedback_category;
    teacherEmail: string;
}

export async function upsertReflectionResponse({
    agree,
    reflectionId,
    category,
    teacherEmail,
    studentId,
}: upsertReflectionResponse) {
    await db.userFeedback.upsert({
        where: {
            reflectionId_studentId_category_teacherEmail: {
                studentId: studentId,
                reflectionId: reflectionId,
                category: category,
                teacherEmail: teacherEmail,
            },
        },
        create: {
            studentId: studentId,
            reflectionId: reflectionId,
            agree: agree,
            category: category,
            teacherEmail: teacherEmail,
        },
        update: {
            agree: agree,
        },
    });
}
