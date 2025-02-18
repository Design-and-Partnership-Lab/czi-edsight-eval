// import { TeacherComponent } from "@/components/teacher/teacher-component";
import { db } from "@/db";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    // Fetch data in the Server Component
    const rrt = await db.reflectionResponseTranscript
        .findMany({ // find many entries that have same student diff q
            where: { studentEmail: "182test@student.auhsd.us", 
                    reflectionId: "0f999zzz-68ac-46ed-9cde-1f7c9045test"},
            select: {
                id: true,
                questionId: true,
                transcript: true,
                language: true,
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching transcript:", e);

            return [];
        });

    if (rrt.length == 0) {
        return <div>No reflection response transcript found</div>;
    }

    return (
        <div>
            {rrt.map((transcript) => (
                <div key={transcript.id}>
                    <p>Question ID: {transcript.questionId}</p>
                    <p>Transcript: {transcript.transcript}</p>
                    <p>Language: {transcript.language}</p>
                </div>
            ))}
        </div>
    );
}
