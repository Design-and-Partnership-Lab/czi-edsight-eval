export default function IntroInstructions() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white border border-gray-200 p-12">
        <div className="flex items-center space-x-4 mb-8">
       
          <h1 className="text-3xl font-semibold text-gray-900">You are ready to start!</h1>
        </div>
        
        <div className="space-y-6 text-gray-700 text-m leading-relaxed mb-12">
          <p>
            You’ve now reviewed all the key instructions and understand how each part of the survey will work.
          </p>
          <ul className="ml-4 list-disc list-inside">
            <li>Take your time — you cannot revise once you submit each section.</li>
            <li>Read all materials fully before clicking Next to continue.</li>
            <li>Share your honest thoughts and reflections — your input is important!</li>
          </ul>
          <p>
            When you’re ready, click <span className="font-semibold">Start Survey</span> to begin the first reflection.
          </p>
        </div>
        
        <div className="flex justify-center">
          <button className="bg-[#001F54] hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-full transition-colors duration-200 flex items-center space-x-2">
            <span>Start Survey</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}