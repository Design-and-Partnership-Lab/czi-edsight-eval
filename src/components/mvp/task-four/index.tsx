import { InsightAccordion } from "@/components/mvp/task-four/insight-accordion";
import InsightAccordionDiverged from "@/components/mvp/task-four/insight-accordion-diverge";
import { Card, Title } from "@tremor/react";

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

export function TaskFour() {
    return (
        <div className="text-ee-black flex flex-col items-center justify-center gap-y-6">
            <Title className="text-center text-3xl font-semibold">
                Let's compare your insights to the AI Rationale!
            </Title>

            <div className="mb-8 flex justify-center gap-6 text-base text-gray-700">
                <div className="flex items-center gap-2">
                    <div className="size-5 rounded bg-yellow-300" />
                    <span className="">Your Insights</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="size-5 rounded bg-blue-200" />
                    <span>AI Rationale</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="size-5 rounded bg-green-200" />
                    <span>Overlap between Your Insights & AI Rationale</span>
                </div>
            </div>

            <div className="w-full space-y-10 rounded-2xl px-10 py-6 border border-neutral-300">
                <Title className="mb-4 text-center text-2xl font-semibold">
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
            </div>

            <div className="w-full space-y-10 rounded-2xl px-10 py-6 border border-neutral-300">
                <Title className="mb-4 text-center text-2xl font-semibold">
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
            </div>
        </div>
    );
}
