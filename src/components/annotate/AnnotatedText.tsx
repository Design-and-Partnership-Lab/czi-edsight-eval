import React from "react";
import { annotationColors } from "@/lib/annotationColors";
import { Annotation } from "@/types";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@radix-ui/react-popover";
import { Redo2, Trash2, Undo2 } from "lucide-react";

interface Props {
    text: string;
    tooltipPos: { top: number; left: number };
    undo: () => void;
    redo: () => void;
    handleMouseUp: () => void;
    showTooltip: boolean;
    setShowTooltip: (value: boolean) => void;
    selectedAnnotation: Annotation | null;
    historyPositionRef: React.MutableRefObject<number>;
    historyRef: React.MutableRefObject<
        { text: string; annotations: Annotation[] }[]
    >;
    showAnnotationOptions: boolean;
    setShowAnnotationOptions: (value: boolean) => void;
    onHighlightAction: (colorName: string) => void;
    changeAnnotationColor: (id: string, colorName: string) => void;
    deleteAnnotation: (id: string) => void;
}

const AnnotatedText = ({
    text,
    tooltipPos,
    undo,
    redo,
    handleMouseUp,
    showTooltip,
    setShowTooltip,
    selectedAnnotation,
    historyPositionRef,
    historyRef,
    showAnnotationOptions,
    setShowAnnotationOptions,
    onHighlightAction,
    changeAnnotationColor,
    deleteAnnotation,
}: Props) => {
    return (
        <div className="relative">
            {/* Undo/Redo Controls */}
            <div className="mb-2 flex space-x-2">
                <button
                    onClick={undo}
                    disabled={historyPositionRef.current <= 0}
                    className="rounded bg-gray-200 px-2 py-1 text-sm disabled:opacity-50"
                >
                    <Undo2 />
                </button>
                <button
                    onClick={redo}
                    disabled={
                        historyPositionRef.current >=
                        historyRef.current.length - 1
                    }
                    className="rounded bg-gray-200 px-2 py-1 text-sm disabled:opacity-50"
                >
                    <Redo2 />
                </button>
            </div>

            {/* Text content with highlighting */}
            <div
                className="min-h-[200px] rounded-md border p-4"
                onMouseUp={handleMouseUp}
                dangerouslySetInnerHTML={{ __html: text }}
            />

            {/* Annotation color picker */}
            <Popover
                open={showTooltip}
                onOpenChange={setShowTooltip}
            >
                <PopoverTrigger className="hidden"></PopoverTrigger>
                <PopoverContent
                    className="annotation-tooltip absolute z-10 rounded-lg !bg-neutral-700 !p-2"
                    style={{
                        top: `${tooltipPos.top}px`,
                        left: `${tooltipPos.left}px`,
                    }}
                    sideOffset={20}
                >
                    <div className="flex">
                        {annotationColors.map(({ name, bgClass }) => (
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

            {/* Annotation options (edit, delete) */}
            <Popover
                open={showAnnotationOptions}
                onOpenChange={setShowAnnotationOptions}
            >
                <PopoverTrigger className="hidden"></PopoverTrigger>
                <PopoverContent
                    className="annotation-tooltip absolute z-10 rounded-lg !bg-neutral-700 !p-2"
                    style={{
                        top: `${tooltipPos.top}px`,
                        left: `${tooltipPos.left}px`,
                    }}
                    sideOffset={20}
                >
                    <div className="space-y-2">
                        <div className="flex space-x-2">
                            {annotationColors.map(({ name, bgClass }) => (
                                <button
                                    key={name}
                                    onClick={() =>
                                        selectedAnnotation &&
                                        changeAnnotationColor(
                                            selectedAnnotation.id,
                                            name
                                        )
                                    }
                                    className={`h-5 w-5 ${bgClass} cursor-pointer rounded-full border-none ${selectedAnnotation?.colorName === name ? "ring-2 ring-neutral-400" : ""}`}
                                    title={name}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() =>
                                selectedAnnotation &&
                                deleteAnnotation(selectedAnnotation.id)
                            }
                            className="row text-md mt-2 flex w-full items-center justify-center gap-x-1 rounded bg-red-100 px-2 py-1 text-red-600 hover:bg-red-200"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default AnnotatedText;
