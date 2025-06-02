"use server";

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
