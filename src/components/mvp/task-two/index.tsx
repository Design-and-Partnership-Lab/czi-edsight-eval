"use client";

import { useCallback, useState } from "react";
import { CATEGORIES, type Category } from "@/components/mvp/lib/utils";
import { CategoryButton } from "@/components/mvp/task-two/category-button";

interface TaskTwoProps {
    teacherEval: Category | null;
    setTeacherEval: (value: Category) => void;
    handleCanProgress: (value: boolean) => void;
}

export function TaskTwo({
    teacherEval,
    setTeacherEval,
    handleCanProgress,
}: TaskTwoProps) {
    const handleClick = useCallback(
        (cat: (typeof CATEGORIES)[number]) => {
            setTeacherEval(cat);
            handleCanProgress(true);
        },
        [handleCanProgress, setTeacherEval]
    );
    const [showInstructions, setShowInstructions] = useState(false)
    const toggleInstructions = () => {
        setShowInstructions(!showInstructions)
    }
    return (
        <div className="space-y-6 flex flex-col">
            <span className="text-ee-gray-dark text-xl font-semibold">
                Which EPE category (Emerging, Progressing, Excelling) do you
                think this reflection best fits into?
            </span>
                    <button className="border" onClick={toggleInstructions}> {showInstructions ? "Click to Hide Instructions" : "Click to Show Detailed Instructions"}</button>
                        {showInstructions && (
                    <p className="text-m mb-6 leading-relaxed text-gray-700">
                        You will review the student&apos;s reflection and select the
                        EPE category — Emerging, Progressing, or Excelling — that
                        you believe best fits the overall quality of the response.
                        Carefully read through the student&apos;s writing and
                        consider how well it addresses the prompt. Once you have
                        made your selection by clicking one of the three category
                        buttons, the Next Activity button will become clickable,
                        allowing you to move on to the next part of the survey.
                        Please take your time to reflect before making your choice,
                        as you will not be able to revise your selection afterward.
                    </p>
                        )}
            <div className="flex flex-row items-center space-x-4">
                {CATEGORIES.map((c) => (
                    <CategoryButton
                        key={c}
                        category={c}
                        selected={teacherEval === c}
                        onClick={() => handleClick(c)}
                    />
                ))}
            </div>
        </div>
    );
}
