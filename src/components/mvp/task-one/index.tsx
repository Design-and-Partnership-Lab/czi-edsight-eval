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
        handleCanProgress(true);
    }, [handleCanProgress]);

    return <Lexical commentStore={commentStore} />;
}
