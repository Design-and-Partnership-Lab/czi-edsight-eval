import { CourseComponent } from "@/components/course/course-component";
import { db } from "@/db";

/**
 * Next.js pages are Server Components by default. You should fetch data at the top level in a server component whenever possible.
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/server-components}
 */
export default async function Page() {
    // Fetch data in the Server Component
    const courses = await db.course
        .findMany({
            where: { teacherEmail: "jane_smith_test@auhsd.us" },
            select: {
                id: true,
                name: true,
                period: true,
                teacherEmail: true,
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching courses:", e);
            
            return [];
        });
 
    if (!courses.length) {
        return <div>No courses found</div>;
    } 
    console.log("Fetched courses:", courses);

    return (
        <div>
            <h1>Courses for Teacher</h1>
            <div>
                {courses.map((course) => (
                    <CourseComponent
                        key={course.id}
                        course={{
                            ...course,
                            teacherEmail: course.teacherEmail ?? "", // ensures that teacherEmail is never null by replacing with ""
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

