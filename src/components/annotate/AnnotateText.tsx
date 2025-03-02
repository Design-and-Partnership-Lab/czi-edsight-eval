// AnnotateText.tsx
"use client";

import React, { ReactNode, useState } from "react";
import { Redo2, Undo2 } from "lucide-react";

import TextHighlighter from "./TextHighlighter";

interface Props {
    children: ReactNode;
}

// Define TypeScript interfaces
interface Highlight {
    id: string;
    text: string;
    color: string;
    decisionId: string;
    startOffset: number;
    endOffset: number;
    startContainer: string;
    endContainer: string;
    type: string;
}

const AnnotateText: React.FC<Props> = ({ children }) => {
    // State to track highlights
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [deletedHighlights, setDeletedHighlights] = useState<Highlight[]>([]);

    // Annotation system
    const annotationSystem = {
        saveUserAnnotation: (
            text: string,
            colorName: string,
            decisionId: string,
            highlightId: string,
            startOffset: number,
            endOffset: number,
            startContainer: string,
            endContainer: string,
            typename: string
        ): void => {
            // Create a new highlight object
            const newHighlight: Highlight = {
                id: highlightId,
                text,
                color: colorName,
                decisionId,
                startOffset,
                endOffset,
                startContainer,
                endContainer,
                type: typename,
            };

            // Add to our local state
            setHighlights((prev) => [...prev, newHighlight]);

            // need to eventaully save the newHighlight somewhere
            console.log("Saved highlight:", newHighlight);
        },
        annotations: highlights,
    };

    const onUndo = () => {
        console.log("Undo");
        if (highlights.length > 0) {
            const newHighlights = [...highlights]; // Copy the highlights array
            const lastHighlight = newHighlights.pop()!;

            // Remove from DOM
            const span = document.querySelector(
                `[data-highlight-id="${lastHighlight.id}"]`
            );
            if (span) {
                const parent = span.parentNode;
                parent?.replaceChild(
                    document.createTextNode(lastHighlight.text),
                    span
                );
            }

            setDeletedHighlights((prev) => [...prev, lastHighlight]);
            setHighlights(newHighlights); // Update state
        }
    };

    const onRedo = () => {
        console.log("Redo");
        if (deletedHighlights.length > 0) {
            const deletedCopy = [...deletedHighlights];
            const lastDeleted = deletedCopy.pop();

            if (lastDeleted) {
                // Using function form of setHighlights to ensure correct state updates
                setHighlights((prev) => [...prev, lastDeleted]);
                setDeletedHighlights(deletedCopy); // Update deleted highlights state
            }
        }
        console.log(highlights);
    };

    return (
        <div>
            <div className="max-w-lg p-4">
                <TextHighlighter
                    decisionId="doc-12345"
                    userAnnotations={annotationSystem}
                >
                    <p className="text-2xl">{children}</p>
                </TextHighlighter>
                <div className="mr-5 mt-3 flex justify-end gap-x-3">
                    <button onClick={() => onUndo()}>
                        <Undo2 size={24} />
                    </button>
                    <button onClick={() => onRedo()}>
                        <Redo2 size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnotateText;
