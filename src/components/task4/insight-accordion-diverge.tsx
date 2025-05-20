"use client";

import React, { useState } from "react";

interface InsightAccordionProps {
  header: string;
  insights: { ai: string; user: string }[];  // updated to expect structured insight data
}

export default function InsightAccordionDiverged({ header, insights }: InsightAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-8 py-5 flex justify-between items-center"
      >
        <span className="text-black px-3">{header}</span>
        <span className="text-xl text-black">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="space-y-6 mt-2">
          {insights.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between gap-6 px-20 py-4"
            >
              <div className="w-1/2">
                <p className="text-sm leading-relaxed">
                  <span>AI Rationale: </span>{item.ai}
                </p>
              </div>

              {/* Divider line */}
              <div className="w-px bg-gray-300" />

              <div className="w-1/2">
                <p className="text-sm leading-relaxed">
                  <span>Your Insight: </span>{item.user}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
