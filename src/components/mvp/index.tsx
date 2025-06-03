"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { setEvaluationData } from "@/actions/evaluation/action";
import { ResponseType } from "@/app/api/chat/route";
import { AnnotationWrapper } from "@/components/mvp/annotation-wrapper";
import { Comments, CommentStore } from "@/components/mvp/lexical/commenting";
import PlaygroundEditorTheme from "@/components/mvp/lexical/themes/PlaygroundEditorTheme";
import { populateRichText } from "@/components/mvp/lexical/utils/populateRichText";
import { Category } from "@/components/mvp/lib/utils";
import { TaskFour } from "@/components/mvp/task-four";
import { TaskOne } from "@/components/mvp/task-one";
import { TaskThree } from "@/components/mvp/task-three";
import { TaskTwo } from "@/components/mvp/task-two";
import { Progress } from "@/components/progress/ProgressBar";
import { useProgress } from "@/components/progress/ProgressContext";
import QUESTIONS from "@/lib/questions";
import { MarkNode } from "@lexical/mark";
import {
    InitialConfigType,
    LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
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
    teacherEmail: string;
}

export function Mvp({
    reflectionQuestion,
    reflectionResponseTranscript,
    aiRationale,
    teacherEmail,
}: MvpProps) {
    const questionData = useMemo(
        () => QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS],
        [reflectionQuestion.question]
    );

    const transcript = reflectionResponseTranscript.transcript?.trim() ?? "";

    const initialConfig = {
        editorState: populateRichText(transcript),
        namespace: "Annotation",
        onError: (error: Error) => {
            throw error;
        },
        nodes: [MarkNode],
        theme: PlaygroundEditorTheme,
        editable: false,
    } satisfies InitialConfigType;

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <MvpContent
                questionData={questionData}
                reflectionResponseTranscript={reflectionResponseTranscript}
                aiRationale={aiRationale}
                reflectionResponseId={reflectionResponseTranscript.id}
                teacherEmail={teacherEmail}
            />
        </LexicalComposer>
    );
}

const MvpContent = ({
    questionData,
    aiRationale,
    reflectionResponseId,
    teacherEmail,
}: {
    questionData: (typeof QUESTIONS)[keyof typeof QUESTIONS];
    reflectionResponseTranscript: ReflectionResponseTranscript;
    aiRationale: SubcategoryBucket[];
    reflectionResponseId: number;
    teacherEmail: string;
}) => {
    const router = useRouter();

    const [editor] = useLexicalComposerContext();
    const commentStore = useMemo(() => new CommentStore(editor), [editor]);

    const { progress, setProgress, increment } = useProgress();

    const [canProgress, setCanProgress] = useState(false);
    const [annotation, setAnnotation] = useState<Comments>([]); // Task One
    const [teacherEval, setTeacherEval] = useState<Category | null>(null); // Task Two
    const [teacherFeedback, setTeacherFeedback] = useState<string | null>(null); // Task Three
    const [result, setResult] = useState<ResponseType>(); // Task Four

    const handleCanProgress = useCallback((value: boolean) => {
        setCanProgress(value);
    }, []);

    const handleNextTask = useCallback(() => {
        increment();
        setCanProgress(false);
    }, [increment]);

    const handleNextReflection = useCallback(() => {
        router.push("/mvp");
        router.refresh();
    }, [router]);

    useEffect(() => {
        if (progress == 2) {
            setAnnotation(commentStore.getComments());
        }
    }, [commentStore, progress]);

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
                            commentStore={commentStore}
                        >
                            <TaskOne
                                commentStore={commentStore}
                                handleCanProgress={handleCanProgress}
                            />
                        </AnnotationWrapper>
                    </div>
                );
            case 1:
                return (
                    <AnnotationWrapper
                        questionData={questionData}
                        commentStore={commentStore}
                        isReadOnly={true}
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
                        commentStore={commentStore}
                        isReadOnly={true}
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
                return (
                    <TaskFour
                        result={result}
                        setResult={setResult}
                        setEval={async (res: ResponseType | undefined) => {
                            if (res) {
                                setEvaluationData(
                                    reflectionResponseId,
                                    teacherEmail,
                                    annotation,
                                    teacherEval,
                                    teacherFeedback ?? "",
                                    res
                                );
                            }
                        }}
                    />
                );
            default:
                return null;
        }
    };

    useEffect(() => {
        setProgress(0);
    }, [setProgress]);

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
                            onClick={handleNextReflection}
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
};
