"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  Title,
} from "@tremor/react";

export default function InsightsPage() {
  const [annotatedText, setAnnotatedText] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const savedText = localStorage.getItem("annotatedText");
    if (savedText) {
      setAnnotatedText(savedText);
    }
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="p-10">
        <div className="max-w-4xl mx-auto">
          <Title className="text-blue-800 font-semibold text-xl mb-4">
            You have unlocked new insights from these annotations!
          </Title>

          <Card>
            <div className="bg-gray-100 border border-gray-300">
              <div
                className="bg-white cursor-pointer flex items-center gap-2 p-4"
                onClick={toggleAccordion}
              >
                <span
                  className={`transition-transform duration-300 text-lg ${isOpen ? "rotate-90" : "rotate-0"
                    }`}
                >
                  &gt;
                </span>
                <Text className="bg-white font-semibold">Response</Text>
              </div>

              {isOpen && (
                <div className="bg-white px-4 pb-4 text-base leading-7 text-gray-800">
                  <div dangerouslySetInnerHTML={{ __html: annotatedText }} />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
