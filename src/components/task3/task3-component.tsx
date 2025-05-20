"use client";

import React, { useState, useEffect } from "react";
import EPEPageShared from "@/components/task2and3/EPEPageShared";
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
    const [activeTab, setActiveTab] = useState<string>("Reflection");
    const [hasScrolledThroughTabs, setHasScrolledThroughTabs] = useState<boolean>(false);

    const tabs: string[] = [
        "Openmindedness",
        "Materials",
        "Sources",
        "Innovation",
        "Reflection",
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
        setHasScrolledThroughTabs(true);
        }, 3000);

        return () => {
        clearTimeout(timer);
        };
    }, []);

    const getTabContent = (tab: string) => {
        switch (tab) {
        case "Openmindedness":
            return <div className="italic text-gray-500">Content for Openmindedness would go here.</div>;
        case "Materials":
            return <div className="italic text-gray-500">Content for Materials would go here.</div>;
        case "Sources":
            return <div className="italic text-gray-500">Content for Sources would go here.</div>;
        case "Innovation":
            return <div className="italic text-gray-500">Content for Innovation would go here.</div>;
        case "Reflection":
            return <div className="italic text-gray-500">Content for Reflection would go here.</div>;
        default:
            return null;
        }
    };

    const handleNextClick = () => {
        if (hasScrolledThroughTabs) {
            console.log("User has scrolled through all tabs.");
        } 
    };

    const headerButton = (
        <button
            onClick={handleNextClick}
            disabled={!hasScrolledThroughTabs}
            className={`rounded-3xl px-6 py-2 font-semibold transition-colors duration-200 focus:outline-none ${
                hasScrolledThroughTabs
                    ? "cursor-pointer bg-[#001F54] text-white"
                    : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
        >
            Next Activity →
        </button>
    );

    return (
        <div>
        <EPEPageShared
            reflectionQuestion={reflectionQuestion}
            reflectionResponseTranscript={reflectionResponseTranscript}
            headerAction={headerButton}
        >
            <div className="-mx-10 -my-10 bg-[#EDF2F7] px-8 py-7 mb-6">
                <div className="text-lg text-gray-800 font-bold mb-3">
                    Here's what you thought <span className="font-semibold text-black">→ Emerging</span>
                </div>
                <div className="text-lg text-gray-800 font-bold mb-5">
                    Here's what the AI thought <span className="font-semibold text-black">→ Excelling</span>
                </div>
                <p className="text-sm text-gray-700 font-bold">
                    Read through all five sub-skill tabs below.
                </p>
            </div>

            <div className="text-gray-800">
                <nav className="flex justify-between mb-4">
                    {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`border-b-2 px-1 pb-1 text-m font-semibold transition-colors ${
                        activeTab === tab
                            ? "text-[#25488A] border-[#25488A]"
                            : "text-[#718096] border-transparent hover:text-[#4A5568]"
                        }`}
                    >
                        {tab}
                    </button>
                    ))}
                </nav>

                <div className="min-h-32">{getTabContent(activeTab)}</div>

                <div className="flex flex-col justify-between mt-6">
                    <div className="mb-4 text-sm leading-relaxed text-gray-800 font-semibold">
                    <p>
                        Think about how your annotations compare and contrast with the AI
                        Rationale. What stood out to you? When you are ready, either press
                        the Record button to voice your thoughts or manually type into the
                        box below.
                    </p>
                    </div>

                    <div className="relative">
                    <textarea
                        className="min-h-36 w-full border border-gray-300 bg-white p-4 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="You must read through all five sub-skills before you can respond to this question."
                        disabled={!hasScrolledThroughTabs}
                    />

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
