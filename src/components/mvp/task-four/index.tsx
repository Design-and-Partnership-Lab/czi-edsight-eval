"use client";

import { useEffect } from "react";
import { ResponseType } from "@/app/api/chat/route";
import { Title } from "@tremor/react";
import { Loader2Icon } from "lucide-react";


export function TaskFour({
    result,
    setResult,
    setEval,
    aiReflectionRationale,
    teacherAnnotations,
    reflectionResponseId,
    setLoadingComparisons,
}: {
    result: ResponseType | undefined;
    setResult: (result: ResponseType | undefined) => void;
    setEval: (res: ResponseType | undefined) => Promise<void>;
    aiReflectionRationale: string;
    teacherAnnotations: string;
    reflectionResponseId: number;
    setLoadingComparisons: (loading: boolean) => void;
}) {
    useEffect(() => {
        //Should empty annotations be allowed through?
        // if(teacherAnnotations.trim().length == 0 || aiReflectionRationale.trim().length == 0) {
        //     return;
        // }

        const abortController = new AbortController()
        const fetchComparison = async () => {
            try {
                setLoadingComparisons(true);
                const testData = {
                    statementPairs: [
                        {
                            statementA: teacherAnnotations,
                            statementB: aiReflectionRationale,
                        },
                    ],
                };

                const response = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(testData),
                    signal: abortController.signal,
                });
                
                const data = await response.json();
                    
                if(!abortController.signal.aborted) {
                    setResult(data);
                    await setEval(data);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchComparison();
        return() => {
            abortController.abort()
        }
    }, [reflectionResponseId]);

    const similarities = result?.comparisons[0]?.result?.similarities;
    const differences = result?.comparisons[0]?.result?.differences;
    
    useEffect(() => {
        if(similarities && differences) {
            setLoadingComparisons(false)
        }
    }, [similarities, differences, setLoadingComparisons])

    return (
        <div className="flex flex-col items-center justify-center gap-y-6 text-ee-black">
            <Title className="text-center text-3xl font-semibold">
                Let&apos;s compare your insights to the AI Rationale!
            </Title>

            <div className="w-full space-y-10 rounded-2xl border border-neutral-300 bg-neutral-100 px-10 py-6">
                <Title className="mb-4 text-center text-xl font-semibold">
                    Here is where your insights aligned with the AI Rationale.
                </Title>

                <div className="flex items-center justify-center px-20 pb-4">
                    {similarities || (
                        <div className="flex flex-col items-center justify-center space-y-2">
                        <p>Loading comparisons, please wait...</p>
                        <Loader2Icon className="animate-spin text-ee-gray" />
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full space-y-10 rounded-2xl border border-neutral-300 bg-neutral-100 px-10 py-6">
                <Title className="mb-4 text-center text-xl font-semibold">
                    Here is where your insights diverged from the AI Rationale.
                </Title>

                <div className="flex items-center justify-center px-20 pb-4">
                    {differences || (
                        <div className="flex flex-col items-center justify-center space-y-2">
                        <p>Loading comparisons, please wait...</p>
                        <Loader2Icon className="animate-spin text-ee-gray" />
                        </div>                    
                    )}
                </div>
            </div>
        </div>
    );
}
