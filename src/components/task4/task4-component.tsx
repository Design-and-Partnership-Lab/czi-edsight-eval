"use client";

import React from "react";
import InsightAccordion from "./insight-accordion";
import InsightAccordionDiverged from "./insight-accordion-diverge";
import { Card, Title, Text } from "@tremor/react";

export default function Task4Component() {
  const aligned = [
    "Your Insight: “I can see that the student clearly mentioned that opportunities where they could improve on this assignment in the future.”",
    "AI Rationale: “The student mentioned identifying areas for improvement such as ‘creating an outline first and using more color.’”",
  ];

  const diverged = [
    {
      ai: "“The student mentioned enjoying having freedom to decide what to report on for the project.”",
      user: "“This student mentions being nervous about deciding what their subject will be while other students were happy to choose their own topics.”"
    },
    {
        ai: "“The student mentioned enjoying having freedom to decide what to report on for the project.”",
        user: "“This student mentions being nervous about deciding what their subject will be while other students were happy to choose their own topics.”"
    }
  ];
  

  return (
    <div className="flex justify-center py-12 px-4 text-black">
      <Card className="w-full max-w-5xl bg-white">
        <Title className="text-3xl font-semibold text-center mb-4">
          Let’s compare your insights to the AI Rationale!
        </Title>

        
        <div className="flex justify-center gap-6 mb-8 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-300" />
            <span className="text-sm">Your Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-200" />
            <span>AI Rationale</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-200" />
            <span>Overlap between Your Insights & AI Rationale</span>
          </div>
        </div>

        <Card className="w-full mac-w-5xl bg-gray-50 rounded-2xl border-2 mb-6">
            <Title className="text-xl font-semibold mb-4 text-center">
            Here is where your insights aligned with the AI Rationale.
            </Title>
            <InsightAccordion
            header="You both agreed that the student demonstrated growth in their reflection skills."
            insights={[aligned[0], aligned[1]]}
            />
            <InsightAccordion
            header="You both noticed that the student struggled to convey how their applied their materials skill."
            insights={[aligned[0], aligned[1]]}
            />
        </Card>

        <Card className="w-full mac-w-5xl bg-gray-50 rounded-2xl border-2">
            <Title className="text-xl font-semibold mb-4 text-center">
            Here is where your insights diverged from the AI Rationale.
            </Title>
            <InsightAccordionDiverged
            header="While the AI noted that the student demonstrated open-mindedness, you pointed out that the student was talking about other students instead."
            insights={[diverged[0]]}
            />
            <InsightAccordionDiverged
            header="Where the AI commented on the student’s ability to use sources effectively, you noted room for improvement."
            insights={[diverged[1]]}
            />
        </Card>
      </Card>
    </div>
  );
}
