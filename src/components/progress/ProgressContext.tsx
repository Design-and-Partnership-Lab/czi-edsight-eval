"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type ProgressContextType = {
    progress: number;
    setProgress: (progress: number) => void;
    increment: () => void;
};

const ProgressContext = createContext<ProgressContextType | undefined>(
    undefined
);

export function useProgress() {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error("useProgress must be used within a ProgressProvider");
    }
    return context;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState(0);

    const increment = () => setProgress((p) => p + 1);

    return (
        <ProgressContext.Provider value={{ progress, setProgress, increment }}>
            {children}
        </ProgressContext.Provider>
    );
}
