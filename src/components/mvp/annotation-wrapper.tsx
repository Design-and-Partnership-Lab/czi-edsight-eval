import { Lexical } from "@/components/mvp/lexical";
import { CommentStore } from "@/components/mvp/lexical/commenting";
import QUESTIONS from "@/lib/questions";
import { Text, Title } from "@tremor/react";

interface AnnotationWrapperProps {
    questionData: (typeof QUESTIONS)[keyof typeof QUESTIONS];
    commentStore: CommentStore;
    children: React.ReactNode;
    isReadOnly?: boolean;
}

export function AnnotationWrapper({
    questionData,
    commentStore,
    isReadOnly,
    children,
}: AnnotationWrapperProps) {
    const { question, code } = questionData;

    return (
        <div className="grid grid-cols-6 border">
            <div
                className="col-span-2 space-y-8 border-r p-10"
                id="prompt-annotation-container"
            >
                <div className="space-y-2">
                    <Title className="text-xl font-semibold text-ee-gray-dark">
                        Prompt ({code})
                    </Title>
                    <Text className="text-ee-gray-light">{question}</Text>
                </div>

                {isReadOnly ? (
                    <div className="space-y-2">
                        <Title className="text-xl font-semibold text-ee-gray-dark">
                            Response
                        </Title>
                        <Lexical
                            commentStore={commentStore}
                            isReadOnly={isReadOnly}
                        />
                    </div>
                ) : null}
            </div>

            <div className="col-span-4 p-10">{children}</div>
        </div>
    );
}
