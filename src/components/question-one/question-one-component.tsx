"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function QuestionOne() {
    const handleFeedback = (response: string) => {
        console.log(`User selected ${response}`);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white p-6 text-black">
            <div className="w-full p-6">
                <h2 className="mb-4 text-lg font-semibold text-black">
                    1. Read through the student response. Does the response
                    accurately convey the student’s experience?
                </h2>
                <div className="ml-4 flex justify-start space-x-4">
                    <button
                        className="transform p-2 text-blue-900 transition-transform hover:scale-110 hover:text-blue-700"
                        onClick={() => handleFeedback("thumbs-up")}
                    >
                        <ThumbsUp
                            size={38}
                            strokeWidth={2.5}
                        />
                    </button>
                    <button
                        className="transform p-2 text-blue-900 transition-transform hover:scale-110 hover:text-blue-700"
                        onClick={() => handleFeedback("thumbs-down")}
                    >
                        <ThumbsDown
                            size={38}
                            strokeWidth={2.5}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
