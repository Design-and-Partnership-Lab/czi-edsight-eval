"use server";

import { db } from "@/db";

interface UpsertCourseProps {
    id: number;
    teacherEmail: string;
    name: string; // Added name to the interface
}

export async function upsertCourse({ id, teacherEmail, name }: UpsertCourseProps) {
    console.log("UpsertCourse called with:", { id, teacherEmail, name });

    try {
        const result = await db.course.upsert({
            where: {
                id: id,
            },
            create: {
                externalId: String(Math.floor(100000 + Math.random() * 900000)), // random 6 digit number
                name: name,                                           // hardcoded
                period: String(Math.floor(Math.random() * 10) + 1),             // random period (1-10)
                schoolId: 99,                                                   // jane smith's school id
                gradingTermName: "24-25 Winter",                                // hardcoded
                isPrimaryTeacher: true,         
                teacherEmail: teacherEmail,                                     // provided teacher email
            },
            update: {
                name: name // Updates course name
            },
        });

        console.log("Database upsert successful:", result);
        return result;
    } catch (error) {
        console.error("Error updating course:", error);
        throw new Error("Failed to update course");
    }
}
