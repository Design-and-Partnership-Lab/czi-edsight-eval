"use client";

import { useCallback, useState, useTransition } from "react";
import { upsertCourse } from "@/actions/course/action";
import { Button } from "@/components/ui/button";

// Define what props your component will receive
interface CourseComponentProps {
    course: {
        id: number;
        name: string;
        period: string;
        teacherEmail: string;
    };
}

/**
 * This is a Client Component. Client components are used when we need interactivity in our components (amongst other reasons).
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/client-components}
 */
export function CourseComponent({ course }: CourseComponentProps) {
    // Data is passed via props from the Server Component which calls it
    const { id, name: serverName, period, teacherEmail } = course;

    const [name, setName] = useState(serverName);
    const [isPending, startTransition] = useTransition();

    const newName = name === "Intro to AI" ? "Advanced AI" : "Intro to AI";

    const handleClick = useCallback(() => {
        const prevName = name;
        setName(newName); 

        /**
         * Adding an optimistic state is helpful for making the UI feel very snappy and responsive
         */
        startTransition(async () => {
            try {
                await upsertCourse({ 
                    id, 
                    teacherEmail,
                    name
                });
            } catch (error) {
                // If there's an error, we should "rollback" to the prior value
                setName(prevName); 
                console.error("Failed to update course:", error);
            }
        });
    }, [id, name, newName, teacherEmail]);

    return (
        <div>
            <div>
                <div>Course Name: {name}</div>
                <div>Period: {period}</div>
            </div>

            <Button 
                onClick={handleClick} 
                disabled={isPending}
            >
                {isPending ? "Updating..." : `Upsert Course as ${newName}`}
            </Button>
        </div>
    );
}
