"use server";

import { db } from "@/db";

interface CreateCourseProps {
    teacherEmail: string;
    name: string;
}

export async function createCourse({ teacherEmail, name }: CreateCourseProps) {
    console.log("CreateCourse called with:", { teacherEmail, name });

    try {
        const newCourse = await db.course.create({
            data: {
                externalId: String(Math.floor(100000 + Math.random() * 900000)), // random 6 digit number
                name: name, 
                period: String(Math.floor(Math.random() * 10) + 1),              // random period (1-10)
                schoolId: 99,                                      
                gradingTermName: "24-25 Winter",                                
                isPrimaryTeacher: true,
                teacherEmail: teacherEmail,
            },
        });

        console.log("New course created successfully:", newCourse);
        return newCourse;
    } catch (error) {
        console.error("Error creating course:", error);
        throw new Error("Failed to create a new course");
    }
}