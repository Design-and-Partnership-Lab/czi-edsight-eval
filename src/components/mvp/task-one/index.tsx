"use client";

import "@/app/annotation-lexical/index.css";

import { useEffect } from "react";
import AnnotateLexical from "@/app/annotation-lexical/AnnotateLexical";

interface TaskOneProps {
    transcript: string | null;
    handleCanProgress: (value: boolean) => void;
}

export function TaskOne({ transcript, handleCanProgress }: TaskOneProps) {
    useEffect(() => {
        handleCanProgress(true);
    }, [handleCanProgress]);

    return (
        <AnnotateLexical>{transcript ?? "No transcript found"}</AnnotateLexical>
    );
}
