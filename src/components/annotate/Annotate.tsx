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

export type { Annotation };

const Annotate = ({ children, color }: { children: string, color: { name: string; bgClass: string; colorValue: string; } }) => {
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
                color={color}
            />
        </div>
    );
};

export default Annotate;
