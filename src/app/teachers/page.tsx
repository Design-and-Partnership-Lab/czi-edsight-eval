import { TeacherComponent } from "@/components/teacher/teacher-component";
import { db } from "@/db";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    const teacher = await db.teacher
        .findUnique({
            where: { id: 123789 },
        })
        .catch((e: unknown) => {
            console.error("Error fetching teacher:", e);

            return null;
        });

    return (
        <div>
            <TeacherComponent teacher={teacher} />
        </div>
    );
}
