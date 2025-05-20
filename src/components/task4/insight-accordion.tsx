"use client";

import React, { useState } from "react";

interface InsightAccordionProps {
  header: string;
  insights: string[];
}

export default function InsightAccordion({ header, insights }: InsightAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left px-8 py-5 flex justify-between items-center"
        // className="w-full bg-gray-100 text-left px-8 py-5 rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-200 transition"

      >
        <span className="text-black px-3">{header}</span>
        <span className="text-xl text-black">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="px-20 space-y-3">
          {insights.map((text, idx) => (
            <li key={idx} className="text-sm text-black leading-relaxed">
              {text}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

//flex justify-between items-center