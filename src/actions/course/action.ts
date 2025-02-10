"use server";

import { db } from "@/db";

interface UpsertCourseProps {
    id: number;
    teacherEmail: string;
}

export async function upsertCourse({ id, teacherEmail }: UpsertCourseProps) {
    await db.course.upsert({
        where: {
            id: id,
        },
        create: {
            externalId: String(Math.floor(100000 + Math.random() * 900000)), // random 6 digit number
            name: "Intro to AI",                                             // hardcoded 
            period: String(Math.floor(Math.random() * 10) + 1),              // random period (1-10)
            schoolId: 99,                                                    // jane smith's school id
            gradingTermName: "24-25 Winter",                                 // hardcoded
            isPrimaryTeacher: true,         
            teacherEmail: teacherEmail,                                      // jane_smith_test@auhsd.us
        },
        update: {
            teacherEmail: teacherEmail
        },
    });
}

