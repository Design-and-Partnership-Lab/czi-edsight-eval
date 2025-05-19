"use client";

import React from "react";
import EPEPageShared from "@/components/task2and3/EPEPageShared"; // Import shared component
import {
    ReflectionQuestion,
    ReflectionResponseTranscript,
    Student,
} from "@prisma/client";

type EPEData = {
    student: Student;
    reflectionQuestion: ReflectionQuestion;
    reflectionResponseTranscript: ReflectionResponseTranscript;
};

export default function EPEPageTask3({
    student,
    reflectionQuestion,
    reflectionResponseTranscript,
}: EPEData) {
    return (
        <div>
            <EPEPageShared
                reflectionQuestion={reflectionQuestion}
                reflectionResponseTranscript={reflectionResponseTranscript}
            />
        </div>
    );
}
