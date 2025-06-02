export default function Task2Instructions() {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Task 2</h1>
            <p className="text-m text-gray-700 leading-relaxed mb-6">
            You will review the student's reflection and select the EPE category — Emerging, Progressing, or Excelling — that you believe best fits the overall quality of the response. Carefully read through the student's writing and consider how well it addresses the prompt. Once you have made your selection by clicking one of the three category buttons, the Next Activity button will become clickable, allowing you to move on to the next part of the survey. Please take your time to reflect before making your choice, as you will not be able to revise your selection afterward.
            </p>
  
            <div className="flex items-center justify-center">
            <img
              src="/instruction-images/task2.png"
              alt="Task 2 Screenshot"
              className="w-1/2 max-h-full max-w-full object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    );
  }