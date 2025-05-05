import EPEPage from "@/components/epe-guess/epe-guess-component";
import ProgressBar from "@/components/progress-bar/progress-bar";
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

        const student = await db.student.findFirst({
            where: { email: reflectionResponseTranscript.studentEmail },
        });

        if (!student) {
            console.error("Student not found");
            return <div>Error: Student not found</div>;
        }

        return (
            <div className="flex flex-col justify-content-center p-16 bg-white">
                <div className="pb-8">
                    <ProgressBar currentStep={2} />
                </div>
        
                <EPEPage
                    student={student}
                    reflectionQuestion={reflectionQuestion}
                    reflectionResponseTranscript={reflectionResponseTranscript}
                />
            </div>
        );
        
    } catch (error) {
        console.error(error);
        return <div>Error fetching data</div>;
    }
}
