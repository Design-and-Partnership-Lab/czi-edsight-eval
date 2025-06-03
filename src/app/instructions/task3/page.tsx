export default function Task3Instructions() {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Task 3</h1>
          
            <p className="text-m text-gray-700 leading-relaxed mb-6">
            You will compare your own evaluation with the Al's evaluation. You will see which EPE category you chose and which one the Al selected, followed by detailed Al rationale across five sub-skills. Carefully read through all five sub-skill tabs to understand the Al's reasoning.
            </p>
            <p className="text-m text-gray-700 leading-relaxed mb-6">
            Once you have reviewed everything, reflect on how your annotations and judgments compare or contrast with the Al's. What stood out to you? When you are ready, either press the Record button to voice your thoughts or type your response manually into the provided box. Please note that you must read through all five sub-skills before you can respond. After completing this step, the Next Activity button will become clickable so you can proceed.            
            </p>
          <div className="flex items-center justify-center">
            <img
              src="/instruction-images/task3.png"
              alt="Task 3 Screenshot"
              className="w-1/2 max-h-full max-w-full object-contain rounded-md"
            />
          </div>
        </div>
      </div>
    );
  }