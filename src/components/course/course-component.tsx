"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCourse } from "@/actions/(legacy)/course/action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Course {
    id: number;
    name: string;
    period: string;
    teacherEmail: string | null;
}

interface CoursePageProps {
    teacherName: string;
    teacherEmail: string;
    courses: Course[];
}

export function CoursePage({
    teacherName,
    teacherEmail,
    courses,
}: CoursePageProps) {
    const [newCourseName, setNewCourseName] = useState("");
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleCreateCourse = async () => {
        if (newCourseName.trim() === "") {
            alert("Please enter a course name.");
            return;
        }

        setIsPending(true);

        try {
            await createCourse({ teacherEmail, name: newCourseName });
            setNewCourseName("");
            router.refresh();
        } catch (error) {
            console.error("Error creating course:", error);
            alert("Failed to create course. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="min-h-screen bg-black p-6 text-white">
            <h1 className="mb-6 text-left text-3xl font-bold">
                Courses for {teacherName}
            </h1>

            <div className="mb-6 rounded-lg bg-gray-800 p-4 shadow-sm">
                <h2 className="mb-4 text-2xl font-semibold text-indigo-500">
                    Add a New Course
                </h2>

                <Input
                    type="text"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Enter course name"
                    className="mb-4 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white caret-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <Button
                    onClick={handleCreateCourse}
                    disabled={isPending}
                    className="w-full rounded-lg bg-indigo-600 p-3 text-white transition duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none"
                >
                    {isPending ? "Creating..." : "Create New Course"}
                </Button>
            </div>

            <div>
                <h2 className="mb-4 text-2xl font-semibold text-indigo-500">
                    Current Courses
                </h2>
                {courses.length === 0 ? (
                    <p className="text-gray-400">No courses available.</p>
                ) : (
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="rounded-lg bg-gray-800 p-4 shadow-md transition duration-300 ease-in-out hover:shadow-lg"
                            >
                                <span className="text-lg font-medium text-indigo-300">
                                    {course.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                    {" "}
                                    (Period: {course.period})
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
