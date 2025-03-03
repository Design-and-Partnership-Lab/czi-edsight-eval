"use client";
import React, { useEffect, useState } from 'react';
import { Card, Title, Text, Divider, Badge } from '@tremor/react';
import { getAnnotationData } from "@/actions/annotation/action";

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

type AnnotationData = {
  student: Student;
  reflectionQuestion: ReflectionQuestion;
  reflectionResponseTranscript: ReflectionResponseTranscript;
};

export default function AnnotationPage() {
  const [data, setData] = useState<AnnotationData | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getAnnotationData();
        console.log('Data from server function:', result);
        // FIX: result type
        setData(result);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (!data) return <div>No data found.</div>;

  const { student, reflectionQuestion, reflectionResponseTranscript } = data;

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
              {reflectionResponseTranscript.transcript}
            </Text>
          </div>
          <div className="border rounded-lg p-6 bg-white">
            <Title className="text-lg font-semibold">AI Guesstimates</Title>
            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <span className="w-4 h-4 bg-blue-100 rounded-full mr-2"></span>
                <span>Grit</span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 bg-blue-100 rounded-full mr-2"></span>
                <span>Problem Solving</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
