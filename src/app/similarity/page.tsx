import React from 'react'
import SimilarityPill from '@/components/similarity-component/similarity-component';

export default function App() {
  return (
    <div className="p-8 bg-white min-h-screen space-y-6">
      <SimilarityPill
        leftText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        phrase="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        rightText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        similarity={0.15} 
      />
      <SimilarityPill
        leftText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        phrase="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        rightText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        similarity={0.3} 
      />
      <SimilarityPill
        leftText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        phrase="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        rightText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        similarity={0.45} 
      />
      <SimilarityPill
        leftText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        phrase="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        rightText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        similarity={0.6} 
      />
      <SimilarityPill
        leftText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        phrase="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        rightText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        similarity={0.75} 
      />
      <SimilarityPill
        leftText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        phrase="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        rightText="First bullet point that compares to the first bullet of the AI rationale… First bullet point that compares to the first bullet of the AI rationale…"
        similarity={0.9} 
      />
    </div>
  )
}

