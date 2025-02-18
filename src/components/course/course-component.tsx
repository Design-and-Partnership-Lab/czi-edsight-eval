"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/actions/course/action"; 

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

export function CoursePage({ teacherName, teacherEmail, courses }: CoursePageProps) {
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
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold text-left mb-6">Courses for {teacherName}</h1>
    
            <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Add a New Course</h2>
    
                <Input
                    type="text"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    placeholder="Enter course name"
                    className="w-full p-3 mb-4 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-gray-700 text-white caret-white"
                />
    
                <Button
                    onClick={handleCreateCourse}
                    disabled={isPending}
                    className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out"
                >
                    {isPending ? "Creating..." : "Create New Course"}
                </Button>
            </div>
    
            <div>
                <h2 className="text-2xl font-semibold text-indigo-500 mb-4">Current Courses</h2>
                {courses.length === 0 ? (
                    <p className="text-gray-400">No courses available.</p>
                ) : (
                    <ul className="space-y-4">
                        {courses.map((course) => (
                            <li
                                key={course.id}
                                className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                            >
                                <span className="text-lg font-medium text-indigo-300">{course.name}</span>
                                <span className="text-sm text-gray-500"> (Period: {course.period})</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
