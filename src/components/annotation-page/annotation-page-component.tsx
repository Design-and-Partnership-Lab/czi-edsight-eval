"use client";

import React from "react";
import { Card, Divider, Text, Title } from "@tremor/react";

type Student = {
    firstName: string;
    lastName: string | null;
} | null;

type ReflectionQuestion = {
    category: string | null;
    id: number | null;
} | null;

type ReflectionResponseTranscript = {
    transcript: string | null;
} | null;

type ReflectionResponse = {
    transcription_q1: string | null;
} | null;

type Insight = {
    subcategory: string | null;
    average: number | null;
} | null;

type AnnotationData = {
    student: Student;
    reflectionQuestion: ReflectionQuestion;
    reflectionResponse: ReflectionResponse;
    reflectionResponseTranscript: ReflectionResponseTranscript;
    aiGuesstimates: Insight[];
};

export default function AnnotationPage({
    student,
    reflectionQuestion,
    reflectionResponse,
    reflectionResponseTranscript,
    aiGuesstimates,
}: AnnotationData) {
    const studentName =
        `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim();
    const category = reflectionQuestion?.category || "No category";
    const transcript =
        reflectionResponseTranscript?.transcript || "No transcript available";
    const responseTranscript =
        reflectionResponse?.transcription_q1 || "No transcript available";

    return (
        <div className="flex justify-center bg-white p-8 text-black">
            <Card className="w-full max-w-5xl bg-white p-6">
                <Title className="text-xl font-semibold">
                    Reflection for {studentName}
                </Title>

                <div className="mt-6 grid grid-cols-3 gap-6">
                    <div className="col-span-2 rounded-lg border bg-white p-6">
                        <Title className="text-lg font-semibold">Prompt</Title>
                        <Text className="mt-2 text-gray-700">
                            {category}: {transcript}
                        </Text>
                        <Divider className="my-4" />

                        <Title className="text-lg font-semibold">
                            Response
                        </Title>

                        <Text className="mt-2 italic text-gray-700">
                            Please review the AI’s analysis and highlight any
                            sections where it misinterprets the student’s
                            response or overlooks key ideas.
                        </Text>

                        <Text className="mt-2 text-gray-700">
                            {responseTranscript}
                        </Text>
                    </div>

                    <div className="rounded-lg border bg-white p-6">
                        <Title className="text-lg font-semibold">
                            AI Guesstimates
                        </Title>
                        <div className="mt-4 space-y-2">
                            {aiGuesstimates && aiGuesstimates.length > 0 ? (
                                aiGuesstimates.map((insight, idx) => {
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
                                    No AI guesstimates available.
                                </Text>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
