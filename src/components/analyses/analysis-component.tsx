"use client";

import { useCallback, useState, useTransition } from "react";
import { writeAnalysisForTranscriptId } from "@/actions/(legacy)/analyses/action";
import { Button } from "@/components/ui/button";
import { CategoryBucket_bucket, CategoryBucket_category } from "@prisma/client";

// Define what props your component will receive
interface Analysis {
    id: number;
    category: CategoryBucket_category;
    bucket: CategoryBucket_bucket;
}

interface AnalysisComponentProps {
    analysis: Analysis[];
}

/**
 * This is a Client Component. Client components are used when we need interactivity in our components (amongst other reasons).
 *
 * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/client-components}
 */
export function AnalysisComponent({ analysis }: AnalysisComponentProps) {
    const [analyses, setAnalyses] = useState<Analysis[]>(analysis);
    const [isPending, startTransition] = useTransition();

    // Handle adding a new analysis
    const handleAddAnalysis = useCallback(() => {
        const newAnalysis = {
            reflectionResponseTranscriptId: 239868,
            category: CategoryBucket_category.CREATIVITY,
            bucket: CategoryBucket_bucket.EMERGING,
            reflectionId: "c700f8fe-de60-466f-a9b6-aeb7db3f7ec9",
            modelId: "10_01_23",
        };

        // Optimistic UI update
        startTransition(async () => {
            try {
                await writeAnalysisForTranscriptId(newAnalysis);

                // Add the new analysis to the current state
                setAnalyses((prevAnalyses) => [
                    ...prevAnalyses,
                    { id: Date.now(), ...newAnalysis },
                ]);
            } catch (error) {
                console.error("Failed to add analysis:", error);
            }
        });
    }, []);

    return (
        <div>
            <h2>Analyses List</h2>

            {analyses.length === 0 ? (
                <div>No analysis found</div>
            ) : (
                analyses.map((analysis) => (
                    <div key={analysis.id}>
                        <p>
                            <strong>Category:</strong> {analysis.category}
                        </p>
                        <p>
                            <strong>Bucket:</strong> {analysis.bucket}
                        </p>
                        <hr />
                    </div>
                ))
            )}

            <Button
                onClick={handleAddAnalysis}
                disabled={isPending}
            >
                {isPending ? "Adding..." : "Add New Analysis"}
            </Button>
        </div>
    );
}
