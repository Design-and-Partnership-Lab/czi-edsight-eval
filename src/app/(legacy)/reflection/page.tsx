import React from 'react'
import AddReflection from '@/components/reflection/AddReflection';
import ReflectionList from '@/components/reflection/ReflectionList';


export default async function Page() {
    return (
        <div className='m-5'>
            <div className='mb-10'>
                <h1 className='font-semibold'>Reflections from course ID 38978:</h1>
                <ReflectionList />
            </div>
            <AddReflection />
        </div>
    );
}