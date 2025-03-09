"use client";

import React, { useState, useRef } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/tremor/Popover";

interface Position {
  top: number;
  left: number;
}

function TextHighlighter(): React.ReactElement {
  const [text, setText] = useState<string>('duyfgsad fgdsauyfg sduiyfgasd fyug sadifgdsiuyfgasduyifgasduf gdsiuf gaiusdfg asdiuyfga sdiufgasi ');
  const [annotations, setAnnotations] = useState<string[]>([]);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [tooltipPos, setTooltipPos] = useState<Position>({ top: 0, left: 0 });
  const currentSelectionRef = useRef<string | null>(null);
  
  const COLORS = [
    { name: 'Yellow', bgClass: 'bg-[#FFF59D]' },
    { name: 'Green', bgClass: 'bg-[#C5E1A5]' },
    { name: 'Blue', bgClass: 'bg-[#90CAF9]' },
    { name: 'Purple', bgClass: 'bg-[#CE93D8]' }
  ];

  const handleMouseUp = () => {

    const selection = window.getSelection();
    if (!selection) return;

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText && selectedText.trim() !== '') {
        currentSelectionRef.current = selectedText;
        
        // get x and y coordinates of selection to place the popover
        const rect = range.getBoundingClientRect();
        setTooltipPos({
          left: rect.left + (rect.width / 2),
          top: rect.bottom - 15
        });
        
        setShowTooltip(true);

      } else {
        setShowTooltip(false);
      }
    }
  };

  const onHighlightAction = (colorName: string): void => {
    if (!currentSelectionRef.current) return;

    const color = COLORS.find(c => c.name === colorName);
    if (!color) return;

    setAnnotations([...annotations, currentSelectionRef.current]);
    
    // wrap the selected text in a span with the selected color, can make it a button
    // in the future for deleting and viewing options
    const highlightedText = `<span class="${color.bgClass}" onClick="console.log('pressed')">${currentSelectionRef.current}</span>`;

    // replaces the selected text with the highlighted text
    const newText = text.replace(currentSelectionRef.current, highlightedText);
    
    setText(newText);
    
    // close popover and reset selection
    setShowTooltip(false);
    currentSelectionRef.current = null;
  };

  return (
    <div>
      <div 
        className="p-4" 
        onMouseUp={handleMouseUp} 
        dangerouslySetInnerHTML={{ __html: text }} 
      />
      
      <Popover open={showTooltip} onOpenChange={setShowTooltip}>
        <PopoverTrigger className="hidden"></PopoverTrigger>
        <PopoverContent
          className="absolute z-10 rounded-lg !bg-neutral-700 !p-2"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
          }}
          sideOffset={20}
        >
          <div className="flex">
            {COLORS.map(({ name, bgClass }) => (
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
}

export default TextHighlighter;