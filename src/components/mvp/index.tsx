"use client";

import { useCallback, useState } from "react";
import { AnnotationWrapper } from "@/components/mvp/annotation-wrapper";
import { Category } from "@/components/mvp/lib/utils";
import { TaskThree } from "@/components/mvp/task-three";
import { TaskTwo } from "@/components/mvp/task-two";
import { Progress } from "@/components/progress/ProgressBar";
import { Button } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

export function Mvp() {
    const [canProgress, setCanProgress] = useState(false);
    const [teacherEval, setTeacherEval] = useState<Category | null>(null);

    const handleCanProgress = useCallback((value: boolean) => {
        setCanProgress(value);
    }, []);
    const [currentTask, setCurrentTask] = useState(2);

    const renderTask = () => {
        switch (currentTask) {
            case 2:
                return (
                    <TaskTwo
                        teacherEval={teacherEval}
                        setTeacherEval={setTeacherEval}
                        handleCanProgress={handleCanProgress}
                    />
                );
            case 3:
                return (
                    <TaskThree
                        teacherEval={teacherEval}
                        aiEval="Excelling"
                        handleCanProgress={handleCanProgress}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="mx-16 my-8 space-y-8">
            <Progress />

            <div className="space-y-8 pb-8">
                <div className="flex items-center justify-between">
                    <span className="text-ee-gray text-2xl font-bold">
                        Reflection #1
                    </span>

                    <Button
                        icon={ArrowRightIcon}
                        iconPosition="right"
                        className="bg-primary-dark text-ee-white gap-x-2 rounded-full font-bold disabled:bg-gray-300"
                        disabled={!canProgress}
                        onClick={() => {
                            setCurrentTask(currentTask + 1);
                            setCanProgress(false);
                        }}
                    >
                        Next Activity
                    </Button>
                </div>
            </div>

            <AnnotationWrapper>{renderTask()}</AnnotationWrapper>
        </div>
    );
}
