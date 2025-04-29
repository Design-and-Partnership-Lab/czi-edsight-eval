"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import CommentExtension from "@sereneinserenade/tiptap-comment-extension";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { v4 as uuidv4 } from "uuid";

import type { Annotation } from "./Annotate";
import { CommentIcon } from "./CommentIcon";

import "./AnnotationEditor.scss";

interface AnnotationEditorProps {
    initialContent: string;
    annotations: Annotation[];
    onAddAnnotation: (annotation: Annotation) => void;
    onUpdateAnnotation: (id: string, data: Partial<Annotation>) => void;
    onRemoveAnnotation: (id: string) => void;
    color: { name: string; bgClass: string; colorValue: string; rationale: string };
}

const AnnotationEditor = ({
    initialContent,
    annotations,
    onAddAnnotation,
    onUpdateAnnotation,
    onRemoveAnnotation,
    color
}: AnnotationEditorProps) => {
    const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(
        null
    );
    const [showColorPicker, setShowColorPicker] = useState(false);
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    // Handle comment activation
    const handleCommentActivated = (commentId: string) => {
        setActiveAnnotationId(commentId);
        if (commentId) {
            setTimeout(() => focusAnnotationWithActiveId(commentId), 0);
        }
    };

    // Initialize editor
    const editor = useEditor({
        extensions: [
            StarterKit,
            CommentExtension.configure({
                HTMLAttributes: { class: `annotation-highlight ${color.rationale}` },
                onCommentActivated: handleCommentActivated,
            }),
        ],
        content: initialContent,
    });

    // Apply highlight colors when active annotation changes
    useEffect(() => {
        applyHighlightColors();
        console.log(color)
    }, [editor, annotations, color, activeAnnotationId]);

    // Apply highlight colors to annotations
    const applyHighlightColors = () => {
        if (!editor || !document) return;

        setTimeout(() => {
            annotations.forEach((annotation) => {
                const commentElement = document.querySelector(
                    `[data-comment-id="${annotation.id}"]`
                );
                
                if (commentElement instanceof HTMLElement) {
                    let backgroundColor = annotation.color;
                    // Darken color if active
                    if (annotation.id === activeAnnotationId) {
                        backgroundColor = darkenColor(
                            annotation.color,
                            0.2
                        );
                    }
                    commentElement.style.backgroundColor = backgroundColor;
                    commentElement.style.borderRadius = "2px";
                }
            });
        }, 10);
    };

    // Darken color helper function
    const darkenColor = (color: string, amount: number): string => {
        const hexToRgb = (hex: string) =>
            /^#[0-9A-Fa-f]{6}$/.test(hex)
                ? {
                      r: parseInt(hex.slice(1, 3), 16),
                      g: parseInt(hex.slice(3, 5), 16),
                      b: parseInt(hex.slice(5, 7), 16),
                  }
                : null;

        const rgbToHex = (r: number, g: number, b: number) =>
            `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;

        const rgb = hexToRgb(color);
        if (!rgb) return color;

        const { r, g, b } = rgb;

        const darken = (c: number) =>
            Math.max(0, Math.min(255, c * (1 - amount)));

        return rgbToHex(darken(r), darken(g), darken(b));
    };

    // Focus on the annotation with the given ID
    const focusAnnotationWithActiveId = (id: string) => {
        if (!commentsSectionRef.current) return;
        const commentInput =
            commentsSectionRef.current.querySelector<HTMLTextAreaElement>(
                `textarea[data-id="${id}"]`
            );
        if (commentInput) {
            commentInput.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            commentInput.focus();
        }
    };

    // Create a new annotation
    const createAnnotation = () => {
        if (!editor) return;

        const id = `annotation-${uuidv4()}`;
        const { from, to } = editor.state.selection;
        const text = editor.state.doc.textBetween(from, to, " ");

        const newAnnotation: Annotation = {
            id,
            text,
            color: color.colorValue,
            colorName: color.name,
            comment: "",
            createdAt: new Date(),
        };

        editor.commands.setMark("comment", { commentId: id, from, to });
        onAddAnnotation(newAnnotation);
        setActiveAnnotationId(id);
        setTimeout(() => {
            focusAnnotationWithActiveId(id);
            applyHighlightColors();
        }, 10);
    };

    // Handle removing blue outline from active comment
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                commentsSectionRef.current &&
                !commentsSectionRef.current.contains(event.target as Node)
            ) {
                setActiveAnnotationId(null);
            }
            if (
                colorPickerRef.current &&
                !colorPickerRef.current.contains(event.target as Node)
            ) {
                setShowColorPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const removeAnnotation = (id: string) => {
        if (!editor) return;

        // Remove comment box
        const positions: { from: number; to: number }[] = [];
        editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "comment" && node.attrs.commentId === id) {
                positions.push({ from: pos, to: pos + node.nodeSize });
            }
        });

        if (positions.length > 0) {
            editor.view.dispatch(
                editor.view.state.tr.removeMark(
                    positions[0].from,
                    positions[0].to,
                    editor.schema.marks.comment
                )
            );
        }

        // Remove highlight
        setTimeout(() => {
            const highlightElements = document.querySelectorAll(
                `[data-comment-id="${id}"]`
            );
            highlightElements.forEach((el) => {
                if (el instanceof HTMLElement) {
                    el.style.backgroundColor = "";
                    el.style.padding = "";
                    el.style.borderRadius = "";
                    el.removeAttribute("data-comment-id");
                    el.classList.remove("annotation-highlight");
                    el.classList.remove(`${color.rationale}`);
                }
            });
            onRemoveAnnotation(id);
            if (activeAnnotationId === id) {
                setActiveAnnotationId(null);
            }
            applyHighlightColors();
        }, 10);
    };

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex gap-4">
                {/* Editor */}
                <div className="flex-1 rounded-lg border p-4">
                    <EditorContent
                        editor={editor}
                        className="prose min-h-[400px] max-w-none"
                    />
                    {editor && (
                        <BubbleMenu
                            editor={editor}
                            className="flex gap-1 rounded-lg border border-slate-400 bg-white p-1 shadow-md"
                        >
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={createAnnotation}
                                className="flex items-center gap-1"
                            >
                                <CommentIcon /> Annotate
                            </Button>
                        </BubbleMenu>
                    )}
                </div>

                {/* Comments Sidebar */}
                <div
                    ref={commentsSectionRef}
                    className="flex max-h-[80vh] w-[300px] flex-col gap-3 overflow-y-auto rounded-lg border py-4"
                >
                    <span className="text-sm ml-4 font-semibold">
                        Comments
                    </span>
                    {annotations.map((annotation) => (
                        <div
                            key={annotation.id}
                            className={`relative flex flex-col gap-2 rounded-md border p-3 ${annotation.id === activeAnnotationId ? "border-slate-200 ml-6 mr-2 duration-300" : "border-slate-200 duration-300 mx-4"}`}
                            style={{
                                borderLeft: `4px solid ${annotation.color}`,
                            }}
                            onClick={() => {
                                setActiveAnnotationId(annotation.id);
                                focusAnnotationWithActiveId(annotation.id);
                            }}
                        >
                            <button
                                className="absolute right-2 top-2 text-gray-400 hover:text-red-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeAnnotation(annotation.id);
                                }}
                            >
                                ✕
                            </button>
                            <div className="text-xs text-gray-500">
                                {new Date(
                                    annotation.createdAt
                                ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </div>
                            <div className="rounded bg-gray-50 p-2 text-sm font-medium">
                                "{annotation.text}"
                            </div>
                            <div className="flex flex-col gap-2">
                                <textarea
                                    data-id={annotation.id}
                                    value={annotation.comment}
                                    onChange={(e) =>
                                        onUpdateAnnotation(annotation.id, {
                                            comment: e.target.value,
                                        })
                                    }
                                    placeholder="Add your notes here..."
                                    className={`min-h-[60px] rounded border bg-transparent p-2 text-sm ${annotation.id === activeAnnotationId ? "bg-slate-50" : "border-transparent"}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AnnotationEditor;
