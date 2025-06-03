import { redirect } from "next/navigation";
import { Mvp } from "@/components/mvp";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;
    const id = slug;

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
        console.error("No email found for user");
        redirect("/log-in");
    }

    const reflectionResponseTranscript =
        await db.reflectionResponseTranscript.findFirst({
            where: {
                id: Number(id),
            },
        });

    if (!reflectionResponseTranscript) {
        console.error("Reflection response transcript not found");
        return <div>Error: Reflection response transcript not found</div>;
    }

    const reflectionQuestion = await db.reflectionQuestion.findFirst({
        where: { id: reflectionResponseTranscript.questionId },
    });

    if (!reflectionQuestion) {
        console.error("Reflection question not found");
        return <div>Error: Reflection question not found</div>;
    }

    const aiRationale = await db.subcategoryBucket.findMany({
        where: {
            reflectionResponseId: reflectionResponseTranscript.id,
            category: "CREATIVITY", // NB: hardcoded for mvp
        },
    });

    if (!aiRationale) {
        console.error("AI Rationale not found");
        return <div>Error: AI Rationale not found</div>;
    }

    return (
        <Mvp
            reflectionQuestion={reflectionQuestion}
            reflectionResponseTranscript={reflectionResponseTranscript}
            aiRationale={aiRationale}
            teacherEmail={email}
        />
    );
}
