"use client";

import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { Undo2, Redo2, Trash2 } from 'lucide-react';
import React, { useState, useEffect } from 'react'
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
    updateAnnotation: (id: string, colorName: string, comment: string) => void;
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
    deleteAnnotation,
    updateAnnotation
}: Props) => {

    const [selectedColor, setSelectedColor] = useState("");
    const formSchema = z.object({
        comment: z.string(),
    });

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            comment: "",
        },
    });

    // reset form with selectedAnnotation data when it changes
    useEffect(() => {
        if (selectedAnnotation && showAnnotationOptions) {
            console.log("Editing annotation:", selectedAnnotation);
            form.reset({
                comment: selectedAnnotation.comment || "",
            });

            setSelectedColor(selectedAnnotation.colorName || "");
        } else if (showTooltip) {
            form.reset({
                comment: "",
            });
            setSelectedColor("");
        }
    }, [selectedAnnotation, showAnnotationOptions, showTooltip, form]);

    const onSubmit = (formData: { comment: string }) => {
        console.log("Form submitted with:", formData);

        if (showAnnotationOptions && selectedAnnotation) {
            console.log("Updating annotation with:", {
                id: selectedAnnotation.id,
                color: selectedColor,
                comment: formData.comment
            });

            updateAnnotation(
                selectedAnnotation.id,
                selectedColor || selectedAnnotation.colorName,
                formData.comment
            );
            setShowAnnotationOptions(false);
        } else {
            onHighlightAction(selectedColor, formData.comment);
            setShowTooltip(false);
        }

        form.reset();
        setSelectedColor("");
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
                    className="annotation-tooltip absolute z-10 rounded-lg !bg-white !p-2 shadow-2xl"
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
                                className={`h-5 w-5 ${bgClass} mx-1 cursor-pointer rounded-full border-none ${selectedColor === name ? "ring-2 ring-neutral-200" : ""
                                    }`}
                                title={name}
                            />
                        ))}
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                                className="w-full h-2/3 bg-[#26488a]/90 hover:bg-[#26488a] text-white"
                            >
                                Save
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
                    className="annotation-tooltip absolute z-10 rounded-lg !bg-white !p-2 shadow-2xl"
                    style={{
                        top: `${tooltipPos.top - 50}px`,
                        left: `10px`,
                    }}
                    sideOffset={20}
                >
                    <div className="space-y-2">
                        <div className="flex space-x-2">
                            {COLORS.map(({ name, bgClass }) => (
                                <button
                                    key={name}
                                    onClick={() => setSelectedColor(name)}
                                    className={`h-5 w-5 ${bgClass} mx-1 cursor-pointer rounded-full border-none ${selectedColor === name ? "ring-2 ring-neutral-200" : ""
                                        }`}
                                    title={name}
                                />
                            ))}
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                                <div className='flex row'>
                                    <button
                                        onClick={() =>
                                            selectedAnnotation &&
                                            deleteAnnotation(selectedAnnotation.id)
                                        }
                                        className="mr-1 w-1/2 flex row rounded bg-neutral-100 px-2 py-1 text-neutral-600 hover:bg-neutral-200 text-md items-center justify-center gap-x-1"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    <Button
                                        type="submit"
                                        disabled={!selectedColor}
                                        className="w-full h-1/2 bg-[#26488a]/90 hover:bg-[#26488a] text-white"
                                    >
                                        Update
                                    </Button>

                                </div>
                            </form>
                        </Form>

                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default AnnotatedText