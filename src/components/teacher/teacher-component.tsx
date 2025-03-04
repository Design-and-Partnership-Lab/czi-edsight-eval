"use client";

import { useCallback, useState, useTransition } from "react";
import { upsertTeacher } from "@/actions/(legacy)/teacher/action";
import { Button } from "@/components/ui/button";

// Define what props your component will receive
interface TeacherComponentProps {
    teacher: { id: number; firstName: string; lastName: string };
}

/**
 * This is a Client Component. Client components are used when we need interactivity in our components (amongst other reasons).
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/client-components}
 */
export function TeacherComponent({ teacher }: TeacherComponentProps) {
    // Data is passed via props from the Server Component which calls it
    const { id, firstName: serverFirstName, lastName } = teacher;

    const [firstName, setFirstName] = useState(serverFirstName);
    const [isPending, startTransition] = useTransition();

    const newName = firstName === "John" ? "Jane" : "John";

    const handleClick = useCallback(() => {
        const prevName = firstName;
        setFirstName(newName);

        /**
         * Adding an optimistic state is helpful for making the UI feel very snappy and responsive
         */
        startTransition(async () => {
            try {
                await upsertTeacher({
                    id,
                    firstName: newName,
                });
            } catch (error) {
                // If there's an error, we should "rollback" to the prior value
                setFirstName(prevName);
                console.error("Failed to update teacher:", error);
            }
        });
    }, [id, firstName, newName]);

    return (
        <div>
            <div>
                <div>First Name: {firstName}</div>
                <div>Last Name: {lastName}</div>
            </div>

            <Button
                onClick={handleClick}
                disabled={isPending}
            >
                {isPending ? "Updating..." : `Upsert Teacher as ${newName}`}
            </Button>
        </div>
    );
}
