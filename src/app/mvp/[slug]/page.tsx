import { Mvp } from "@/components/mvp";
import { db } from "@/db";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    const teacherId = parseInt(slug);

    // ! FIX ME: The 3 round trips to the database are not efficient.
    const reflection = await db.reflection.findFirst({
        where: { teacherId: teacherId },
    });

    if (!reflection) {
        console.error("Reflection not found");
        return <div>Error: Reflection not found</div>;
    }

    const reflectionQuestion = await db.reflectionQuestion.findFirst({
        where: { reflectionId: reflection.id },
    });

    if (!reflectionQuestion) {
        console.error("Reflection question not found");
        return <div>Error: Reflection question not found</div>;
    }

    const reflectionResponseTranscript =
        await db.reflectionResponseTranscript.findFirst({
            where: {
                reflectionId: reflection?.id,
                questionId: reflectionQuestion?.id,
            },
        });

    if (!reflectionResponseTranscript) {
        console.error("Reflection response transcript not found");
        return <div>Error: Reflection response transcript not found</div>;
    }

    const aiRationale = await db.subcategoryBucket.findMany({
        where: {
            reflectionResponseId: reflectionResponseTranscript.id,
            category: "CREATIVITY",
        },
    });

    if (!aiRationale) {
        console.error("AI Rationale not found");
        return <div>Error: AI Rationale not found</div>;
    }

    return (
        <Mvp
            reflection={reflection}
            reflectionQuestion={reflectionQuestion}
            reflectionResponseTranscript={reflectionResponseTranscript}
            aiRationale={aiRationale}
        />
    );
}
