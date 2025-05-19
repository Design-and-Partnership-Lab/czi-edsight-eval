// EPEPageTask2.tsx

"use client";

import React, { useState } from "react";
import EPECategorySelector, {
    Category,
} from "@/components/task2/epe-guess-question";
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

export default function EPEPageTask2({
    student,
    reflectionQuestion,
    reflectionResponseTranscript,
}: EPEData) {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    const handleNextClick = () => {
        if (selectedCategory) {
            console.log("User picked:", selectedCategory);
            // TODO: onNext logic
        }
    };

    const headerButton = (
        <button
            onClick={handleNextClick}
            disabled={!selectedCategory}
            className={`rounded-3xl px-6 py-2 font-semibold transition-colors duration-200 focus:outline-none ${
                selectedCategory
                    ? "cursor-pointer bg-[#001F54] text-white"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
        >
            Next Activity →
        </button>
    );

    return (
        <div>
            <EPEPageShared
                reflectionQuestion={reflectionQuestion}
                reflectionResponseTranscript={reflectionResponseTranscript}
                headerAction={headerButton}
            >
                <div className="mt-4 flex justify-center">
                    <EPECategorySelector
                        selected={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>
                {/* <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleNextClick}
                        disabled={!selectedCategory}
                        className={`rounded-3xl px-6 py-2 font-semibold transition-colors duration-200 focus:outline-none ${
                            selectedCategory
                                ? "cursor-pointer bg-[#001F54] text-white"
                                : "cursor-not-allowed bg-gray-300 text-gray-500"
                        }`}
                    >
                        Next Activity →
                    </button>
                </div> */}
            </EPEPageShared>
        </div>
    );
}
