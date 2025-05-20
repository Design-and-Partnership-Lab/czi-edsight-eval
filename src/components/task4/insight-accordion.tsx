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
        <span className="text-black">{header}</span>
        <span className="text-xl text-gray-600">{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className=" mt-2 bg-white border border-gray-200 rounded-lg mt-2 px-6 py-4 space-y-3">
          {insights.map((text, idx) => (
            <li key={idx} className="text-sm text-gray-700 leading-relaxed">
              {text}
            </li>
          ))}
        </div>
      )}
    </div>
  );
}

//flex justify-between items-center