// all for highlight component

export interface HighlightData {
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

export interface UserAnnotationsActions {
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
  ) => void;
  annotations?: HighlightData[];
}

export interface TextHighlighterProps {
  decisionId: string;
  userAnnotations: UserAnnotationsActions;
  children?: React.ReactNode;
}

export interface HighlightColor {
  name: string;
  color: string;
  bgClass: string; // Tailwind class for background color
}

export interface XPathObject {
  startOffset: number;
  endOffset: number;
  start: string;
  end: string;
}

export interface XPathParameters {
  startOffset: number;
  endOffset: number;
  startContainer: string;
  endContainer: string;
}

export interface Annotation {
  id: string;
  text: string;
  color: string;
  colorName: string;
  comment: string;
}
