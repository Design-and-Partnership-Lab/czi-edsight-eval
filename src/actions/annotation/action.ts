"use server";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getAnnotationData() {
  try {
    const student = await prisma.student.findFirst({
      where: { email: "182test@student.auhsd.us" } // ex
    });

    if (!student) {
      return { error: "Student not found" };
    }

    const reflectionQuestion = await prisma.reflectionQuestion.findFirst({
      where: { reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test" } // ex
    });

    if (!reflectionQuestion) {
      return { error: "Reflection question not found" };
    }

    const reflectionResponseTranscript = await prisma.reflectionResponseTranscript.findFirst({
      where: {
        studentEmail: student.email!,
        reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test", // ex
        questionId: reflectionQuestion.id,
      },
    });

    const aiGuesstimates = await prisma.insights.findMany({
      where: { reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test" }
    });

    return {
      student,
      reflectionQuestion,
      reflectionResponseTranscript,
      aiGuesstimates,
    };
  } catch (error) {
    console.error(error);
    return { error: "Error fetching data" };
  }
}
