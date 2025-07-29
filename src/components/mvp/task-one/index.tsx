"use client";

import { useEffect } from "react";
import { Lexical } from "@/components/mvp/lexical";
import type { CommentStore } from "@/components/mvp/lexical/commenting";

interface TaskOneProps {
    commentStore: CommentStore;
    handleCanProgress: (value: boolean) => void;
}

export function TaskOne({ commentStore, handleCanProgress }: TaskOneProps) {
    useEffect(() => {
        const checkComments = () => {
            const comments = commentStore.getComments();
            if (Array.isArray(comments) && comments.length > 0) {
                handleCanProgress(true);
            } else {
                handleCanProgress(false);
            }
        };
        checkComments();
        const unsubscribe = commentStore.registerOnChange(checkComments);
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [commentStore, handleCanProgress]);

    return (
        <div className="flex flex-col items-center justify-center">
            <Lexical commentStore={commentStore} />
            <span className="mt-4 text-sm text-neutral-500">
                Highlight the text with your cursor to start annotating.
            </span>
        </div>
    );
}
