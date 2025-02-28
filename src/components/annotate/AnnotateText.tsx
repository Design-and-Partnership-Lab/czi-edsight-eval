// AnnotateText.tsx
"use client"

import React, { useState, ReactNode } from 'react';
import TextHighlighter from './TextHighlighter';
import { Undo2, Redo2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

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

const AnnotateText: React.FC<Props> = ({ children }) => {
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
      
      // need to eventaully save the newHighlight somewhere
      console.log('Saved highlight:', newHighlight);
    },
    annotations: highlights
  };

  
  
  return (
    <div>
      <div className='p-4 max-w-lg'>
        <TextHighlighter decisionId="doc-12345" userAnnotations={annotationSystem}>
          <p className='text-2xl'>
            {children}
          </p>
        </TextHighlighter>
        <div className='mt-3 flex justify-end mr-5 gap-x-3'>
          <button>
            <Undo2 size={24} />
          </button>
          <button>
            <Redo2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnotateText;