import React from 'react';

export interface ProgressBarProps {
  totalSteps?: number;
  currentStep: number;
  activeColor?: string;
  inactiveColor?: string;
  circleSize?: number;
  connectorHeight?: number;
}

export default function ProgressBar({
  totalSteps = 3,            
  currentStep,
  activeColor = '#333',
  inactiveColor = '#ddd',
  circleSize = 16,
  connectorHeight = 4,
}: ProgressBarProps) {
  const completed = Math.min(Math.max(currentStep, 0), totalSteps);
  const circleCount = totalSteps + 1;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {Array.from({ length: circleCount }).map((_, idx) => (
        <React.Fragment key={idx}>
          {idx !== 0 && (
            <div
              style={{
                flexGrow: 1,
                height: connectorHeight,
                backgroundColor:
                  idx <= completed ? activeColor : inactiveColor,
              }}
            />
          )}
          <div
            style={{
              width: circleSize,
              height: circleSize,
              borderRadius: '50%',
              backgroundColor:
                idx <= completed ? activeColor : inactiveColor,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
