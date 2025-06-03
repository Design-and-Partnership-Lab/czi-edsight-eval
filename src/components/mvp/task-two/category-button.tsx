import { COLOR_MAP } from "@/components/mvp/lib/utils";
import { cx } from "@/lib/utils";
import { Button } from "@tremor/react";

interface CategoryButtonProps {
    category: keyof typeof COLOR_MAP;
    selected: boolean;
    onClick: () => void;
}

export function CategoryButton({
    category,
    selected,
    onClick,
}: CategoryButtonProps) {
    return (
        <Button
            className={cx(
                "rounded-full border-2 px-8 text-lg font-semibold transition-all",
                COLOR_MAP[category].border,
                selected
                    ? [COLOR_MAP[category].bg, "text-ee-white"]
                    : ["bg-ee-white", COLOR_MAP[category].text]
            )}
            onClick={onClick}
        >
            {category}
        </Button>
    );
}
