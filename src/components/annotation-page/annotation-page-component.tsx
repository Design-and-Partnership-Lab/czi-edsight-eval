"use client";
import RationaleItem from "../annotate/RationaleItem";

import React from "react";
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
                                {`${transcript} Quis exercitation ut id laborum excepteur. 
                                Veniam aute sit mollit commodo dolore irure. Dolor laborum labore 
                                cupidatat consequat ex voluptate proident ea.`}
                            </Annotate>
                        </div>
                    </div>

                    <div className="col-span-2 rounded-lg border p-6">
                        <Title className="text-3xl font-semibold">AI Rationale</Title>

                        <div className="mt-4 space-y-4">
                            <RationaleItem
                                title="Grit"
                                status="Emerging"
                                icon="/purple-empty.svg"
                                filledIcon="/purple-filled.svg"
                                points={[
                                    "<strong>did</strong> articulate strategies for critiques or suggestions",
                                    "<strong>did</strong> work towards a shared goal",
                                    "<strong>somewhat did</strong> adapt ideas or approaches",
                                ]}
                            />

                            <RationaleItem
                                title="Problemsolving"
                                status="Progressing"
                                icon="/blue-empty.svg"
                                filledIcon="/blue-filled.svg"
                                points={[
                                    "working on conversational language",
                                    "understanding subtext",
                                    "learning colloquialisms and idioms",
                                ]}
                            />

                            <div className="mt-6 rounded-lg border bg-blue-100 p-4">
                                <div className="flex justify-between items-center">
                                    <Text className="font-semibold text-lg">AI Guesstimate:</Text>
                                    <span className="rounded-full bg-blue-500 px-3 py-1 text-sm text-white">
                                        Progressing
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
