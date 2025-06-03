"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import FeedbackInstructions from "@/components/survey-instructions/feedback";
import IntroInstructions from "@/components/survey-instructions/intro";
import Task1Instructions from "@/components/survey-instructions/task1";
import Task2Instructions from "@/components/survey-instructions/task2";
import Task3Instructions from "@/components/survey-instructions/task3";

export default function SurveyInstructionsPage() {
    const [progress, setProgress] = useState(0);

    const incrementProgress = () => setProgress((p) => p + 1);

    const renderInstructions = () => {
        switch (progress) {
            case 0:
                return (
                    <IntroInstructions incrementProgress={incrementProgress} />
                );
            case 1:
                return (
                    <Task1Instructions incrementProgress={incrementProgress} />
                );
            case 2:
                return (
                    <Task2Instructions incrementProgress={incrementProgress} />
                );
            case 3:
                return (
                    <Task3Instructions incrementProgress={incrementProgress} />
                );
            case 4:
                return (
                    <FeedbackInstructions
                        incrementProgress={incrementProgress}
                    />
                );
            case 5: {
                redirect("/mvp");
            }
        }
    };

    return <>{renderInstructions()}</>;
}
