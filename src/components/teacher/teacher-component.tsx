"use client";

import type { Teacher } from "@prisma/client";

interface TeacherProps {
    teacher: Teacher | null;
}

export function TeacherComponent({ teacher }: TeacherProps) {
    if (!teacher) {
        return <div>No teacher found</div>;
    }

    const { firstName, lastName } = teacher;

    return (
        <div>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
        </div>
    );
}
