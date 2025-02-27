"use client"

import React, { useState } from 'react';
import TextHighlighter from './TextHighlighter';

// Define TypeScript interfaces
interface Highlight {
  id: string;
  text: string;
  color: string;
  decisionId: string;
  startOffset: number;
  endOffset: number;
  startContainer: string;
  endContainer: string;
  type: string;
}

const DocumentViewer: React.FC = () => {
  // State to track highlights
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  
  // Annotation system
  const annotationSystem = {
    saveUserAnnotation: (
      text: string,
      colorName: string,
      decisionId: string,
      highlightId: string,
      startOffset: number,
      endOffset: number,
      startContainer: string,
      endContainer: string,
      typename: string
    ): void => {
      // Create a new highlight object
      const newHighlight: Highlight = {
        id: highlightId,
        text,
        color: colorName,
        decisionId,
        startOffset,
        endOffset,
        startContainer,
        endContainer,
        type: typename
      };
      
      // Add to our local state
      setHighlights(prev => [...prev, newHighlight]);
      
      // In a real app, you would save to your backend here
      console.log('Saved highlight:', newHighlight);
    },
    annotations: highlights
  };
  
  return (
    <div>
      <div>
        <TextHighlighter
          decisionId="doc-12345"
          userAnnotations={annotationSystem}
        >
          <p>
            This is a sample document that demonstrates the text highlighting functionality.
            Try selecting any text in this paragraph and choose a highlight color from the
            popup that appears.

            The highlighting system uses xpath-range to identify the exact position of the text.
            When you highlight text, it's immediately visible and the position information is
            saved so it can be restored later.
          </p>
        </TextHighlighter>
      </div>
    </div>
  );
};

export default DocumentViewer;