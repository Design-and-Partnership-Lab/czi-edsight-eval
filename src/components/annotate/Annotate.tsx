"use client";

import React, { useState } from "react";

import AnnotationEditor from "./AnnotationEditor";

interface Annotation {
    id: string;
    text: string;
    color: string;
    colorName: string;
    comment: string;
    createdAt: Date;
}

export const COLORS = [
    { name: "Yellow", bgClass: "bg-yellow-200", colorValue: "#FEFCBF" },
    { name: "Green", bgClass: "bg-green-200", colorValue: "#C6F6D5" },
    { name: "Blue", bgClass: "bg-blue-200", colorValue: "#BEE3F8" },
    { name: "Purple", bgClass: "bg-purple-200", colorValue: "#E9D8FD" },
];

export type { Annotation };

const Annotate = ({ children }: { children: string }) => {
    const [annotations, setAnnotations] = useState<Annotation[]>([]);

    const addAnnotation = (annotation: Annotation) => {
        setAnnotations((prev) => [...prev, annotation]);
    };

    const updateAnnotation = (id: string, data: Partial<Annotation>) => {
        setAnnotations((prev) =>
            prev.map((ann) => (ann.id === id ? { ...ann, ...data } : ann))
        );
    };

    const removeAnnotation = (id: string) => {
        setAnnotations((prev) => prev.filter((a) => a.id !== id));
    };

    return (
        <div className="annotation-container">
            <AnnotationEditor
                initialContent={children}
                annotations={annotations}
                onAddAnnotation={addAnnotation}
                onUpdateAnnotation={updateAnnotation}
                onRemoveAnnotation={removeAnnotation}
                colors={COLORS}
            />
        </div>
    );
};

export default Annotate;
