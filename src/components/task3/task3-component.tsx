"use client";

import React, { useState } from "react";
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

const tabs = [
  "Openmindedness",
  "Materials",
  "Sources",
  "Innovation",
  "Reflection",
] as const;
type TabName = typeof tabs[number];

interface TabInfo {
  items?: string[];
  badgeText?: string;
  placeholder?: string;
}

const tabData: Record<TabName, TabInfo> = {
  Openmindedness: {
    items: [
      "The student mentions using their creativity to develop different timelines for their essay but does not specify the use of multiple kinds of materials or media in the creative process.",
      "The student discusses their creative approach in writing an essay and exploring different timelines, but does not mention using any specific media or materials in their process.",
      "The student explains their creative approach to the essay and how they developed different timelines, but does not specify why they chose particular materials or media for their creative expression.",
      "The student utilized timelines to creatively explore various outcomes from the trial in To Kill a Mockingbird, demonstrating a deeper understanding of the characters and the story’s themes.",
    ],
    badgeText: "Progressing",
  },
  Materials: {
    placeholder: "Content for Materials would go here.",
  },
  Sources: {
    placeholder: "Content for Sources would go here.",
  },
  Innovation: {
    placeholder: "Content for Innovation would go here.",
  },
  Reflection: {
    placeholder: "Content for Reflection would go here.",
  },
};

const TabContent: React.FC<TabInfo> = ({ items, placeholder, badgeText }) => {
  const colorMap = {
    Emerging:    'rgba(125, 210, 251, 1)',
    Progressing: 'rgba(14, 164, 232, 1)',
    Excelling:   'rgba(3, 105, 160, 1)',
  };

  const baseBadgeClasses = "mt-4 rounded-full border-2 px-4 py-1 font-semibold";
  const badgeColor = badgeText ? (colorMap as any)[badgeText] : undefined;
  const badgeStyle = badgeColor
    ? { borderColor: badgeColor, color: badgeColor }
    : undefined;

  return (
    <div>
      {items ? (
        <ul className="list-disc pl-5 text-sm text-gray-800">
          {items.map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
        </ul>
      ) : (
        <div className="italic text-gray-500">{placeholder}</div>
      )}

      {badgeText && (
        <button
          className={baseBadgeClasses}
          style={badgeStyle}
        >
          {badgeText}
        </button>
      )}
    </div>
  );
};

export default function EPEPageTask3({
  student,
  reflectionQuestion,
  reflectionResponseTranscript,
}: EPEData) {
  const [activeTab, setActiveTab] = useState<TabName>("Reflection");
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set(["Reflection"]));
  const hasScrolledThroughTabs = visitedTabs.size === tabs.length;

  const handleTabClick = (tab: TabName) => {
    setActiveTab(tab);
    setVisitedTabs((prev) => {
      const next = new Set(prev);
      next.add(tab);
      return next;
    });
  };

  const handleNext = () => {
    if (hasScrolledThroughTabs) {
      console.log("User has visited all tabs.");
      // TODO: onNext logic
    }
  };

  const headerButton = (
    <button
      onClick={handleNext}
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
                onClick={() => handleTabClick(tab)}
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

          <div className="min-h-32">
            <TabContent {...tabData[activeTab]} />
          </div>

          <div className="flex flex-col justify-between mt-6">
            <div className="pt-14 mb-4 text-sm leading-relaxed text-gray-800 font-semibold">
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
