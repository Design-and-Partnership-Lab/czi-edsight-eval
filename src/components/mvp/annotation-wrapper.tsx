import QUESTIONS from "@/lib/questions";
import { Text, Title } from "@tremor/react";

interface AnnotationWrapperProps {
    questionData: (typeof QUESTIONS)[keyof typeof QUESTIONS];
    response: string;
    children: React.ReactNode;
}

export function AnnotationWrapper({
    questionData,
    response,
    children,
}: AnnotationWrapperProps) {
    const { question, code } = questionData;

    return (
        <div className="grid grid-cols-6 border">
            <div className="col-span-2 space-y-8 border-r p-10">
                <div className="space-y-2">
                    <Title className="text-ee-gray-dark text-xl font-semibold">
                        Prompt ({code})
                    </Title>
                    <Text className="text-ee-gray-light">{question}</Text>
                </div>

                <div className="space-y-2">
                    <Title className="text-ee-gray-dark text-xl font-semibold">
                        Response
                    </Title>
                    <Text className="text-ee-gray-light">
                        [[ THE COMPONENT ]]
                    </Text>
                </div>
            </div>

            <div className="col-span-4 p-10">{children}</div>
        </div>
    );
}
