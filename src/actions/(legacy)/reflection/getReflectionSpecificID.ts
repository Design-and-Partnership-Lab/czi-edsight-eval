'use server'

import { db } from "@/db";

export async function getReflectionSpecificID() {
    try {
        const reflections = await db.reflection.findMany({
            where: {
                courseId: 38978,
            },
            select: {
                id: true,
                title: true,
            }
        });
        return reflections;
    } catch (error) {
        console.error("Failed to fetch reflections:", error);
        return [];
    }
}