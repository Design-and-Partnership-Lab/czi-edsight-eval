"use client";

import { useMemo } from "react";
import { Lexical } from "@/components/mvp/lexical";
import { CommentStore } from "@/components/mvp/lexical/commenting";
import PlaygroundEditorTheme from "@/components/mvp/lexical/themes/PlaygroundEditorTheme";
import { populateRichText } from "@/components/mvp/lexical/utils/populateRichText";
import { MarkNode } from "@lexical/mark";
import {
    InitialConfigType,
    LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export default function Page() {
    const initialConfig = {
        editorState:
            populateRichText(`Tempor commodo velit minim Lorem occaecat quis sunt consectetur. Minim pariatur adipisicing elit sunt voluptate non Lorem ullamco consequat. Magna Lorem cillum aliquip officia ea aliqua aliquip est. Mollit dolor ad enim id do dolore reprehenderit ea dolor ipsum. Dolor aliqua duis in ea excepteur incididunt ullamco incididunt dolor esse laborum ea commodo. Dolore voluptate sit proident officia magna. Deserunt sunt sunt reprehenderit magna. Laboris ut laborum ullamco irure ex et minim labore deserunt dolor. Dolore labore velit sint est officia deserunt nostrud. Sint in elit magna eu consequat ut do elit velit ut officia veniam aliqua. Deserunt sunt sunt reprehenderit magna. Laboris ut laborum ullamco irure ex et minim labore deserunt dolor. Dolore labore velit sint est officia deserunt nostrud. Sint in elit magna eu consequat ut do elit velit ut officia veniam aliqua.
            `),
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
            <Foo />
        </LexicalComposer>
    );
}

const Foo = () => {
    const [editor] = useLexicalComposerContext();
    const commentStore = useMemo(() => new CommentStore(editor), [editor]);

    return (
        <div className="m-8 border border-blue-500 p-4">
            <Lexical commentStore={commentStore} />
        </div>
    );
};
