import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionList,
} from "@tremor/react";

interface InsightAccordionProps {
    header: string;
    insights: string[];
}

export function InsightAccordionAlign({
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
                    <ul className="list-disc space-y-3 px-12 pb-4">
                        {insights.map((text, idx) => (
                            <li key={idx}>{text}</li>
                        ))}
                    </ul>
                </AccordionBody>
            </Accordion>
        </AccordionList>
    );
}
