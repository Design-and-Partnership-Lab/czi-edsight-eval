import ProgressBar from '@/components/progress-bar/progress-bar';
import React from 'react';

export default function Home() {
  return (
    <div className="p-8 bg-white min-h-screen flex flex-col gap-6">
      <ProgressBar currentStep={1} />
      <ProgressBar currentStep={2} />
      <ProgressBar currentStep={3} />
    </div>
  );
}
