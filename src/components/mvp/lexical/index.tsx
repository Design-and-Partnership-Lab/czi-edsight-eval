"use client";

import { CommentStore } from "@/components/mvp/lexical/commenting";

import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import Editor from "./Editor";

interface LexicalProps {
    commentStore: CommentStore;
    isReadOnly?: boolean;
}

export function Lexical({
    commentStore,
    isReadOnly,
}: LexicalProps): JSX.Element {
    return (
        <SharedHistoryContext>
            <ToolbarContext>
                <div className="editor-shell">
                    <Editor
                        commentStore={commentStore}
                        isReadOnly={isReadOnly}
                    />
                </div>
            </ToolbarContext>
        </SharedHistoryContext>
    );
}
