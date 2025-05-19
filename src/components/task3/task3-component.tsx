"use client";

import React, { useState } from "react";
import EPEPageShared from "@/components/task2and3/EPEPageShared"; // Shared layout
import {
    ReflectionQuestion,
    ReflectionResponseTranscript,
    Student,
} from "@prisma/client";
import { Mic } from "lucide-react";

type EPEData = {
    student: Student;
    reflectionQuestion: ReflectionQuestion;
    reflectionResponseTranscript: ReflectionResponseTranscript;
};

export default function EPEPageTask3({
    student,
    reflectionQuestion,
    reflectionResponseTranscript,
}: EPEData) {
    const [activeTab, setActiveTab] = useState("Reflection");
    const [hasScrolledThroughTabs, setHasScrolledThroughTabs] = useState(false);

    const tabs = [
        "Openmindedness",
        "Materials",
        "Sources",
        "Innovation",
        "Reflection",
    ];

    // Simulate checking if user has viewed all tabs
    React.useEffect(() => {
        // In a real implementation, you'd track which tabs have been visited
        // For now, we'll enable the button after a short delay
        const timer = setTimeout(() => {
            setHasScrolledThroughTabs(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const getTabContent = (tab: string) => {
        switch (tab) {
            case "Openmindedness":
                return (
                    <div className="italic text-gray-500">
                        Content for Openmindedness would go here.
                    </div>
                );
            case "Materials":
                return (
                    <div className="italic text-gray-500">
                        Content for Materials would go here.
                    </div>
                );
            case "Sources":
                return (
                    <div className="italic text-gray-500">
                        Content for Sources would go here.
                    </div>
                );
            case "Innovation":
                return (
                    <div className="italic text-gray-500">
                        Content for Innovation would go here.
                    </div>
                );
            case "Reflection":
                return (
                    <div className="italic text-gray-500">
                        Content for Innovation would go here.
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <EPEPageShared
                reflectionQuestion={reflectionQuestion}
                reflectionResponseTranscript={reflectionResponseTranscript}
            >
                {/* RIGHT PANEL CONTENT GOES HERE */}
                <div className="space-y-6 p-6 text-gray-800">
                    {/* Summary lines */}
                    <div className="text-lg font-semibold">
                        Here's what you thought →{" "}
                        <span className="text-black-500">Emerging</span>
                    </div>
                    <div className="text-lg font-semibold">
                        Here's what the AI thought →{" "}
                        <span className="text-black-600">Excelling</span>
                    </div>

                    <div>
                        <p>Read through all five sub-skill tabs below.</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                                        activeTab === tab
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-32">{getTabContent(activeTab)}</div>

                    {/* Right Panel Content */}
                    <div className="flex flex-col justify-between p-6">
                        {/* Instructional Text */}
                        <div className="mb-4 text-sm leading-relaxed text-gray-800">
                            <p>
                                Think about how your annotations compare and
                                contrast with the AI Rationale. What stood out
                                to you? When you are ready, either press the
                                Record button to voice your thoughts or manually
                                type into the box below.
                            </p>
                        </div>

                        {/* Textarea with Record Button Below it */}
                        <div className="relative">
                            <textarea
                                className="min-h-36 w-full border border-gray-300 bg-white p-4 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                                placeholder=""
                                disabled={!hasScrolledThroughTabs}
                            />

                            {/* Record Button outside bottom-right of the box */}
                            <div className="mt-2 flex justify-end">
                                <button
                                    disabled={!hasScrolledThroughTabs}
                                    className={`flex items-center gap-1 text-sm font-medium ${
                                        hasScrolledThroughTabs
                                            ? "text-blue-600 hover:text-blue-700"
                                            : "cursor-not-allowed text-gray-400"
                                    }`}
                                >
                                    <Mic size={16} />
                                    Record
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </EPEPageShared>
        </div>
    );
}
