import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
} from "react";
import { Thread } from "@/components/mvp/lexical/commenting";
import Button from "@/components/mvp/lexical/ui/Button";
import { cx } from "@/lib/utils";
import { createDOMRange, createRectsFromDOMRange } from "@lexical/selection";
import {
    $getSelection,
    $isRangeSelection,
    type LexicalEditor,
    type RangeSelection,
} from "lexical";

export function CommentBox({
    editor,
    activeComment,
    handleClose,
    handleDelete,
}: {
    editor: LexicalEditor;
    activeComment: Thread;
    handleClose: () => void;
    handleDelete: (() => void) | null;
}) {
    const boxRef = useRef<HTMLDivElement>(null);
    const selectionState = useMemo(
        () => ({
            container: document.createElement("div"),
            elements: [],
        }),
        []
    );
    const selectionRef = useRef<RangeSelection | null>(null);

    const updateLocation = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                selectionRef.current = selection.clone();
                const anchor = selection.anchor;
                const focus = selection.focus;
                const range = createDOMRange(
                    editor,
                    anchor.getNode(),
                    anchor.offset,
                    focus.getNode(),
                    focus.offset
                );
                const boxElem = boxRef.current;
                if (range !== null && boxElem !== null) {
                    const { left, bottom, width } =
                        range.getBoundingClientRect();
                    const selectionRects = createRectsFromDOMRange(
                        editor,
                        range
                    );
                    let correctedLeft =
                        selectionRects.length === 1
                            ? left + width / 2 - 125
                            : left - 125;
                    if (correctedLeft < 10) {
                        correctedLeft = 10;
                    }
                    boxElem.style.left = `${correctedLeft}px`;
                    boxElem.style.top = `${
                        bottom +
                        20 +
                        (window.pageYOffset ||
                            document.documentElement.scrollTop)
                    }px`;
                    const selectionRectsLength = selectionRects.length;
                    const { container } = selectionState;
                    const elements: Array<HTMLSpanElement> =
                        selectionState.elements;
                    const elementsLength = elements.length;

                    for (let i = 0; i < selectionRectsLength; i++) {
                        const selectionRect = selectionRects[i];
                        let elem: HTMLSpanElement = elements[i];
                        if (elem === undefined) {
                            elem = document.createElement("span");
                            elements[i] = elem;
                            container.appendChild(elem);
                        }
                        const color = "255, 212, 0";
                        const style = `position:absolute;top:${
                            selectionRect.top +
                            (window.pageYOffset ||
                                document.documentElement.scrollTop)
                        }px;left:${selectionRect.left}px;height:${
                            selectionRect.height
                        }px;width:${
                            selectionRect.width
                        }px;background-color:rgba(${color}, 0.3);pointer-events:none;z-index:5;`;
                        elem.style.cssText = style;
                    }
                    for (
                        let i = elementsLength - 1;
                        i >= selectionRectsLength;
                        i--
                    ) {
                        const elem = elements[i];
                        container.removeChild(elem);
                        elements.pop();
                    }
                }
            }
        });
    }, [editor, selectionState]);

    useLayoutEffect(() => {
        updateLocation();
        const container = selectionState.container;
        const body = document.body;
        if (body !== null) {
            body.appendChild(container);
            return () => {
                body.removeChild(container);
            };
        }
    }, [selectionState.container, updateLocation, activeComment]);

    useEffect(() => {
        window.addEventListener("resize", updateLocation);

        return () => {
            window.removeEventListener("resize", updateLocation);
        };
    }, [updateLocation]);

    return (
        <div
            className="CommentPlugin_CommentInputBox"
            ref={boxRef}
        >
            <p className="mb-2 border-l-4 border-l-neutral-300 p-[10px]">
                {activeComment.comments.at(0)?.content}
            </p>

            <div className="CommentPlugin_CommentInputBox_Buttons">
                <Button
                    onClick={handleClose}
                    className="CommentPlugin_CommentInputBox_Button"
                >
                    Close
                </Button>
                <Button
                    onClick={handleDelete ?? (() => {})}
                    disabled={handleDelete === null}
                    className={cx(
                        "CommentPlugin_CommentInputBox_Button",
                        "!bg-red-500 !text-white"
                    )}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}
