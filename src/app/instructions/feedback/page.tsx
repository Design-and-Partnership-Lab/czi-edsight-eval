export default function FeedbackInstructions() {
    return (
      <div className="min-h-screen bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Feedback Page</h1>
          
            <p className="text-m text-gray-700 leading-relaxed mb-6">
            In this section, you will review a comparison summary showing where your insights aligned with or diverged from the Al's rationale. At the top, you'll see areas of agreement — places where both you and the Al highlighted similar strengths or challenges in the student's work. Below that, you'll see areas of disagreement — where your interpretation differed from the Al's evaluation.
            </p>
            <p className="text-m text-gray-700 leading-relaxed mb-6">
            Carefully read through these summaries to reflect on your own evaluation process and how it compared with the Al's reasoning. Once you have reviewed both sections, the Next Reflection button will become clickable, allowing you to continue to the next student reflection.
            </p>        
<div className="flex items-center justify-center">
            <img
              src="/instruction-images/feedback.png"
              alt="Feedback Screenshot"
              className="w-1/2 max-h-full max-w-full object-contain rounded-md"
            />
    </div>
        </div>
      </div>
    );
  }