export default function FeedbackInstructions() {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Feedback Page</h1>
          
          <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
            In this section, you will review a comparison summary showing where your insights aligned with or diverged from the Al's rationale. At the top, you'll see areas of agreement — places where both you and the Al highlighted similar strengths or challenges in the student's work. Below that, you'll see areas of disagreement — where your interpretation differed from the Al's evaluation.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Carefully read through these summaries to reflect on your own evaluation process and how it compared with the Al's reasoning. Once you have reviewed both sections, the Next Reflection button will become clickable, allowing you to continue to the next student reflection.
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