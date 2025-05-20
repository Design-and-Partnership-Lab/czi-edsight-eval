import { useState } from "react";
import { type Category } from "@/components/mvp/lib/utils";
import { Summary } from "@/components/mvp/task-three/summary";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/tremor/Tabs";
import { cx } from "@/lib/utils";
import { Text, TextInput, Title } from "@tremor/react";
import { CircleIcon } from "lucide-react";

interface TaskThreeProps {
    teacherEval: Category | null;
    aiEval: Category;
    handleCanProgress: (value: boolean) => void;
}

const tabs = [
    "Reflection",
    "Analysis",
    "Evidence",
    "Reasoning",
    "Communication",
];

interface TabContentProps {
    title: string;
    content: string;
}

const tabData: Record<string, TabContentProps> = {
    Reflection: {
        title: "Reflection Skills",
        content: "Content for reflection tab",
    },
    Analysis: {
        title: "Analysis Skills",
        content: "Content for analysis tab",
    },
    Evidence: {
        title: "Evidence Skills",
        content: "Content for evidence tab",
    },
    Reasoning: {
        title: "Reasoning Skills",
        content: "Content for reasoning tab",
    },
    Communication: {
        title: "Communication Skills",
        content: "Content for communication tab",
    },
};

export function TaskThree({
    teacherEval,
    aiEval,
    handleCanProgress,
}: TaskThreeProps) {
    const [activeTab, setActiveTab] = useState("Reflection");
    const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
        new Set(["Reflection"])
    );
    const hasScrolledThroughTabs = visitedTabs.size === tabs.length;

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
        setVisitedTabs((prev) => {
            const next = new Set(prev);
            next.add(tab);
            return next;
        });
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
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
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="flex items-center gap-x-2 text-lg font-bold"
                            >
                                {tab}
                                {visitedTabs.has(tab) ? (
                                    <CircleIcon className="fill-primary-dark text-primary-dark size-4" />
                                ) : (
                                    <CircleIcon className="size-4" />
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {tabs.map((tab) => (
                        <TabsContent
                            key={tab}
                            value={tab}
                            className="min-h-[8rem]"
                        >
                            <Title>{tabData[tab].title}</Title>
                            <Text>{tabData[tab].content}</Text>
                        </TabsContent>
                    ))}
                </Tabs>

                <div>
                    <Text className="text-ee-black mb-4 text-lg font-bold">
                        Think about how your annotations compare and contrast
                        with the AI Rationale. What stood out to you? When you
                        are ready, either press the Record button to voice your
                        thoughts or manually type into the box below.
                    </Text>

                    <TextInput
                        placeholder={
                            hasScrolledThroughTabs
                                ? "Input your response here..."
                                : "You must read through all five sub-skills before you can respond to this question."
                        }
                        disabled={!hasScrolledThroughTabs}
                        onChange={handleInput}
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
