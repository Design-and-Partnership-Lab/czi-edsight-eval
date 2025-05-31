/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import type { JSX } from "react";
import * as React from "react";
import { useEffect, useState } from "react";
import { CommentStore } from "@/components/mvp/lexical/commenting";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CAN_USE_DOM } from "@lexical/utils";

import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import CommentPlugin from "./plugins/CommentPlugin";
import FloatingTextFormatToolbarPlugin from "./plugins/FloatingTextFormatToolbarPlugin";
import ContentEditable from "./ui/ContentEditable";

interface EditorProps {
    commentStore: CommentStore;
    isReadOnly?: boolean;
}

export default function Editor({
    commentStore,
    isReadOnly,
}: EditorProps): JSX.Element {
    const { historyState } = useSharedHistoryContext();

    const placeholder = "Enter some plain text...";
    const [isSmallWidthViewport, setIsSmallWidthViewport] =
        useState<boolean>(false);

    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);
    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    useEffect(() => {
        const updateViewPortWidth = () => {
            const isNextSmallWidthViewport =
                CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };
        updateViewPortWidth();
        window.addEventListener("resize", updateViewPortWidth);

        return () => {
            window.removeEventListener("resize", updateViewPortWidth);
        };
    }, [isSmallWidthViewport]);

    return (
        <div className="editor-container plain-text">
            <CommentPlugin
                // editor={editor}
                commentStore={commentStore}
                isReadOnly={isReadOnly}
            />
            <>
                <HistoryPlugin externalHistoryState={historyState} />

                <RichTextPlugin
                    contentEditable={
                        <div className="editor-scroller">
                            <div
                                className="editor"
                                ref={onRef}
                            >
                                <ContentEditable placeholder={placeholder} />
                            </div>
                        </div>
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />

                {floatingAnchorElem && !isSmallWidthViewport && !isReadOnly && (
                    <>
                        <FloatingTextFormatToolbarPlugin
                            anchorElem={floatingAnchorElem}
                            setIsLinkEditMode={() => {}}
                        />
                    </>
                )}
            </>
        </div>
    );
}
