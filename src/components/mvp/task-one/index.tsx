"use client";

import { useEffect } from "react";
import { Lexical } from "@/components/mvp/lexical";

interface TaskOneProps {
    transcript: string | null;
    handleCanProgress: (value: boolean) => void;
}

export function TaskOne({ transcript, handleCanProgress }: TaskOneProps) {
    useEffect(() => {
        handleCanProgress(true);
    }, [handleCanProgress]);

    return <Lexical text={transcript ?? "No transcript found"} />;
}
