'use client';

import { getReflectionSpecificID } from '@/actions/reflection/getReflectionSpecificID';
import React, { useEffect } from 'react';

interface PartialReflection {
    id: string;
    title: string;
}

export default function ReflectionsList() {
    const [reflections, setReflections] = React.useState<PartialReflection[]>([]);

    const loadReflections = async () => {
        const data = await getReflectionSpecificID();
        if (data) 
            setReflections(data);
        
    };

    useEffect(() => {
        loadReflections();
    }, [reflections]);

    return (
        <div>
            {reflections.map((reflection) => (
                <div key={reflection.id}>{reflection.title}</div>
            ))}
        </div>
    );


}