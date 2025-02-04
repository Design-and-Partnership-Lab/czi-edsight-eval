"use client";

interface TeacherComponentProps {
    teacherName: { firstName: string; lastName: string } | null;
}

export function TeacherComponent({ teacherName }: TeacherComponentProps) {
    if (!teacherName) {
        return <div>No teacher found</div>;
    }

    const { firstName, lastName } = teacherName;

    return (
        <div>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
        </div>
    );
}
