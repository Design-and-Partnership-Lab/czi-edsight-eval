"use client";
import React, { useEffect, useState } from 'react';
import { Card, Title, Text, Divider } from '@tremor/react';
import { getAnnotationData } from "@/actions/annotation/action";
import { CategoryBucket_category, CategoryBucket_bucket } from "@prisma/client";

type Student = {
  firstName: string;
  lastName: string;
};

type ReflectionQuestion = {
  question: string;
};

type ReflectionResponseTranscript = {
  transcript: string;
};

type Insight = {
  category: string;
  average: number | null;
};

type AnnotationData = {
  student: Student;
  reflectionQuestion: ReflectionQuestion;
  reflectionResponseTranscript: ReflectionResponseTranscript;
  aiGuesstimates: Insight[];
};

export default function AnnotationPage() {
  const [data, setData] = useState<AnnotationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAnnotationData();
        console.log('Data from server function:', result);
        // FIX: this needs typing
        setData(result);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found.</div>;
  if ("error" in data) return <div>Error: {data.error}</div>;

  const { student, reflectionQuestion, reflectionResponseTranscript, aiGuesstimates } = data;

  return (
    <div className="p-8 flex justify-center bg-white text-black">
      <Card className="w-full max-w-5xl p-6 bg-white">
        <Title className="text-xl font-semibold">
          Reflection for {student.firstName} {student.lastName}
        </Title>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 border rounded-lg p-6 bg-white">
            <Title className="text-lg font-semibold">Prompt</Title>
            <Text className="mt-2 text-gray-700">
              {reflectionQuestion.question}
            </Text>
            <Divider className="my-4" />

            <Title className="text-lg font-semibold">Response</Title>
            <Text className="mt-2 text-gray-700 italic">
              Please review the AI’s analysis and highlight any sections where it misinterprets the student’s response or overlooks key ideas.
            </Text>
            <Text className="mt-2 text-gray-700">
              {reflectionResponseTranscript?.transcript}
            </Text>
          </div>
          <div className="border rounded-lg p-6 bg-white">
            <Title className="text-lg font-semibold">AI Guesstimates</Title>
            <div className="mt-4 space-y-2">
              {/* 
                FIX: may need to find a way to push some fake data in just to see result 
              */}
              {aiGuesstimates.length > 0 ? (
                aiGuesstimates.map((insight, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="w-4 h-4 bg-blue-100 rounded-full mr-2"></span>
                    <span>{insight.category}: {insight.average !== null ? insight.average : "N/A"}</span>
                  </div>
                ))
              ) : (
                <Text className="text-gray-700">No AI guesstimates available.</Text>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
