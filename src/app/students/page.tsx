import { StudentComponent } from "@/components/student/student-component";
import { db } from "@/db";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    // Fetch data in the Server Component
    const student = await db.student
        .findUnique({
            where: { email: "182test@student.auhsd.us" },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching student:", e);

            return null;
        });

    if (!student) {
        return <div>No student found</div>;
    }

    console.log("Fetched student:", student);
    return (
        <div>
            <StudentComponent student={student} />
        </div>
    );
}