"use client";

import React from "react";
import { Card, Text, Title } from "@tremor/react";

import InsightAccordion from "../mvp/task-four/insight-accordion";
import InsightAccordionDiverged from "../mvp/task-four/insight-accordion-diverge";

export default function Task4Component() {
    const aligned = [
        "Your Insight: “I can see that the student clearly mentioned that opportunities where they could improve on this assignment in the future.”",
        "AI Rationale: “The student mentioned identifying areas for improvement such as ‘creating an outline first and using more color.’”",
    ];

    const diverged = [
        {
            ai: "“The student mentioned enjoying having freedom to decide what to report on for the project.”",
            user: "“This student mentions being nervous about deciding what their subject will be while other students were happy to choose their own topics.”",
        },
        {
            ai: "“The student mentioned enjoying having freedom to decide what to report on for the project.”",
            user: "“This student mentions being nervous about deciding what their subject will be while other students were happy to choose their own topics.”",
        },
    ];

    return (
        <div className="flex justify-center px-4 py-12 text-black">
            <Card className="w-full max-w-5xl bg-white">
                <Title className="mb-4 text-center text-3xl font-semibold">
                    Let’s compare your insights to the AI Rationale!
                </Title>

                <div className="mb-8 flex justify-center gap-6 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-yellow-300" />
                        <span className="text-sm">Your Insights</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-blue-200" />
                        <span>AI Rationale</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded bg-green-200" />
                        <span>
                            Overlap between Your Insights & AI Rationale
                        </span>
                    </div>
                </div>

                <Card className="mac-w-5xl mb-6 w-full rounded-2xl border-2 bg-gray-50">
                    <Title className="mb-4 text-center text-xl font-semibold">
                        Here is where your insights aligned with the AI
                        Rationale.
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

                <Card className="mac-w-5xl w-full rounded-2xl border-2 bg-gray-50">
                    <Title className="mb-4 text-center text-xl font-semibold">
                        Here is where your insights diverged from the AI
                        Rationale.
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
