"use client";

import { MarkNode } from "@lexical/mark";
import {
    InitialConfigType,
    LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import Editor from "./Editor";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";

function populateRichText(text: string) {
    return () => {
        const root = $getRoot();
        if (root.getFirstChild() === null) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(text));
            root.append(paragraph);
        }
    };
}

interface LexicalProps {
    text: string;
}

export function Lexical({ text }: LexicalProps): JSX.Element {
    const initialConfig = {
        editorState: populateRichText(text),
        namespace: "Annotation",
        onError: (error: Error) => {
            throw error;
        },
        nodes: [MarkNode],
        theme: PlaygroundEditorTheme,
        editable: false,
    } satisfies InitialConfigType;

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <SharedHistoryContext>
                <ToolbarContext>
                    <div className="editor-shell m-8 mt-16 border-blue-500">
                        <Editor />
                    </div>
                </ToolbarContext>
            </SharedHistoryContext>
        </LexicalComposer>
    );
}
