import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8 relative">
      {/* Decorative stars in corners */}
      <div className="absolute top-8 left-8 text-yellow-400">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <div className="absolute top-8 right-8 text-yellow-400">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-8 left-8 text-yellow-400">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
      
      <div className="absolute bottom-8 right-8 text-yellow-400">
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>

      {/* Main content card */}
      <div className="max-w-4xl w-full bg-white border border-gray-200 p-12 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Thank you for completing this survey!
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            We truly appreciate the time and thought you put into each reflection and comparison. 
            Your insights are invaluable in helping us better understand how educators evaluate 
            student writing and how AI tools can be improved to support meaningful teaching and learning.
          </p>
        </div>
      </div>
    </div>
  );
}