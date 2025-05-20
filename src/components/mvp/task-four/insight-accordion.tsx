import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/tremor/Accordion";

interface InsightAccordionProps {
    header: string;
    insights: string[];
}

export function InsightAccordion({ header, insights }: InsightAccordionProps) {
    return (
        <Accordion type="multiple">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    <span className="text-ee-black text-left text-lg">
                        {header}
                    </span>
                </AccordionTrigger>
                <AccordionContent>
                    <ul className="space-y-3 px-12">
                        {insights.map((text, idx) => (
                            <li
                                key={idx}
                                className="text-sm leading-relaxed text-black"
                            >
                                {text}
                            </li>
                        ))}
                    </ul>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
