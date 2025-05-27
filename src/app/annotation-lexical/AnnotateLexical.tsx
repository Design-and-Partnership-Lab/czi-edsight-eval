"use client";

import type { JSX } from "react";
import React from "react";
import { $createLinkNode } from "@lexical/link";
import { $createListItemNode, $createListNode } from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { $createHeadingNode, $createQuoteNode } from "@lexical/rich-text";
import {
    $createParagraphNode,
    $createTextNode,
    $getRoot,
    $isTextNode,
    DOMConversionMap,
    TextNode,
} from "lexical";

import { SharedHistoryContext } from "./context/SharedHistoryContext";
import { ToolbarContext } from "./context/ToolbarContext";
import Editor from "./Editor";
import PlaygroundNodes from "./nodes/PlaygroundNodes";
import { parseAllowedFontSize } from "./plugins/ToolbarPlugin/fontSize";
import PlaygroundEditorTheme from "./themes/PlaygroundEditorTheme";
import { parseAllowedColor } from "./ui/ColorPicker";

function createEditorContent(text: string) {
    return () => {
        const root = $getRoot();
        if (root.getFirstChild() === null) {
            const paragraph = $createParagraphNode();
            paragraph.append($createTextNode(text || ""));
            root.append(paragraph);
        }
    };
}

function getExtraStyles(element: HTMLElement): string {
    let extraStyles = "";
    const fontSize = parseAllowedFontSize(element.style.fontSize);
    const backgroundColor = parseAllowedColor(element.style.backgroundColor);
    const color = parseAllowedColor(element.style.color);
    if (fontSize !== "" && fontSize !== "15px") {
        extraStyles += `font-size: ${fontSize};`;
    }
    if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
        extraStyles += `background-color: ${backgroundColor};`;
    }
    if (color !== "" && color !== "rgb(0, 0, 0)") {
        extraStyles += `color: ${color};`;
    }
    return extraStyles;
}

function buildImportMap(): DOMConversionMap {
    const importMap: DOMConversionMap = {};

    for (const [tag, fn] of Object.entries(TextNode.importDOM() || {})) {
        importMap[tag] = (importNode) => {
            const importer = fn(importNode);
            if (!importer) {
                return null;
            }
            return {
                ...importer,
                conversion: (element) => {
                    const output = importer.conversion(element);
                    if (
                        output === null ||
                        output.forChild === undefined ||
                        output.after !== undefined ||
                        output.node !== null
                    ) {
                        return output;
                    }
                    const extraStyles = getExtraStyles(element);
                    if (extraStyles) {
                        const { forChild } = output;
                        return {
                            ...output,
                            forChild: (child, parent) => {
                                const textNode = forChild(child, parent);
                                if ($isTextNode(textNode)) {
                                    textNode.setStyle(
                                        textNode.getStyle() + extraStyles
                                    );
                                }
                                return textNode;
                            },
                        };
                    }
                    return output;
                },
            };
        };
    }

    return importMap;
}

export default function AnnotateLexical({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}): JSX.Element {
    const textContent = React.Children.toArray(children).join("");

    const initialConfig = {
        editorState: createEditorContent(textContent),
        html: { import: buildImportMap() },
        namespace: "Playground",
        nodes: [...PlaygroundNodes],
        onError: (error: Error) => {
            throw error;
        },
        theme: PlaygroundEditorTheme,
        editable: false,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <SharedHistoryContext>
                <ToolbarContext>
                    <div className={`editor-shell ${className}`}>
                        <Editor />
                    </div>
                </ToolbarContext>
            </SharedHistoryContext>
        </LexicalComposer>
    );
}
