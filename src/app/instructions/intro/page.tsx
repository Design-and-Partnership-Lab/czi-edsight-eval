export default function IntroInstructions() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white border border-gray-200 p-12">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-[#001F54] rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-gray-900">What to Expect in the Survey</h1>
        </div>
        
        <div className="space-y-6 text-gray-700 text-m leading-relaxed mb-12">
          <p>
            In this survey, you'll be assessing a student's written reflection and compare your evaluation with AI-generated feedback. This process will give you a chance to reflect on your perspective, consider how it aligns or diverges from the AI's, and share valuable insights that support the development of more thoughtful, teacher-informed AI tools.
          </p>
          <p>
            The next few pages will walk you through each activity. Thank you for sharing your expertise—your perspective as an educator is essential to helping us design AI tools that better support teaching and learning.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button className="bg-[#001F54] hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 flex items-center space-x-2">
            <span>Next Page</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}