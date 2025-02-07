"use client";

import { useCallback, useState, useTransition } from "react";
import { upsertStudent } from "@/actions/student/action";
import { Button } from "@/components/ui/button";

// Define what props your component will receive
interface StudentComponentProps {
    student: { id: number; email: string | null; firstName: string; lastName: string | null };
}

/**
 * This is a Client Component. Client components are used when we need interactivity in our components (amongst other reasons).
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/client-components}
 */
export function StudentComponent({ student }: StudentComponentProps) {
    // Data is passed via props from the Server Component which calls it
    const { id, email, firstName: serverFirstName, lastName } = student;

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
                await upsertStudent({
                    email: "182test@student.auhsd.us",
                    firstName: newName,
                    lastName: "Doe",
                });
            } catch (error) {
                // If there's an error, we should "rollback" to the prior value
                setFirstName(prevName);
                console.error("Failed to update student:", error);
            }
        });
    }, [email, firstName, newName]);

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
                {isPending ? "Updating..." : `Upsert Student as ${newName}`}
            </Button>
        </div>
    );
}
