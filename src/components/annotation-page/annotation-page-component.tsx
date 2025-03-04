"use client";

import React from "react";
import AnnotateText from "@/components/annotate/AnnotateText";
import {
    Insights,
    ReflectionQuestion,
    ReflectionResponse,
    ReflectionResponseTranscript,
    Student,
} from "@prisma/client";
import { Card, Divider, Text, Title } from "@tremor/react";

type AnnotationData = {
    student: Student;
    reflectionQuestion: ReflectionQuestion;
    reflectionResponse: ReflectionResponse;
    reflectionResponseTranscript: ReflectionResponseTranscript;
    aiRationale: Insights[];
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
    const responseTranscript =
        reflectionResponse?.transcription_q1 || "No transcript available";

    console.log(reflectionQuestion.question);

    return (
        <div className="flex justify-center p-32 text-black">
            <Card className="w-full rounded-lg bg-white">
                <Title className="text-4xl font-semibold">
                    Reflection for {studentName}
                </Title>

                <div className="mt-6 grid grid-cols-2 gap-6">
                    <div className="rounded-lg border p-6">
                        <Title className="text-lg font-semibold">Prompt</Title>
                        <Text className="mt-2 text-gray-700">{category}</Text>
                        <Divider className="my-4" />

                        <Title className="text-lg font-semibold">
                            Response
                        </Title>

                        <Text className="mt-2 italic text-gray-700">
                            Please review the student&apos;s response and
                            highlight any sections where the AI Rationale is not
                            consistent with your interpretation of the
                            student&apos;s response.
                        </Text>

                        <div className="mt-2 text-gray-700">
                            <AnnotateText>{transcript}</AnnotateText>
                        </div>
                    </div>

                    <div className="rounded-lg border p-6">
                        <Title className="text-lg font-semibold">
                            AI Rationale
                        </Title>

                        <div className="mt-4 space-y-2">
                            {aiRationale && aiRationale.length > 0 ? (
                                aiRationale.map((insight, idx) => {
                                    if (!insight) return null;
                                    const average = insight.average ?? 0;
                                    const categoryLevel = `bg-blue-${average}00`;
                                    return (
                                        <div
                                            key={idx}
                                            className="flex items-center"
                                        >
                                            <span
                                                className={`h-4 w-4 ${categoryLevel} mr-2 rounded-full`}
                                            ></span>
                                            <span>
                                                {insight.subcategory ||
                                                    "Unknown"}
                                            </span>
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
