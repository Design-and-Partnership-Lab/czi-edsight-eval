export default function Task1Instructions() {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Task 1</h1>
            <p className="text-m text-gray-700 leading-relaxed mb-6">
              You will read a prompt followed by a student's written response. Your task is to carefully review the response and highlight parts that stand out to you — this could include sections you find important, interesting, or particularly well-phrased, as well as areas that raise questions or seem unclear. Once you click the "Start Annotating" button, you will be able to highlight directly on the text. Please note that you will not be able to revise or undo your highlights once they are made, so take your time reading through the response before beginning. When you are finished selecting your highlights, click "Stop Annotating" to save your selections and move on. Once the activity is complete, the Next Activity button will become clickable, allowing you to move forward in the survey.
            </p>
          <div className="flex items-center justify-center">
            <img
              src="/instruction-images/task1.png"
              alt="Task 1 Screenshot"
              className="w-1/2 max-h-full max-w-full object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    );
  }