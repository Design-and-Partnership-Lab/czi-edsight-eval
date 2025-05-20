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
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { CAN_USE_DOM } from "@lexical/utils";

import { useSharedHistoryContext } from "./context/SharedHistoryContext";
import FloatingCommentToolbar from "./floatingCommentToolbar";
import CommentPlugin from "./plugins/CommentPlugin";
import ContentEditable from "./ui/ContentEditable";

export default function Editor(): JSX.Element {
    const { historyState } = useSharedHistoryContext();
    const placeholder = "Example text here...";
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);
    const [isSmallWidthViewport, setIsSmallWidthViewport] =
        useState<boolean>(false);

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
        <>
            <div className={`editor-container`}>
                <CommentPlugin />
                <>
                    <HistoryPlugin externalHistoryState={historyState} />
                    <RichTextPlugin
                        contentEditable={
                            <div className="editor-scroller">
                                <div
                                    className="editor"
                                    ref={onRef}
                                >
                                    <ContentEditable
                                        placeholder={placeholder}
                                    />
                                </div>
                            </div>
                        }
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                    {floatingAnchorElem && !isSmallWidthViewport && (
                        <FloatingCommentToolbar
                            anchorElem={floatingAnchorElem}
                        />
                    )}
                </>
            </div>
        </>
    );
}
