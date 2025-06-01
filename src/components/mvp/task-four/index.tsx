"use client";

import { useEffect, useState } from "react";
import { ResponseType } from "@/app/api/chat/route";
import { Skeleton } from "@/components/ui/skeleton";
import { Title } from "@tremor/react";

export function TaskFour() {
    const [result, setResult] = useState<ResponseType>();

    useEffect(() => {
        const fetchComparison = async () => {
            try {
                const testData = {
                    statementPairs: [
                        {
                            statementA:
                                "I can see that the student clearly mentioned that opportunities where they could improve on this assignment in the future.",
                            statementB:
                                "The student mentioned identifying areas for improvement such as 'creating an outline first and using more color.'",
                        },
                    ],
                };

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(testData),
                });

                const data = await response.json();
                setResult(data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchComparison();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center gap-y-6 text-ee-black">
            <Title className="text-center text-3xl font-semibold">
                Let's compare your insights to the AI Rationale!
            </Title>

            <div className="w-full space-y-10 rounded-2xl border border-neutral-300 bg-neutral-100 px-10 py-6">
                <Title className="mb-4 text-center text-xl font-semibold">
                    Here is where your insights aligned with the AI Rationale.
                </Title>

                <div className="px-20 pb-4">
                    {result?.comparisons[0]?.result?.similarities || (
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    )}
                </div>
            </div>

            <div className="w-full space-y-10 rounded-2xl border border-neutral-300 bg-neutral-100 px-10 py-6">
                <Title className="mb-4 text-center text-xl font-semibold">
                    Here is where your insights diverged from the AI Rationale.
                </Title>

                <div className="px-20 pb-4">
                    {result?.comparisons[0]?.result?.differences || (
                        <Skeleton className="h-[20px] w-[100px] rounded-full" />
                    )}
                </div>
            </div>
        </div>
    );
}
