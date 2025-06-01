import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";

export function populateRichText(text: string) {
    return () => {
        const root = $getRoot();
        if (root.getFirstChild() === null) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(text));
            root.append(paragraph);
        }
    };
}
