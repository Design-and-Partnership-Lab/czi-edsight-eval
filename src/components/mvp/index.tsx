"use client";

import { Progress } from "@/components/progress/ProgressBar";
import { Button } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

export function Mvp() {
    return (
        <div className="mx-16 my-8 space-y-8">
            <Progress />

            <div className="space-y-8 pb-8">
                <div className="flex items-center justify-between">
                    <span className="text-ee-gray text-2xl font-bold">
                        Reflection #1
                    </span>

                    <Button
                        icon={ArrowRightIcon}
                        iconPosition="right"
                        className="bg-primary-dark text-ee-white gap-x-2 rounded-full font-bold"
                    >
                        Next Activity
                    </Button>
                </div>
            </div>
        </div>
    );
}
