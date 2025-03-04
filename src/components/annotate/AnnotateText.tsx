"use client";

import React, { ReactNode, useRef, useState } from "react";
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

interface UndoAction {
    highlight: Highlight;
    nodeReference: {
        textNode: Text | null;
        parentNode: Node | null;
        nextSibling: Node | null;
        previousSibling: Node | null;
        originalText: string;
    };
}

const AnnotateText: React.FC<Props> = ({ children }) => {
    // State to track highlights
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [undoStack, setUndoStack] = useState<UndoAction[]>([]);
    const contentRef = useRef<HTMLDivElement | null>(null);

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

            // Clear the undo stack when a new highlight is created
            setUndoStack([]);

            console.log("Saved highlight:", newHighlight);
        },
        annotations: highlights,
    };

    // Get color hex value from name
    const getColorHex = (colorName: string): string => {
        const colorMap: Record<string, string> = {
            yellow: "#FFF59D",
            green: "#C5E1A5",
            blue: "#90CAF9",
            purple: "#CE93D8",
        };

        return colorMap[colorName] || "#FFF59D";
    };

    const onUndo = () => {
        if (highlights.length > 0) {
            const newHighlights = [...highlights];
            const lastHighlight = newHighlights.pop()!;

            // Find the highlight span in the DOM
            const span = document.querySelector(
                `[data-highlight-id="${lastHighlight.id}"]`
            ) as HTMLElement;

            if (span) {
                const parent = span.parentNode;
                if (parent) {
                    // Store information about the DOM context for redo
                    const nodeInfo = {
                        textNode: null as Text | null,
                        parentNode: parent,
                        nextSibling: span.nextSibling,
                        previousSibling: span.previousSibling,
                        originalText: lastHighlight.text,
                    };

                    // Create a text node with the original content
                    const textNode = document.createTextNode(
                        lastHighlight.text
                    );
                    nodeInfo.textNode = textNode;

                    // Replace the highlight span with the text node
                    parent.replaceChild(textNode, span);

                    // Store the undo action with DOM references
                    const undoAction: UndoAction = {
                        highlight: lastHighlight,
                        nodeReference: nodeInfo,
                    };

                    setUndoStack((prev) => [...prev, undoAction]);
                    setHighlights(newHighlights);

                    console.log("Undo - Removed highlight:", lastHighlight.id);
                }
            } else {
                console.error(
                    "Could not find highlight span for:",
                    lastHighlight.id
                );
                // Even if we can't find the span, remove the highlight from state
                setHighlights(newHighlights);
            }
        }
    };

    const onRedo = () => {
        if (undoStack.length > 0) {
            const newUndoStack = [...undoStack];
            const lastUndo = newUndoStack.pop()!;
            const { highlight, nodeReference } = lastUndo;

            try {
                const { textNode, parentNode } = nodeReference;

                if (
                    textNode &&
                    parentNode &&
                    textNode.parentNode === parentNode
                ) {
                    // The text node is still in the DOM where we expect it
                    // Create a new span to highlight it
                    const span = document.createElement("span");
                    span.style.backgroundColor = getColorHex(highlight.color);
                    span.style.borderRadius = "2px";
                    span.dataset.highlightId = highlight.id;
                    span.textContent = highlight.text;

                    // Replace the text node with our highlight span
                    parentNode.replaceChild(span, textNode);

                    // Update state
                    setHighlights((prev) => [...prev, highlight]);
                    setUndoStack(newUndoStack);

                    console.log("Redo - Restored highlight:", highlight.id);
                } else {
                    // Fallback method: Search for the text in the content
                    console.log("Using fallback text search for redo");
                    const contentElement = document.getElementById(
                        "decision-reader-body-root"
                    );

                    if (contentElement) {
                        // Get all text nodes
                        const textNodes: Node[] = [];
                        const walker = document.createTreeWalker(
                            contentElement,
                            NodeFilter.SHOW_TEXT,
                            null
                        );

                        let node;
                        while ((node = walker.nextNode())) {
                            textNodes.push(node);
                        }

                        // Find a text node containing our text
                        for (const node of textNodes) {
                            if (
                                node.textContent &&
                                node.textContent.includes(highlight.text)
                            ) {
                                const text = node.textContent;
                                const startIndex = text.indexOf(highlight.text);

                                if (startIndex >= 0) {
                                    // Create three nodes: before, highlight, after
                                    const before = text.substring(
                                        0,
                                        startIndex
                                    );
                                    const after = text.substring(
                                        startIndex + highlight.text.length
                                    );

                                    const fragment =
                                        document.createDocumentFragment();

                                    if (before) {
                                        fragment.appendChild(
                                            document.createTextNode(before)
                                        );
                                    }

                                    const span = document.createElement("span");
                                    span.style.backgroundColor = getColorHex(
                                        highlight.color
                                    );
                                    span.style.borderRadius = "2px";
                                    span.dataset.highlightId = highlight.id;
                                    span.textContent = highlight.text;
                                    fragment.appendChild(span);

                                    if (after) {
                                        fragment.appendChild(
                                            document.createTextNode(after)
                                        );
                                    }

                                    // Replace the original node with our fragment
                                    if (node.parentNode) {
                                        node.parentNode.replaceChild(
                                            fragment,
                                            node
                                        );

                                        // Update state
                                        setHighlights((prev) => [
                                            ...prev,
                                            highlight,
                                        ]);
                                        setUndoStack(newUndoStack);

                                        console.log(
                                            "Redo - Restored highlight using text search:",
                                            highlight.id
                                        );
                                        return;
                                    }
                                }
                            }
                        }
                    }

                    console.error(
                        "Failed to redo highlight - could not find text:",
                        highlight.text
                    );
                }
            } catch (e) {
                console.error("Error during redo:", e);
            }
        }
    };

    return (
        <div>
            <div className="max-w-lg p-4">
                <div
                    id="decision-reader-body-root"
                    ref={contentRef}
                >
                    <TextHighlighter
                        decisionId="doc-12345"
                        userAnnotations={annotationSystem}
                    >
                        <p className="text-2xl">{children}</p>
                    </TextHighlighter>
                </div>
                <div className="mr-5 mt-3 flex justify-end gap-x-3">
                    <button
                        onClick={onUndo}
                        disabled={highlights.length === 0}
                        className={
                            highlights.length === 0
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }
                    >
                        <Undo2 size={24} />
                    </button>
                    <button
                        onClick={onRedo}
                        disabled={undoStack.length === 0}
                        className={
                            undoStack.length === 0
                                ? "cursor-not-allowed opacity-50"
                                : ""
                        }
                    >
                        <Redo2 size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnnotateText;
