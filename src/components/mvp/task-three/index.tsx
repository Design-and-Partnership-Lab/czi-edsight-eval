import { useState } from "react";
import { type Category } from "@/components/mvp/lib/utils";
import { Summary } from "@/components/mvp/task-three/summary";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/tremor/Tabs";
import { SubcategoryBucket } from "@prisma/client";
import { Text, Textarea } from "@tremor/react";
import { CircleIcon } from "lucide-react";

interface TaskThreeProps {
    teacherEval: Category | null;
    aiEval: Category;
    handleCanProgress: (value: boolean) => void;
    aiRationale: SubcategoryBucket[];
    teacherFeedback: string | null;
    setTeacherFeedback: (value: string) => void;
}

const TABS = [
    "Openmindedness",
    "Sources",
    "Innovation",
    "Materials",
    "Reflection",
];

export function TaskThree({
    teacherEval,
    aiEval,
    handleCanProgress,
    aiRationale,
    teacherFeedback,
    setTeacherFeedback,
}: TaskThreeProps) {
    const [activeTab, setActiveTab] = useState("Openmindedness");
    const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
        new Set(["Openmindedness"])
    );
    const hasScrolledThroughTabs = visitedTabs.size === TABS.length;

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setVisitedTabs((prev) => {
            const next = new Set(prev);
            next.add(tab);
            return next;
        });
    };

    const handleInput = (value: string) => {
        setTeacherFeedback(value);
        handleCanProgress(!!value.length);
    };

    if (!teacherEval) {
        return "Teacher Eval was not provided.";
    }

    return (
        <>
            <Summary
                teacherEval={teacherEval}
                aiEval={aiEval}
            />

            <div>
                <Tabs
                    defaultValue={activeTab}
                    onValueChange={handleTabClick}
                >
                    <TabsList
                        variant="line"
                        className="mb-4"
                    >
                        {TABS.map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="flex items-center gap-x-2 text-lg font-bold"
                            >
                                {tab}
                                {visitedTabs.has(tab) ? (
                                    <CircleIcon className="size-4 fill-blue-500 text-blue-500" />
                                ) : (
                                    <CircleIcon className="size-4" />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {TABS.map((tab) => {
                        const rationale = aiRationale.find(
                            (r) =>
                                r.subcategory.toLowerCase() ===
                                tab.toLowerCase()
                        );

                        return (
                            <TabsContent
                                key={tab}
                                value={tab}
                                className="min-h-[8rem] pl-8 text-gray-800"
                            >
                                {rationale ? (
                                    <ul className="list-disc first-letter:uppercase">
                                        <li>{rationale.rationale}</li>
                                    </ul>
                                ) : (
                                    <p className="">
                                        No rationale available for this
                                        subcategory.
                                    </p>
                                )}
                            </TabsContent>
                        );
                    })}
                </Tabs>

                <div>
                    <Text className="text-ee-black mb-4 text-lg font-bold">
                        Think about how your annotations compare and contrast
                        with the AI Rationale. What stood out to you? When you
                        are ready, either press the Record button to voice your
                        thoughts or manually type into the box below.
                    </Text>

                    <Textarea
                        placeholder={
                            hasScrolledThroughTabs
                                ? "Input your response here..."
                                : "You must read through all five sub-skills before you can respond to this question."
                        }
                        disabled={!hasScrolledThroughTabs}
                        value={teacherFeedback ?? ""}
                        onValueChange={handleInput}
                        className="min-h-24"
                    />

                    {/* <div className="mt-2 flex justify-end">
                        <Button
                            size="xs"
                            variant="secondary"
                            icon={Mic}
                            disabled={!hasScrolledThroughTabs}
                        >
                            Record
                        </Button>
                    </div> */}
                </div>
            </div>
        </>
    );
}
