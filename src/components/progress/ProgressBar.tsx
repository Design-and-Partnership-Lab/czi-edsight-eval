"use client";

import ProgressBar from "@/components/progress/progress-bar";

import { useProgress } from "./ProgressContext";

export function Progress() {
    const { progress } = useProgress();

    return <ProgressBar currentStep={progress} />;
}
