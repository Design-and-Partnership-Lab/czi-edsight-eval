"use client";

import React from "react";
import QUESTIONS from "@/lib/questions";

import {
  ReflectionQuestion,
  ReflectionResponseTranscript,
  Student,
} from "@prisma/client";
import { Card, Divider, Text, Title } from "@tremor/react";
import EPECategorySelector from "@/components/epe-guess/epe-guess-question";

type EPEData = {
  student: Student;
  reflectionQuestion: ReflectionQuestion;
  reflectionResponseTranscript: ReflectionResponseTranscript;
};

export default function EPEPage({
  student,
  reflectionQuestion,
  reflectionResponseTranscript,
}: EPEData) {
  const category = reflectionQuestion?.category || "No category";
  const transcript =
    reflectionResponseTranscript?.transcript || "No transcript available";

  const prompt =
    QUESTIONS[reflectionQuestion.question as keyof typeof QUESTIONS];
  const handleCategoryNext = (cat: "Emerging" | "Progressing" | "Excelling") => {
    console.log("User picked:", cat);
  };

  return (
    <div className="flex justify-center text-black">
      <Card className="w-full rounded-lg bg-white">
        <Title className="text-2xl font-semibold text-slate-600">Reflection #1</Title>

        <div className="mt-6 grid grid-cols-5 gap-6 border p-6">
          <div className="col-span-2">
            <Title className="text-xl font-semibold">Prompt</Title>
            <Text className="mt-2 text-gray-700">
              {`${category === "Criticalthinking"
                ? "Critical Thinking"
                : category
              }: ${prompt.question}`}
            </Text>

            <Divider className="my-5" />

            <Title className="text-xl font-semibold">Response</Title>
            <Text className="mt-2 text-gray-700">{transcript}</Text>
          </div>

          <div className="col-span-3 border-l border-gray-200 pl-6 max-w-fit">
            <EPECategorySelector onNext={handleCategoryNext} />
          </div>
        </div>
      </Card>
    </div>
  );
}
