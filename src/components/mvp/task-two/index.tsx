"use client";

import { useCallback } from "react";
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

    return (
        <div className="space-y-6">
            <span className="text-ee-gray-dark text-xl font-semibold">
                Which EPE category (Emerging, Progressing, Excelling) do you
                think this reflection best fits into?
            </span>

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
