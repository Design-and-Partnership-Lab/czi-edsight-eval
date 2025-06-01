"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

type ProgressContextType = {
    progress: number;
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
    const [progress, setProgress] = useState(3);

    const increment = () => setProgress(3);

    return (
        <ProgressContext.Provider value={{ progress, increment }}>
            {children}
        </ProgressContext.Provider>
    );
}
