"use client";

import React from "react";
import AnnotateText from "@/components/annotate/AnnotateText";
import QUESTIONS from "@/lib/questions";
import {
    RawAnalysis,
    ReflectionQuestion,
    ReflectionResponse,
    ReflectionResponseTranscript,
    Student,
} from "@prisma/client";
import { Card, Divider, Text, Title } from "@tremor/react";
import Annotate from "../annotate/Annotate";

type AnnotationData = {
    student: Student;
    reflectionQuestion: ReflectionQuestion;
    reflectionResponse: ReflectionResponse;
    reflectionResponseTranscript: ReflectionResponseTranscript;
    aiRationale: RawAnalysis[];
};

export default function AnnotationPage({
    student,
    reflectionQuestion,
    reflectionResponse,
    reflectionResponseTranscript,
    aiRationale,
}: AnnotationData) {
    const studentName =
        `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim();
    const category = reflectionQuestion?.category || "No category";
    const transcript =
        reflectionResponseTranscript?.transcript || "No transcript available";

    const prompt =
        QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS];

    return (
        <div className="flex justify-center p-32 text-black">
            <Card className="w-full rounded-lg bg-white">
                <Title className="text-4xl font-semibold">
                    Reflection for {studentName}
                </Title>

                <div className="mt-6 grid grid-cols-5 gap-6">
                    <div className="col-span-3 rounded-lg border p-6">
                        <Title className="text-3xl font-semibold">
                            Prompt ({category})
                        </Title>
                        <Text className="mt-2 text-gray-700">
                            {prompt.question}
                        </Text>
                        <Divider className="my-4" />

                        <Title className="text-3xl font-semibold">
                            Response
                        </Title>

                        <Text className="mt-2 italic text-gray-700">
                            Please review the student&apos;s response and
                            highlight any sections where the AI Rationale is not
                            consistent with your interpretation of the
                            student&apos;s response.
                        </Text>

                        <div className="mt-2 text-gray-700">
                            <Annotate>
                                {transcript}
                            </Annotate>
                        </div>
                    </div>

                    <div className="col-span-2 rounded-lg border p-6">
                        <Title className="text-3xl font-semibold">
                            AI Rationale
                        </Title>

                        <div className="mt-4 space-y-2">
                            {aiRationale && aiRationale.length > 0 ? (
                                aiRationale
                                    .slice(0, 12)
                                    .map((rationale, idx) => {
                                        if (
                                            !rationale.response ||
                                            rationale.response === "None"
                                        )
                                            return null;

                                        return (
                                            <div
                                                key={idx}
                                                className="flex flex-col"
                                            >
                                                <div className="text-lg font-semibold">
                                                    {rationale.promptCode ||
                                                        "Unknown"}
                                                </div>
                                                <div>{rationale.response}</div>
                                            </div>
                                        );
                                    })
                            ) : (
                                <Text className="text-gray-700">
                                    No AI Rationale available.
                                </Text>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
