"use server";

import { db } from "@/db"

export async function getAnnotationData() {
  try {
    // NOTE: this is a testing id. Added test data to make it all appear to see if it worked.
    const teacherId = 624;

    const reflection = await db.reflection.findFirst({
      where: { teacherId: teacherId },
      select: { id: true }
    });

    if (!reflection) {
      console.error("Reflection question not found");
    }

    const reflectionQuestion = await db.reflectionQuestion.findFirst({
      where: { reflectionId: reflection?.id },
      select: {
        category: true,
        id: true,
      }
    });

    if (reflectionQuestion) {
      const firstLetter = reflectionQuestion.category.slice(0, 1);
      const restOfCategory = reflectionQuestion.category.slice(1).toLowerCase();
      reflectionQuestion.category = firstLetter + restOfCategory;
    }

    if (!reflectionQuestion) {
      console.error("Reflection question not found");
    }

    const reflectionResponseTranscript = await db.reflectionResponseTranscript.findFirst({
      where: {
        reflectionId: reflection?.id,
        questionId: reflectionQuestion?.id,
      },
      select: {
        transcript: true,
        studentEmail: true,
      }
    });

    if (!reflectionResponseTranscript) {
      console.error("Reflection response transcript not found");
    }

    const reflectionResponse = await db.reflectionResponse.findFirst({
      where: {
        reflectionId: reflection?.id,
        studentEmail: reflectionResponseTranscript?.studentEmail,
      },
      select: {
        transcription_q1: true,
      }
    });

    if (!reflectionResponse) {
      console.error("Reflection response not found");
    }
    const aiGuesstimates = await db.insights.findMany({
      where: { reflectionId: reflection?.id },
      select: {
        average: true,
        subcategory: true,
      }
    });

    if (!aiGuesstimates) {
      console.error("AI guesstimate not found");
    }

    const student = await db.student.findFirst({
      where: { email: reflectionResponseTranscript?.studentEmail },
      select: {
        firstName: true,
        lastName: true,
      }
    });

    if (!student) {
      console.error("Student not found");
    }

    return {
      student,
      reflectionQuestion,
      reflectionResponse,
      reflectionResponseTranscript,
      aiGuesstimates,
    };
  } catch (error) {
    console.error(error);
    return { error: "Error fetching data" };
  }
}
