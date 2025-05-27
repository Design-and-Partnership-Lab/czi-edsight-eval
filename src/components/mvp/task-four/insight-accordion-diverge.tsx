import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionList,
} from "@tremor/react";

interface InsightAccordionProps {
    header: string;
    insights: { ai: string; user: string }[];
}

export default function InsightAccordionDiverged({
    header,
    insights,
}: InsightAccordionProps) {
    return (
        <AccordionList>
            <Accordion className="rounded-xl">
                <AccordionHeader>
                    <span className="text-ee-black text-left text-lg">
                        {header}
                    </span>
                </AccordionHeader>

                <AccordionBody>
                    <div className="space-y-6">
                        {insights.map((item, idx) => (
                            <div
                                key={idx}
                                className="text-ee-black flex justify-between gap-6 px-12 py-4"
                            >
                                <div className="w-1/2">
                                    <p className="leading-relaxed">
                                        <span>AI Rationale: </span>
                                        {item.ai}
                                    </p>
                                </div>

                                {/* Divider line */}
                                <div className="w-px bg-gray-300" />

                                <div className="w-1/2">
                                    <p className="leading-relaxed">
                                        <span>Your Insight: </span>
                                        {item.user}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </AccordionBody>
            </Accordion>
        </AccordionList>
    );
}
