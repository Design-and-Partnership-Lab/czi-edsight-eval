"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import CommentExtension from "@sereneinserenade/tiptap-comment-extension";
import { BubbleMenu, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { PaintBucket, Redo2, Undo2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import type { Annotation } from "./Annotate";

import "./AnnotationEditor.scss";

interface AnnotationEditorProps {
    initialContent: string;
    annotations: Annotation[];
    onAddAnnotation: (annotation: Annotation) => void;
    onUpdateAnnotation: (id: string, data: Partial<Annotation>) => void;
    onRemoveAnnotation: (id: string) => void;
    colors: { name: string; bgClass: string; colorValue: string }[];
}

const AnnotationEditor = ({
    initialContent,
    annotations,
    onAddAnnotation,
    onUpdateAnnotation,
    onRemoveAnnotation,
    colors,
}: AnnotationEditorProps) => {
    const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(
        null
    );
    const [selectedColor, setSelectedColor] = useState(colors[3]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const commentsSectionRef = useRef<HTMLDivElement>(null);
    const colorPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
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

    const editor = useEditor({
        extensions: [
            StarterKit,
            CommentExtension.configure({
                HTMLAttributes: {
                    class: "annotation-highlight",
                },
                onCommentActivated: (commentId: string) => {
                    setActiveAnnotationId(commentId);
                    if (commentId) {
                        setTimeout(() => {
                            focusAnnotationWithActiveId(commentId);
                        }, 0);
                    }
                },
            }),
        ],
        content: initialContent,
    });

    useEffect(() => {
        if (!editor) return;

        editor.on("update", () => {
            const currentCommentIds = new Set<string>();

            editor.state.doc.descendants((node) => {
                if (node.type.name === "comment" && node.attrs.commentId) {
                    currentCommentIds.add(node.attrs.commentId);
                }
            });

            // Find annotations that no longer exist in the editor
            // const removed = annotations.filter(
            //     (a) => !currentCommentIds.has(a.id)
            // );

            // if (removed.length > 0) {
            //     removed.forEach((a) => {
            //         onRemoveAnnotation(a.id); // remove from state
            //     });
            // }
        });
    }, [editor, annotations]);

    useEffect(() => {
        if (editor && annotations.length > 0 && document) {
            setTimeout(() => {
                annotations.forEach((annotation) => {
                    const commentElements = document.querySelectorAll(
                        `[data-comment-id="${annotation.id}"]`
                    );
                    commentElements.forEach((el) => {
                        if (el instanceof HTMLElement) {
                            el.style.backgroundColor = annotation.color;
                            el.style.padding = "0 2px";
                            el.style.borderRadius = "2px";
                        }
                    });
                });
            }, 0);
        }
    }, [editor, annotations]);

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

    const createAnnotation = () => {
        if (!editor) return;

        const id = `annotation-${uuidv4()}`;
        const selection = editor.state.selection;
        const text = editor.state.doc.textBetween(
            selection.from,
            selection.to,
            " "
        );

        const newAnnotation: Annotation = {
            id,
            text,
            color: selectedColor.colorValue,
            colorName: selectedColor.name,
            comment: "",
            createdAt: new Date(),
        };

        onAddAnnotation(newAnnotation);
        editor.commands.setComment(id);
        setActiveAnnotationId(id);

        setTimeout(() => focusAnnotationWithActiveId(id), 0);
    };

    const findAndHighlightComment = (
        commentId: string,
        shouldFocusEditor = true
    ) => {
        if (!editor) return;

        let found = false;
        editor.state.doc.descendants((node, pos) => {
            if (found) return false;
            if (
                node.type.name === "comment" &&
                node.attrs.commentId === commentId
            ) {
                const from = pos;
                const to = pos + node.nodeSize;
                editor.commands.setTextSelection({ from, to });
                found = true;
                return false;
            }
            return true;
        });

        if (shouldFocusEditor) {
            editor.commands.focus();
        }
    };

    return (
        <div className="flex flex-col gap-6 p-4">
            {/* Toolbar */}
            <div className="flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => editor?.chain().focus().undo().run()}
                    disabled={!editor?.can().undo()}
                    size="icon"
                >
                    <Undo2 className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    onClick={() => editor?.chain().focus().redo().run()}
                    disabled={!editor?.can().redo()}
                    size="icon"
                >
                    <Redo2 className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor + Comments Side-by-Side */}
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
                            <div className="relative">
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="flex items-center gap-1"
                                    onClick={() =>
                                        setShowColorPicker(!showColorPicker)
                                    }
                                >
                                    <div
                                        className={`h-3 w-3 rounded-full ${selectedColor.bgClass}`}
                                    ></div>
                                    <PaintBucket className="h-4 w-4" />
                                </Button>

                                {showColorPicker && (
                                    <div
                                        ref={colorPickerRef}
                                        className="absolute left-0 top-full z-50 mt-1 w-40 rounded-md border bg-white p-2 shadow-lg"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {colors.map((color) => (
                                                <button
                                                    key={color.name}
                                                    className={`h-8 w-8 rounded-full ${color.bgClass} ${
                                                        selectedColor.name ===
                                                        color.name
                                                            ? "ring-2 ring-blue-500 ring-offset-2"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setSelectedColor(color);
                                                        setShowColorPicker(
                                                            false
                                                        );
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={createAnnotation}
                                className="flex items-center gap-1"
                            >
                                <span>💬</span> Annotate
                            </Button>
                        </BubbleMenu>
                    )}
                </div>

                {/* Comments Sidebar */}
                <div
                    ref={commentsSectionRef}
                    className="flex max-h-[80vh] w-[300px] flex-col gap-3 overflow-y-auto rounded-lg border p-4"
                >
                    <span className="text-sm font-semibold text-blue-600">
                        Annotations
                    </span>
                    {annotations.length ? (
                        annotations.map((annotation) => (
                            <div
                                key={annotation.id}
                                className={`flex flex-col gap-2 rounded-md border p-3 ${
                                    annotation.id === activeAnnotationId
                                        ? "border-2 border-blue-400"
                                        : "border-slate-200"
                                }`}
                                style={{
                                    borderLeft: `4px solid ${annotation.color}`,
                                }}
                                onClick={() => {
                                    setActiveAnnotationId(annotation.id);
                                    findAndHighlightComment(
                                        annotation.id,
                                        true
                                    ); // do focus
                                }}
                            >
                                <div className="flex justify-between text-xs text-gray-500">
                                    <span>{annotation.colorName}</span>
                                    <span>
                                        {new Date(
                                            annotation.createdAt
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </span>
                                </div>

                                <div className="rounded bg-gray-50 p-2 text-sm font-medium">
                                    "{annotation.text}"
                                </div>

                                <div className="flex flex-col gap-2">
                                    <textarea
                                        data-id={annotation.id}
                                        value={annotation.comment}
                                        onChange={(e) => {
                                            onUpdateAnnotation(annotation.id, {
                                                comment: e.target.value,
                                            });
                                        }}
                                        placeholder="Add your notes here..."
                                        className={`min-h-[60px] rounded border bg-transparent p-2 text-sm ${
                                            annotation.id === activeAnnotationId
                                                ? "bg-slate-50"
                                                : "border-transparent"
                                        }`}
                                        onFocus={() => {
                                            setActiveAnnotationId(
                                                annotation.id
                                            );
                                            findAndHighlightComment(
                                                annotation.id,
                                                false
                                            );
                                        }}
                                    />
                                    {/* {annotation.id === activeAnnotationId && (
                                        <Button
                                            size="sm"
                                            variant="default"
                                            onClick={() => {
                                                setActiveAnnotationId(null);
                                                setTimeout(() => {
                                                    editor?.commands.focus();
                                                }, 0); // Delay focus to allow blur
                                            }}
                                        >
                                            Save
                                        </Button>
                                    )} */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center text-gray-400">
                            Highlight text and click annotate to add comments
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AnnotationEditor;
