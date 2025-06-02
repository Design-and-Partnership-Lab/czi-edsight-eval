export default function Task2Instructions() {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Task 2</h1>
          
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
            You will review the student's reflection and select the EPE category — Emerging, Progressing, or Excelling — that you believe best fits the overall quality of the response. Carefully read through the student's writing and consider how well it addresses the prompt. Once you have made your selection by clicking one of the three category buttons, the Next Activity button will become clickable, allowing you to move on to the next part of the survey. Please take your time to reflect before making your choice, as you will not be able to revise your selection afterward.
            </p>
          </div>
  
          {/* Screenshot container - you can replace the placeholder with your actual screenshot */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 text-lg">screenshot placeholder</p>
            </div>
          </div>
        </div>
      </div>
    );
  }