import React from 'react'
import { db } from "@/db";
import AddReflection from '@/components/reflections/reflection-component';


export default async function Page() {
    const reflections = await db.reflection.findMany({
        where: {
            courseId: 38978,
        },
        select: {
            id: true,
            title: true,
        }
    })
    .catch((e: unknown) => {
        console.error("Error fetching teacher:", e);

        return null;
    });

    if (!reflections) {
        return (
        <div>
            <div>No reflections found</div>;
        </div>
        )
    }

    return (
        <div className='m-5'>
            <div className='mb-10'>
                <h1 className='font-semibold'>Reflections from course ID 38978:</h1>
                {reflections.map((reflection) => (
                    <div key={reflection.id}>{reflection.title}</div>
                ))}
                </div>
            <AddReflection />
        </div>
    );
}