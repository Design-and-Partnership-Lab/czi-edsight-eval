import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/tremor/Accordion";

interface InsightAccordionProps {
    header: string;
    insights: { ai: string; user: string }[]; // updated to expect structured insight data
}

export default function InsightAccordionDiverged({
    header,
    insights,
}: InsightAccordionProps) {
    return (
        <Accordion type="multiple">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <span className="text-left text-lg text-black">
                        {header}
                    </span>
                </AccordionTrigger>

                <AccordionContent>
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
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
