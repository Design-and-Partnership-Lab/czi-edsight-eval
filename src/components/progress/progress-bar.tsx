import React from "react";

export interface ProgressBarProps {
    totalSteps?: number;
    currentStep: number;
    activeColor?: string;
    inactiveColor?: string;
    circleSize?: number;
    connectorHeight?: number;
}

const Circle = ({
    isCompleted,
    size,
    activeColor,
    inactiveColor,
}: {
    isCompleted: boolean;
    size: number;
    activeColor: string;
    inactiveColor: string;
}) => (
    <div
        style={{
            width: size,
            height: size,
            borderRadius: "50%",
            backgroundColor: isCompleted ? activeColor : inactiveColor,
        }}
    />
);

const Connector = ({
    isCompleted,
    height,
    activeColor,
    inactiveColor,
}: {
    isCompleted: boolean;
    height: number;
    activeColor: string;
    inactiveColor: string;
}) => (
    <div
        style={{
            flexGrow: 1,
            height,
            backgroundColor: isCompleted ? activeColor : inactiveColor,
        }}
    />
);

export default function ProgressBar({
    totalSteps = 3,
    currentStep,
    activeColor = "#333",
    inactiveColor = "#ddd",
    circleSize = 16,
    connectorHeight = 4,
}: ProgressBarProps) {
    const completed = Math.min(Math.max(currentStep, 0), totalSteps);
    const circleCount = totalSteps + 1;

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            {Array.from({ length: circleCount }).map((_, idx) => (
                <React.Fragment key={idx}>
                    {idx !== 0 && (
                        <Connector
                            isCompleted={idx <= completed}
                            height={connectorHeight}
                            activeColor={activeColor}
                            inactiveColor={inactiveColor}
                        />
                    )}
                    <Circle
                        isCompleted={idx <= completed}
                        size={circleSize}
                        activeColor={activeColor}
                        inactiveColor={inactiveColor}
                    />
                </React.Fragment>
            ))}
        </div>
    );
}
