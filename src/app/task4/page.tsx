import Task4Component from "@/components/task4/task4-component";
import ProgressBar from "@/components/progress-bar/progress-bar";

export default function Task4Page() {
    return (
      <div className="flex flex-col h-screen justify-content-center p-16 bg-white">
        <div className="pb">
          <ProgressBar currentStep={4} />
        </div>
        <Task4Component />
      </div>
    );
  }
  
