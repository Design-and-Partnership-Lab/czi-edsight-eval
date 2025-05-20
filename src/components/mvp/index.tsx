"use client";

import { useCallback, useState } from "react";
import { AnnotationWrapper } from "@/components/mvp/annotation-wrapper";
import { TaskTwo } from "@/components/mvp/task-two/task-two";
import { Progress } from "@/components/progress/ProgressBar";
import { Tooltip } from "@/components/tremor/Tooltip";
import { Button } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

export function Mvp() {
    const [canProgress, setCanProgress] = useState(false);

    const handleCanProgress = useCallback((value: boolean) => {
        setCanProgress(value);
    }, []);

    return (
        <div className="mx-16 my-8 space-y-8">
            <Progress />

            <div className="space-y-8 pb-8">
                <div className="flex items-center justify-between">
                    <span className="text-ee-gray text-2xl font-bold">
                        Reflection #1
                    </span>

                    {!canProgress ? (
                        <Tooltip
                            content="Make sure to complete all activities on the current page"
                            side="bottom"
                        >
                            <Button
                                icon={ArrowRightIcon}
                                iconPosition="right"
                                className="bg-primary-dark text-ee-white gap-x-2 rounded-full font-bold disabled:bg-gray-300"
                                disabled={true}
                            >
                                Next Activity
                            </Button>
                        </Tooltip>
                    ) : (
                        <Button
                            icon={ArrowRightIcon}
                            iconPosition="right"
                            className="bg-primary-dark text-ee-white gap-x-2 rounded-full font-bold"
                            disabled={false}
                        >
                            Next Activity
                        </Button>
                    )}
                </div>
            </div>

            <AnnotationWrapper>
                <TaskTwo handleCanProgress={handleCanProgress} />
            </AnnotationWrapper>
        </div>
    );
}
