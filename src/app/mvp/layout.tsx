"use client";

import ProgressBar from "@/components/progress-bar/progress-bar";
import { Button } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="mx-16 my-8">
            <div className="space-y-8 pb-8">
                <ProgressBar currentStep={1} />

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

            {children}
        </div>
    );
}
