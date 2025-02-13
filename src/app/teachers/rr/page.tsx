import { ToggleAgreeButton } from "@/components/rr/ToggleAgreeButton";
import { TeacherComponent } from "@/components/teacher/teacher-component";
import { db } from "@/db";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    // Fetch data in the Server Component
    const feedbacks = await db.userFeedback
        .findMany({
            where: {
                reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test",
                studentId: 38693,
            },
            select: {
                id: true,
                agree: true,
                reflectionId: true,
                studentId: true,
                category: true,
                teacherEmail: true,
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching feedback:", e);

            return [];
        });

    if (!feedbacks) {
        return <div>No feedback found</div>;
    }

    return (
        <div>
            {feedbacks.map((feedback) => (
                <div key={feedback.id}>
                    <p>Reflection ID: {feedback.reflectionId}</p>
                    <p>Student ID: {feedback.studentId}</p>
                    <p>Category: {feedback.category}</p>
                    <p>Agree: {feedback.agree ? "True" : "False"}</p>
                    <ToggleAgreeButton feedback={feedback} />
                </div>
            ))}
        </div>
    );
}
