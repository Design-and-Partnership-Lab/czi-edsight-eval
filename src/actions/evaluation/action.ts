"use server";

import { ResponseType } from "@/app/api/chat/route";
import { Comments } from "@/components/mvp/lexical/commenting";
import { Category } from "@/components/mvp/lib/utils";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getEvaluationData(email: string) {
    try {
        const teacher = await prisma.teacher.findFirst({
            where: { email: email },
            select: { id: true },
        });

        if (!teacher) {
            console.error("Teacher not found for email:", email);
            return { error: "Teacher not found" };
        }

        const evaluation = await prisma.teacher_annotations.findMany({
            where: { teacher_user_id: teacher.id },
            select: { id: true, reflection_response_id: true },
        });

        if (!evaluation) {
            console.error("Teacher Evaluation not found");
        }

        return (
            evaluation.map((item) => ({
                id: item.id,
                reflection_response_id: item.reflection_response_id,
            })) || { error: "No evaluation found" }
        );
    } catch (error) {
        console.error(error);
        return { error: "Error fetching data" };
    }
}

export async function setEvaluationData(
    reflectionResponseId: number,
    teacherEmail: string,
    annotation: Comments,
    teacherEval: Category | null,
    comparisonComments: string,
    comparison: ResponseType
) {
    try {
        const teacher = await prisma.teacher.findFirst({
            where: { email: teacherEmail },
            select: { id: true },
        });

        if (!teacher) {
            console.error("Teacher not found for email:", teacherEmail);
            return { error: "Teacher not found" };
        }

        const evaluation = await prisma.teacher_annotations.create({
            data: {
                reflection_response_id: reflectionResponseId,
                teacher_user_id: teacher.id,
                annotation: JSON.stringify(annotation),
                epe_category: teacherEval,
                comparison_comments: comparisonComments,
                created_at: new Date(),
                comparison: JSON.stringify(comparison),
            },
        });

        console.log("Evaluation created:", evaluation);
        return evaluation || { error: "No evaluation created" };
    } catch (error) {
        console.error(error);
        return { error: "Error writing data" };
    }
}
