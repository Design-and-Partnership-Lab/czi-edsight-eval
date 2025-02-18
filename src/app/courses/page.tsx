import { CoursePage } from "@/components/course/course-component";
import { db } from "@/db";

export default async function Page() {
    const teacherEmail = "jane_smith_test@auhsd.us"; // hardcoded

    // Fetch teacher's first and last name using their email
    const teacher = await db.teacher
        .findUnique({
            where: { email: teacherEmail },
            select: {
                firstName: true,
                lastName: true,
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching teacher details:", e);
            return null;
        });

    // Fetch courses
    const courses = await db.course
        .findMany({
            where: { teacherEmail: teacherEmail },
            select: {
                id: true,
                name: true,
                period: true,
                teacherEmail: true
            },
        })
        .catch((e: unknown) => {
            console.error("Error fetching courses:", e);
            return [];
        });

    if (!teacher) {
        return <div className="text-white">Teacher not found</div>;
    }
    
    const teacherName = `${teacher.firstName} ${teacher.lastName}`;

    console.log("Fetched teacher:", teacherName);
    console.log("Fetched courses:", courses);

    return (
        <div>
            <CoursePage teacherName={teacherName} teacherEmail={teacherEmail} courses={courses}/>
        </div>
    );
}
