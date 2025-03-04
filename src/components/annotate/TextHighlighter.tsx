import React, { useEffect, useMemo, useRef, useState } from "react";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { v4 as uuidv4 } from "uuid";
import { fromRange } from "xpath-range";

import {
    HighlightColor,
    TextHighlighterProps,
    XPathObject,
    XPathParameters,
} from "../../types/index";

// Helper function to get window selection
function getWindowSelection(): Selection | null {
    return window.getSelection();
}

// Function to extract XPath parameters
const getXpathParameters = (xpath: XPathObject): XPathParameters => {
    const startOffset = xpath.startOffset;
    const endOffset = xpath.endOffset;
    let startContainer = xpath.start;
    // /div[2]/p[7]/text()[1] -> /div[2]/p[7]/text[1]
    startContainer = startContainer.replace(/\(|\)/g, "");
    let endContainer = xpath.end;
    endContainer = endContainer.replace(/\(|\)/g, "");
    return { startOffset, endOffset, startContainer, endContainer };
};

// Main component
const TextHighlighter: React.FC<TextHighlighterProps> = ({
    decisionId,
    userAnnotations,
    children,
}) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);
    const [tooltipPos, setTooltipPos] = useState<{ top: number; left: number }>(
        { top: 0, left: 0 }
    );
    const [selectedText, setSelectedText] = useState<string>("");
    const contentRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Colors with Tailwind classes and hex values for DOM manipulation
    const highlightColors: HighlightColor[] = useMemo(
        () => [
            { name: "yellow", color: "#FFF59D", bgClass: "bg-yellow-200" },
            { name: "green", color: "#C5E1A5", bgClass: "bg-green-200" },
            { name: "blue", color: "#90CAF9", bgClass: "bg-blue-200" },
            { name: "purple", color: "#CE93D8", bgClass: "bg-purple-200" },
        ],
        []
    );

    const handleSelection = (): void => {
        const selection = getWindowSelection();
        const text = selection ? selection.toString().trim() : "";

        if (
            !text ||
            !selection ||
            !contentRef.current ||
            selection?.rangeCount === 0
        ) {
            setShowTooltip(false);
            return;
        }

        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;

        // Check if both start and end nodes are inside contentRef
        if (
            contentRef.current.contains(startContainer) &&
            contentRef.current.contains(endContainer)
        ) {
            const rect = range.getBoundingClientRect();

            setTooltipPos({
                top: rect.top,
                left: rect.left + rect.width / 2,
            });

            setSelectedText(text);
            setShowTooltip(true);
        } else {
            setShowTooltip(false);
        }
    };

    // Handle highlight action
    const onHighlightAction = (colorName: string): void => {
        if (!selectedText) {
            setShowTooltip(false);
            return;
        }

        const selection = getWindowSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const content = contentRef.current;
            let xpath: XPathObject | null = null;

            if (content) {
                try {
                    // Get xpath from selection range
                    xpath = fromRange(range, content) as XPathObject;

                    if (xpath) {
                        const {
                            startOffset,
                            endOffset,
                            startContainer,
                            endContainer,
                        } = getXpathParameters(xpath);
                        const highlightId = uuidv4();

                        // Apply highlight directly to DOM for immediate visual feedback
                        const highlightColor =
                            highlightColors.find((c) => c.name === colorName)
                                ?.color || "#FFF59D";
                        applyHighlightToDOM(range, highlightId, highlightColor);

                        // Clear selection after highlighting
                        selection.removeAllRanges();

                        // Save to your annotation system
                        userAnnotations.saveUserAnnotation(
                            selectedText,
                            colorName,
                            decisionId,
                            highlightId,
                            startOffset,
                            endOffset,
                            startContainer,
                            endContainer,
                            "highlight"
                        );
                    }
                } catch (e) {
                    console.error("Error highlighting text:", e);
                }
            }
        }

        setShowTooltip(false);
    };

    // Apply highlight directly to DOM
    const applyHighlightToDOM = (
        range: Range,
        id: string,
        color: string
    ): void => {
        // Create highlight span
        const span = document.createElement("span");
        span.style.backgroundColor = color;
        span.style.borderRadius = "2px";
        span.dataset.highlightId = id;

        try {
            // Surround the range with our highlight span
            range.surroundContents(span);
        } catch (e) {
            console.error("Error applying highlight to DOM:", e);
        }
    };

    // Load and apply saved highlights
    useEffect(() => {
        if (userAnnotations?.annotations?.length && contentRef.current) {
            userAnnotations.annotations.forEach((highlight) => {
                try {
                    const {
                        startContainer,
                        endContainer,
                        startOffset,
                        endOffset,
                        color,
                    } = highlight;

                    // Find nodes by XPath
                    const contentNode = contentRef.current;
                    if (!contentNode) return;

                    const startNodeResult = document.evaluate(
                        startContainer,
                        contentNode,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    );

                    const startNode = startNodeResult.singleNodeValue;

                    const endNodeResult = document.evaluate(
                        endContainer,
                        contentNode,
                        null,
                        XPathResult.FIRST_ORDERED_NODE_TYPE,
                        null
                    );

                    const endNode = endNodeResult.singleNodeValue;

                    if (startNode && endNode) {
                        // Create range
                        const range = document.createRange();
                        range.setStart(startNode, startOffset);
                        range.setEnd(endNode, endOffset);

                        // Get color
                        const highlightColor =
                            highlightColors.find((c) => c.name === color)
                                ?.color || "#FFF59D";

                        // Apply highlight
                        applyHighlightToDOM(
                            range,
                            highlight.id,
                            highlightColor
                        );
                    }
                } catch (e) {
                    console.error("Error applying saved highlight:", e);
                }
            });
        }
    }, [userAnnotations.annotations, highlightColors]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                contentRef.current &&
                !contentRef.current.contains(event.target as Node) &&
                !popoverRef.current?.contains(event.target as Node)
            ) {
                setShowTooltip(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <div
                ref={contentRef}
                id="decision-reader-body-root"
                onMouseUp={handleSelection}
                className="relative"
            >
                {children}
            </div>

            <Popover open={showTooltip}>
                <PopoverContent
                    className="absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-neutral-700 p-2"
                    style={{
                        top: `${tooltipPos.top}px`,
                        left: `${tooltipPos.left}px`,
                    }}
                    side="top"
                    sideOffset={20}
                    ref={popoverRef}
                >
                    <div className="flex">
                        {highlightColors.map(({ name, bgClass }) => (
                            <button
                                key={name}
                                onClick={() => onHighlightAction(name)}
                                className={`h-5 w-5 ${bgClass} mx-1 cursor-pointer rounded-full border-none`}
                                title={name}
                            />
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default TextHighlighter;
