import { AnalysisComponent } from "@/components/analyses/analysis-component";
import { db } from "@/db";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    // Fetch data in the Server Component
    const teacher = await db.teacher
        .findUnique({
            where: { id: 123 },
            select: {
                id: true,
                firstName: true,
                lastName: true,
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching teacher:", e);

            return null;
        });

    if (!teacher) {
        return <div>No teacher found</div>;
    }

    return (
        <div>
            <AnalysisComponent teacher={teacher} />
        </div>
    );
}
