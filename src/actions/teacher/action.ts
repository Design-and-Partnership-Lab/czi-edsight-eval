"use server";

import { db } from "@/db";

interface upsertTeacherProps {
    id: number;
    firstName: string;
}

export async function upsertTeacher({ id, firstName }: upsertTeacherProps) {
    await db.teacher.upsert({
        where: {
            id: id,
        },
        create: {
            firstName: firstName,
            lastName: "Doe",
            username: "JohnDoe999",
            externalId: "JohnDoe999",
        },
        update: {
            firstName: firstName,
        },
    });
}
