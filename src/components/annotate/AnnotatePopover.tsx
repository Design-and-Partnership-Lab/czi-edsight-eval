"use client";

import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Undo2, Redo2, Trash2 } from 'lucide-react';
import React, { useState } from 'react'
import { Annotation } from '@/types';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '../ui/textarea';

interface Props {
    text: string;
    tooltipPos: { top: number; left: number };
    undo: () => void;
    redo: () => void;
    handleMouseUp: () => void;
    handleContainerClick: (e: React.MouseEvent) => void; // this is for click handler on annotations to make edit popover appear
    showTooltip: boolean;
    setShowTooltip: (value: boolean) => void;
    selectedAnnotation: Annotation | null;
    historyPositionRef: React.MutableRefObject<number>;
    historyRef: React.MutableRefObject<{ text: string; annotations: Annotation[] }[]>;
    showAnnotationOptions: boolean;
    setShowAnnotationOptions: (value: boolean) => void;
    onHighlightAction: (colorName: string, comment: string) => void;
    changeAnnotationColor: (id: string, colorName: string) => void;
    deleteAnnotation: (id: string) => void;
}


const COLORS = [
    { name: "Yellow", bgClass: "bg-[#FFF59D]" },
    { name: "Green", bgClass: "bg-[#C5E1A5]" },
    { name: "Blue", bgClass: "bg-[#90CAF9]" },
    { name: "Purple", bgClass: "bg-[#CE93D8]" },
];

const AnnotatedText = ({
    text,
    tooltipPos,
    undo,
    redo,
    handleMouseUp,
    handleContainerClick,
    showTooltip,
    setShowTooltip,
    selectedAnnotation,
    historyPositionRef,
    historyRef,
    showAnnotationOptions,
    setShowAnnotationOptions,
    onHighlightAction,
    changeAnnotationColor,
    deleteAnnotation
}: Props) => {

    const [selectedColor, setSelectedColor] = useState("");
    const formSchema = z.object({
        comment: z.string({ message: "Comment is required" }),
    });
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    });
    const onSubmit = (formData: { comment: string; }) => {
        onHighlightAction(selectedColor, formData.comment);
        setShowTooltip(false);
        form.reset();
        setSelectedColor(""); // reset selected color
    };


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

            {/* Text content with highlighting - now with click handler */}
            <div
                className="min-h-[200px] rounded-md border p-4"
                onMouseUp={handleMouseUp}
                onClick={handleContainerClick}
                dangerouslySetInnerHTML={{ __html: text }}
            />

            {/* New Annotation box */}
            <Popover
                open={showTooltip}
                onOpenChange={setShowTooltip}
            >
                <PopoverTrigger className="hidden"></PopoverTrigger>
                <PopoverContent
                    className="annotation-tooltip absolute z-10 rounded-lg !bg-neutral-700 !p-2"
                    style={{
                        top: `${tooltipPos.top - 50}px`,
                        left: `10px`,
                    }}
                    sideOffset={20}
                >
                    <div className="flex mb-3">
                        {COLORS.map(({ name, bgClass }) => (
                            <button
                                key={name}
                                onClick={() => setSelectedColor(name)}
                                className={`h-5 w-5 ${bgClass} mx-1 cursor-pointer rounded-full border-none ${selectedColor === name ? "ring-2 ring-white" : ""
                                    }`}
                                title={name}
                            />
                        ))}
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Comment Something..."
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={!selectedColor}
                                className="w-full bg-black"
                            >
                                Submit
                            </Button>
                        </form>
                    </Form>
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
                            {COLORS.map(({ name, bgClass }) => (
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
                            className="mt-2 flex row w-full rounded bg-red-100 px-2 py-1 text-red-600 hover:bg-red-200 text-md items-center justify-center gap-x-1"
                        >
                            <Trash2 size={14} /> Delete
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default AnnotatedText