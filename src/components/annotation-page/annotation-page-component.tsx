"use client";
import React, { useEffect, useState } from 'react';
import { Card, Title, Text, Divider } from '@tremor/react';
import { getAnnotationData } from "@/actions/annotation/action";

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

type AnnotationApiResponse = AnnotationData | { error: string };

export default function AnnotationPage() {
  const [data, setData] = useState<AnnotationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result: AnnotationApiResponse = await getAnnotationData();
        console.log('Data from server function:', result);
        if ("error" in result) {
          console.error("API returned an error:", result.error);
          setData(null);
          return;
        }
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
  // if ("error" in data) return <div>Error: {data.error}</div>;

  const { student, reflectionQuestion, reflectionResponse, reflectionResponseTranscript, aiGuesstimates } = data;

  const studentName = `${student?.firstName || "Unknown"} ${student?.lastName || ""}`.trim();
  const category = reflectionQuestion?.category || "No category";
  const transcript = reflectionResponseTranscript?.transcript || "No transcript available";
  const responseTranscript = reflectionResponse?.transcription_q1 || "No transcript available";

  return (
    <div className="p-8 flex justify-center bg-white text-black">
      <Card className="w-full max-w-5xl p-6 bg-white">
        <Title className="text-xl font-semibold">
          Reflection for {studentName}
        </Title>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="col-span-2 border rounded-lg p-6 bg-white">
            <Title className="text-lg font-semibold">Prompt</Title>
            <Text className="mt-2 text-gray-700">
              {category}: {transcript}
            </Text>
            <Divider className="my-4" />

            <Title className="text-lg font-semibold">Response</Title>
            <Text className="mt-2 text-gray-700 italic">
              Please review the AI’s analysis and highlight any sections where it misinterprets the student’s response or overlooks key ideas.
            </Text>
            <Text className="mt-2 text-gray-700">
              {responseTranscript}
            </Text>
          </div>
          <div className="border rounded-lg p-6 bg-white">
            <Title className="text-lg font-semibold">AI Guesstimates</Title>
            <div className="mt-4 space-y-2">
              {aiGuesstimates && aiGuesstimates.length > 0 ? (
                aiGuesstimates.map((insight, idx) => {
                  if (!insight) return null;
                  const average = insight.average ?? 0;
                  const categoryLevel = `bg-blue-${average}00`;
                  return (
                    <div key={idx} className="flex items-center">
                      <span className={`w-4 h-4 ${categoryLevel} rounded-full mr-2`}></span>
                      <span>{insight.subcategory || "Unknown"}</span>
                    </div>
                  );
                })
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
