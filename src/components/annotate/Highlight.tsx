"use client";

import React, { useState } from 'react';

function TextHighlighter() {
  const [text, setText] = useState('Select some text to highlight');

  const handleMouseUp = () => {

    const selection = window.getSelection();
    if (!selection) return;

    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        const highlightedText = `<span style="background-color: yellow;">${selectedText}</span>`;
        const newText = text.replace(selectedText, highlightedText);
        setText(newText);
      }
    }
  };

  return (
    <div onMouseUp={handleMouseUp} dangerouslySetInnerHTML={{ __html: text }} />
  );
}

export default TextHighlighter;