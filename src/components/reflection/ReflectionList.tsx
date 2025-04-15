"use client";

import React, { useEffect } from "react";
import { getReflectionSpecificID } from "@/actions/(legacy)/reflection/getReflectionSpecificID";

interface PartialReflection {
    id: string;
    title: string;
}

export default function ReflectionsList() {
    const [reflections, setReflections] = React.useState<PartialReflection[]>(
        []
    );

    const loadReflections = async () => {
        const data = await getReflectionSpecificID();
        if (data) setReflections(data);
    };

    useEffect(() => {
        loadReflections();
    }, [reflections.length]);

    return (
        <div>
            {reflections.map((reflection) => (
                <div key={reflection.id}>{reflection.title}</div>
            ))}
        </div>
    );
}
