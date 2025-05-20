// EPEPageShared.tsx
"use client";

import React, { useEffect, useState } from "react";
import QUESTIONS from "@/lib/questions";
import {
    ReflectionQuestion,
    ReflectionResponseTranscript,
} from "@prisma/client";
import { Card, Divider, Text, Title } from "@tremor/react";

type EPEPageSharedProps = {
    reflectionQuestion: ReflectionQuestion;
    reflectionResponseTranscript: ReflectionResponseTranscript;
    children?: React.ReactNode;
    headerAction?: React.ReactNode; // Allows button or other header actions
};

const EPEPageShared: React.FC<EPEPageSharedProps> = ({
    reflectionQuestion,
    reflectionResponseTranscript,
    children,
    headerAction,
}) => {
    const [annotatedText, setAnnotatedText] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("annotatedText");
        if (saved) setAnnotatedText(saved);
    }, []);

    const category = reflectionQuestion?.category || "No category";
    const prompt =
        QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS];

    return (
        <div className="flex justify-center text-black">
            <Card className="w-full rounded-none bg-white">
                {/* Header with title and optional button */}
                <div className="flex items-center justify-between">
                    <Title className="text-2xl font-semibold text-slate-600">
                        Reflection #1
                    </Title>
                    {headerAction && <div>{headerAction}</div>}
                </div>

                <div className="mt-6 grid grid-cols-5">
                    {/* Left side with border */}
                    <div className="col-span-2 rounded-none border p-10">
                        <Title className="text-xl font-semibold">Prompt</Title>
                        <Text className="mt-2 text-gray-700">
                            {`${
                                category === "Criticalthinking"
                                    ? "Critical Thinking"
                                    : category
                            }: ${prompt.question}`}
                        </Text>

                        <Divider className="my-5" />

                        <Title className="text-xl font-semibold">
                            Response
                        </Title>
                        <div
                            className="prose mt-2 max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: annotatedText }}
                        />
                    </div>

                    {/* Right side content injected via children */}
                    <div className="col-span-3 rounded-none border border-l-0 p-10">
                        {children}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default EPEPageShared;
