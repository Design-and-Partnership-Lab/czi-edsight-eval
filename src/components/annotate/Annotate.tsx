"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/tremor/Popover";
import { annotationColors } from "@/lib/annotationColors";
import { Annotation } from "@/types";
import { Redo2, Trash2, Undo2 } from "lucide-react";

import AnnotatedText from "./AnnotatedText";

interface Position {
  top: number;
  left: number;
}

const Annotate = ({ children }: { children: string }) => {
  const [text, setText] = useState<string>(children);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPos, setTooltipPos] = useState<Position>({ top: 0, left: 0 });
  const currentSelectionRef = useRef<string | null>(null);
  const [showAnnotationOptions, setShowAnnotationOptions] =
    useState<boolean>(false);
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const historyRef = useRef<{ text: string; annotations: Annotation[] }[]>(
    []
  );
  const historyPositionRef = useRef<number>(-1);

  // initialize history with original state
  useEffect(() => {
    addToHistory(text, annotations);
  }, []);

  const addToHistory = (
    currentText: string,
    currentAnnotations: Annotation[]
  ) => {
    // if we're not at the end of history, remove future states
    if (historyPositionRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(
        0,
        historyPositionRef.current + 1
      );
    }

    // add current state to history
    historyRef.current.push({
      text: currentText,
      annotations: [...currentAnnotations],
    });

    historyPositionRef.current = historyRef.current.length - 1;
  };

  const undo = () => {
    if (historyPositionRef.current > 0) {
      historyPositionRef.current--;
      const previousState =
        historyRef.current[historyPositionRef.current];
      setText(previousState.text);
      setAnnotations(previousState.annotations);
    }
  };

  const redo = () => {
    if (historyPositionRef.current < historyRef.current.length - 1) {
      historyPositionRef.current++;
      const nextState = historyRef.current[historyPositionRef.current];
      setText(nextState.text);
      setAnnotations(nextState.annotations);
    }
  };

  const generateId = () => {
    return `annotation-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  };

  const changeAnnotationColor = (annotationId: string, colorName: string) => {
    const annotation = annotations.find((a) => a.id === annotationId);
    if (!annotation) return;

    const color = annotationColors.find((c) => c.name === colorName);
    if (!color) return;

    // update the annotation in our state
    const updatedAnnotations = annotations.map((a) =>
      a.id === annotationId
        ? { ...a, color: color.bgClass, colorName }
        : a
    );

    // update the HTML with the new color
    const spanPattern = new RegExp(
      `<span class="[^"]*annotation-span[^"]*" data-annotation-id="${annotationId}"[^>]*>${escapeRegExp(annotation.text)}</span>`,
      "g"
    );

    const highlightedText = `<span class="${color.bgClass} rounded-sm cursor-pointer annotation-span" data-annotation-id="${annotationId}" data-color="${colorName}">${annotation.text}</span>`;
    const newText = text.replace(spanPattern, highlightedText);

    setText(newText);
    setAnnotations(updatedAnnotations);
    setShowAnnotationOptions(false);
    addToHistory(newText, updatedAnnotations);
  };

  const onAnnotationClick = (annotation: string, event: MouseEvent) => {
    // another popover with colors, edit annotation, delete
    // need to pass in rect to position the popover as well, need to find solution for this.
    // TODO: change saved annotations to dicts with color, text, id, etc...

    const foundAnnotation = annotations.find((a) => a.text === annotation);
    if (foundAnnotation) {
      setSelectedAnnotation(foundAnnotation);

      // get position of the clicked element
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();

      setTooltipPos({
        left: rect.left + rect.width / 2,
        top: rect.bottom,
      });

      setShowAnnotationOptions(true);
    }
  };

  const deleteAnnotation = (annotationId: string) => {
    const annotationToDelete = annotations.find(
      (a) => a.id === annotationId
    );
    if (!annotationToDelete) return;

    // create a new text with the annotation removed
    const spanPattern = new RegExp(
      `<span class="[^"]*annotation-span[^"]*" data-annotation-id="${annotationId}"[^>]*>${escapeRegExp(annotationToDelete.text)}</span>`,
      "g"
    );

    const newText = text.replace(spanPattern, annotationToDelete.text);
    const newAnnotations = annotations.filter((a) => a.id !== annotationId);

    setText(newText);
    setAnnotations(newAnnotations);
    setShowAnnotationOptions(false);
    addToHistory(newText, newAnnotations);
  };

  // helper function to escape special characters in regex
  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // add an effect to attach click handlers to highlighted spans
  // THIS IS THE BUG
  useEffect(() => {
    const highlightedSpans = document.querySelectorAll(".annotation-span");

    highlightedSpans.forEach((span) => {
      span.addEventListener("click", (event) => {
        const annotationId = span.getAttribute("data-annotation-id");
        const annotation = span.textContent;
        if (annotation && annotationId) {
          onAnnotationClick(annotation, event as MouseEvent);
        }
      });
    });
  }, [text, annotations, showAnnotationOptions]);

  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection) return;

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      // the selectedText.length > 5 can be temporary
      // it prevents small things from accidentally being highlighted
      // and also, there is a bug where if there are highlighted duplicates, it will highlight all of them
      if (
        selectedText &&
        selectedText.trim() !== "" &&
        selectedText.length > 5
      ) {
        currentSelectionRef.current = selectedText;

        // get x and y coordinates of selection to place the popover
        const rect = range.getBoundingClientRect();
        setTooltipPos({
          left: rect.left + rect.width / 2,
          top: rect.bottom - 15,
        });

        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    }
  };

  const onHighlightAction = (colorName: string): void => {
    if (!currentSelectionRef.current) return;

    const color = annotationColors.find((c) => c.name === colorName);
    if (!color) return;

    const annotationId = generateId();
    const newAnnotation: Annotation = {
      id: annotationId,
      text: currentSelectionRef.current,
      color: color.bgClass,
      colorName: colorName,
    };

    const newAnnotations = [...annotations, newAnnotation];
    setAnnotations(newAnnotations);

    const highlightedText = `<span class="${color.bgClass} rounded-sm cursor-pointer annotation-span" data-annotation-id="${annotationId}" data-color="${colorName}">${currentSelectionRef.current}</span>`;
    const plainTextPattern = new RegExp(
      `(?<!<span[^>]*>)${escapeRegExp(currentSelectionRef.current)}(?!</span>)`,
      ""
    );

    const newText = text.replace(plainTextPattern, highlightedText);
    setText(newText);
    addToHistory(newText, newAnnotations);
    setShowTooltip(false);
    currentSelectionRef.current = null;
    window.getSelection()?.removeAllRanges();
  };


  useEffect(() => {
    localStorage.setItem('annotatedText', text);
    localStorage.setItem('annotations', JSON.stringify(annotations));
  }, [text, annotations]);

  return (
    <div>
      <AnnotatedText
        text={text}
        tooltipPos={tooltipPos}
        undo={undo}
        redo={redo}
        handleMouseUp={handleMouseUp}
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
        selectedAnnotation={selectedAnnotation}
        historyPositionRef={historyPositionRef}
        historyRef={historyRef}
        showAnnotationOptions={showAnnotationOptions}
        setShowAnnotationOptions={setShowAnnotationOptions}
        onHighlightAction={onHighlightAction}
        changeAnnotationColor={changeAnnotationColor}
        deleteAnnotation={deleteAnnotation}
      />
    </div>
  );
};

export default Annotate;
