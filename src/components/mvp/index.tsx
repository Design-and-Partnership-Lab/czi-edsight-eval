"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnnotationWrapper } from "@/components/mvp/annotation-wrapper";
import { Category } from "@/components/mvp/lib/utils";
import { TaskFour } from "@/components/mvp/task-four";
import { TaskOne } from "@/components/mvp/task-one";
import { TaskThree } from "@/components/mvp/task-three";
import { TaskTwo } from "@/components/mvp/task-two";
import { Progress } from "@/components/progress/ProgressBar";
import { useProgress } from "@/components/progress/ProgressContext";
import QUESTIONS from "@/lib/questions";
import type {
    ReflectionQuestion,
    ReflectionResponseTranscript,
    SubcategoryBucket,
} from "@prisma/client";
import { Button, Title } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

interface MvpProps {
    reflectionQuestion: ReflectionQuestion;
    reflectionResponseTranscript: ReflectionResponseTranscript;
    aiRationale: SubcategoryBucket[];
}

export function Mvp({
    reflectionQuestion,
    reflectionResponseTranscript,
    aiRationale,
}: MvpProps) {
    const { progress, increment } = useProgress();
    const router = useRouter();

    const [canProgress, setCanProgress] = useState(false);
    const [teacherEval, setTeacherEval] = useState<Category | null>(null); // Task Two
    const [teacherFeedback, setTeacherFeedback] = useState<string | null>(null); // Task Three

    const handleCanProgress = useCallback((value: boolean) => {
        setCanProgress(value);
    }, []);

    const handleNextTask = useCallback(() => {
        increment();
        setCanProgress(false);
    }, [increment]);

    const renderTask = () => {
        switch (progress) {
            case 0:
                return (
                    <div className="flex flex-col gap-y-8">
                        <Title className="text-xl font-semibold text-ee-gray-dark">
                            Read the prompt and the student response. Annotate
                            what stood out to you. Please note that you will not
                            be able to revise your annotations afterward.
                        </Title>

                        <AnnotationWrapper
                            questionData={questionData}
                            response={null}
                        >
                            <TaskOne
                                transcript={
                                    reflectionResponseTranscript.transcript
                                }
                                handleCanProgress={handleCanProgress}
                            />
                        </AnnotationWrapper>
                    </div>
                );
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
                            aiEval="Excelling"
                            teacherEval={teacherEval}
                            handleCanProgress={handleCanProgress}
                            aiRationale={aiRationale}
                            teacherFeedback={teacherFeedback}
                            setTeacherFeedback={setTeacherFeedback}
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
        <div className="mx-16 my-8 min-w-fit space-y-8">
            <Progress />

            <div className="space-y-8 pb-4">
                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-ee-gray">
                        Reflection
                    </span>

                    {progress === 3 ? (
                        <Button
                            icon={ArrowRightIcon}
                            iconPosition="right"
                            className="gap-x-2 rounded-full bg-primary-dark font-bold text-ee-white"
                            onClick={() => router.push("/mvp")}
                        >
                            Next Reflection
                        </Button>
                    ) : (
                        <Button
                            icon={ArrowRightIcon}
                            iconPosition="right"
                            className="gap-x-2 rounded-full bg-primary-dark font-bold text-ee-white disabled:bg-gray-300"
                            disabled={!canProgress}
                            onClick={handleNextTask}
                        >
                            Next Activity
                        </Button>
                    )}
                </div>
            </div>

            {renderTask()}
        </div>
    );
}
