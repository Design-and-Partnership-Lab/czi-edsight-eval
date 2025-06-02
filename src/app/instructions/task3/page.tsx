export default function Task3Instructions() {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Task 3</h1>
          
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
            You will compare your own evaluation with the Al's evaluation. You will see which EPE category you chose and which one the Al selected, followed by detailed Al rationale across five sub-skills. Carefully read through all five sub-skill tabs to understand the Al's reasoning.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Once you have reviewed everything, reflect on how your annotations and judgments compare or contrast with the Al's. What stood out to you? When you are ready, either press the Record button to voice your thoughts or type your response manually into the provided box. Please note that you must read through all five sub-skills before you can respond. After completing this step, the Next Activity button will become clickable so you can proceed.            </p>
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