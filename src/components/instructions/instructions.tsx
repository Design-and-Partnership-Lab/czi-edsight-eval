import React from "react";

interface InstructionsProps {
  title: string;
  content: string;
  showNextButton?: boolean;
}

export default function Instructions({ title, content, showNextButton = true }: InstructionsProps) {
  return (
    <div className="space-y-6 p-6 text-gray-800">
      <h1 className="text-2xl font-bold text-[#001F54]">{title}</h1>
      <p className="text-md whitespace-pre-line leading-relaxed">{content}</p>
      {showNextButton && (
        <button className="rounded-3xl bg-[#001F54] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#003580]">
          Next Page →
        </button>
      )}
    </div>
  );
}