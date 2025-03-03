import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const student = await prisma.student.findFirst({
      where: { email: "182test@student.auhsd.us" } // ex
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const reflectionQuestion = await prisma.reflectionQuestion.findFirst({
      where: { reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test" } // ex
    });

    if (!reflectionQuestion) {
      return NextResponse.json({ error: "Reflection question not found" }, { status: 404 });
    }

    const reflectionResponseTranscript = await prisma.reflectionResponseTranscript.findFirst({
      where: {
        studentEmail: student.email!,
        reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test", // ex
        questionId: reflectionQuestion.id,
      },
    });

    return NextResponse.json({
      student,
      reflectionQuestion,
      reflectionResponseTranscript,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
  }
}
