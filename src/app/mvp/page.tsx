import { Mvp } from "@/components/mvp";
import { db } from "@/db";

export default async function Page() {
    const teacherId = 2050;

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

    const ai_rationale = await db.subcategoryBucket.findFirst({
        where: {
            reflectionResponseId: reflectionResponseTranscript.id,
        },
        select: {
            subcategory: true,
            bucket: true,
            rationale: true,
        },
    });

    console.log("AI Rationale: ", ai_rationale);

    return (
        <Mvp
            reflection={reflection}
            reflectionQuestion={reflectionQuestion}
            reflectionResponseTranscript={reflectionResponseTranscript}
        />
    );
}
