export const CATEGORIES = ["Emerging", "Progressing", "Excelling"] as const;
export type Category = (typeof CATEGORIES)[number];

export const COLOR_MAP = {
    Emerging: {
        bg: "bg-primary-light",
        text: "text-primary-light",
        border: "border-primary-light",
    },
    Progressing: {
        bg: "bg-primary-medium",
        text: "text-primary-medium",
        border: "border-primary-medium",
    },
    Excelling: {
        bg: "bg-primary-dark",
        text: "text-primary-dark",
        border: "border-primary-dark",
    },
} as const;
