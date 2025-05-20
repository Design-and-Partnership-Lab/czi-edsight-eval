"use client";

import { useCallback, useMemo, useState } from "react";
import { AnnotationWrapper } from "@/components/mvp/annotation-wrapper";
import { Category } from "@/components/mvp/lib/utils";
import { TaskFour } from "@/components/mvp/task-four";
import { TaskThree } from "@/components/mvp/task-three";
import { TaskTwo } from "@/components/mvp/task-two";
import { Progress } from "@/components/progress/ProgressBar";
import { useProgress } from "@/components/progress/ProgressContext";
import QUESTIONS from "@/lib/questions";
import {
    Reflection,
    ReflectionQuestion,
    ReflectionResponseTranscript,
} from "@prisma/client";
import { Button } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

interface MvpProps {
    reflection: Reflection;
    reflectionQuestion: ReflectionQuestion;
    reflectionResponseTranscript: ReflectionResponseTranscript;
}

export function Mvp({
    reflection,
    reflectionQuestion,
    reflectionResponseTranscript,
}: MvpProps) {
    const { progress, increment } = useProgress();

    const [canProgress, setCanProgress] = useState(false);
    const [teacherEval, setTeacherEval] = useState<Category | null>(null);

    const handleCanProgress = useCallback((value: boolean) => {
        setCanProgress(value);
    }, []);
    const handleNextTask = useCallback(() => {
        increment();
        setCanProgress(false);
    }, [increment]);

    const renderTask = () => {
        switch (progress) {
            case 1:
                return (
                    <AnnotationWrapper
                        questionData={questionData}
                        response=""
                    >
                        <TaskTwo
                            teacherEval={teacherEval}
                            setTeacherEval={setTeacherEval}
                            handleCanProgress={handleCanProgress}
                        />
                    </AnnotationWrapper>
                );
            case 2:
                return (
                    <AnnotationWrapper
                        questionData={questionData}
                        response=""
                    >
                        <TaskThree
                            teacherEval={teacherEval}
                            aiEval="Excelling"
                            handleCanProgress={handleCanProgress}
                        />
                    </AnnotationWrapper>
                );
            case 3:
                return <TaskFour />;
            default:
                return null;
        }
    };

    const questionData = useMemo(
        () => QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS],
        [reflectionQuestion.question]
    );

    return (
        <div className="mx-16 my-8 min-w-[1200px] space-y-8">
            <Progress />

            <div className="space-y-8 pb-8">
                <div className="flex items-center justify-between">
                    <span className="text-ee-gray text-2xl font-bold">
                        Reflection
                    </span>

                    <Button
                        icon={ArrowRightIcon}
                        iconPosition="right"
                        className="bg-primary-dark text-ee-white gap-x-2 rounded-full font-bold disabled:bg-gray-300"
                        disabled={!canProgress}
                        onClick={handleNextTask}
                    >
                        Next Activity
                    </Button>
                </div>
            </div>

            {renderTask()}
        </div>
    );
}
