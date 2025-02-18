"use server";

import { db } from "@/db";

interface upsertStudentProps {
    email: string;
    firstName: string;
    lastName: string;
}

export async function upsertStudent({ email, firstName, lastName }: upsertStudentProps) {
    await db.student.upsert({
        where: {
            email: email,
        },
        create: {
            email: email,
            firstName: firstName,
            lastName: lastName,
            username: "JohnDoe999",
            externalId: "JohnDoe999",
        },
        update: {
            firstName,
            lastName,
        },
    });
}