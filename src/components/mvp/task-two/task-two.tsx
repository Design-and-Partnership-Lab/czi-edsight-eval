"use client";

import { useCallback, useState } from "react";
import { CategoryButton } from "@/components/mvp/task-two/category-button";

const CATEGORIES = ["Emerging", "Progressing", "Excelling"] as const;

export function TaskTwo() {
    const [selectedCategory, setSelectedCategory] = useState<
        (typeof CATEGORIES)[number] | null
    >(null);

    const handleClick = useCallback((cat: (typeof CATEGORIES)[number]) => {
        setSelectedCategory(cat);
    }, []);

    return (
        <div className="space-y-6">
            <span className="text-ee-black text-xl font-semibold">
                Which EPE category (Emerging, Progressing, Excelling) do you
                think this reflection best fits into?
            </span>

            <div className="flex flex-row items-center space-x-4">
                {CATEGORIES.map((c) => (
                    <CategoryButton
                        key={c}
                        category={c}
                        selected={selectedCategory === c}
                        onClick={() => handleClick(c)}
                    />
                ))}
            </div>
        </div>
    );
}
