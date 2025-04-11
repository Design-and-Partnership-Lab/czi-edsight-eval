import AnnotationPage from "@/components/annotation-page/annotation-page-component";
import { db } from "@/db";

export default async function Home() {
    try {
        // Testing ID for demonstration
        const teacherId = 2050;

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

        const firstLetter = reflectionQuestion.category.slice(0, 1);
        const restOfCategory = reflectionQuestion.category
            .slice(1)
            .toLowerCase();
        reflectionQuestion.category = firstLetter + restOfCategory;

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

        const reflectionResponse = await db.reflectionResponse.findFirst({
            where: {
                reflectionId: reflection.id,
                studentEmail: reflectionResponseTranscript.studentEmail,
            },
        });

        if (!reflectionResponse) {
            console.error("Reflection response not found");
            return <div>Error: Reflection response not found</div>;
        }

        const aiRationale = await db.rawAnalysis.findMany({
            where: {
                reflectionResponseId: reflectionResponseTranscript.id,
            },
        });

        if (!aiRationale) {
            console.error("AI guesstimate not found");
            return <div>Error: AI guesstimate not found</div>;
        }

        const student = await db.student.findFirst({
            where: { email: reflectionResponseTranscript.studentEmail },
        });

        if (!student) {
            console.error("Student not found");
            return <div>Error: Student not found</div>;
        }

        // Passing fetched data as props to the AnnotationPage component
        return (
            <div className="flex min-h-screen items-center justify-center bg-neutral-100">
                <AnnotationPage
                    student={student}
                    reflectionQuestion={reflectionQuestion}
                    reflectionResponse={reflectionResponse}
                    reflectionResponseTranscript={reflectionResponseTranscript}
                    aiRationale={aiRationale}
                />
            </div>
        );
    } catch (error) {
        console.error(error);
        return <div>Error fetching data</div>;
    }
}
