import Image from "next/image";

export default function FeedbackInstructions({
    incrementProgress,
}: {
    incrementProgress: () => void;
}) {
    return (
        <div className="p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">
                        Feedback Page
                    </h1>
                    <div className="flex justify-center">
                        <button
                            className="flex items-center space-x-2 rounded-full bg-[#001F54] px-8 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-800"
                            onClick={incrementProgress}
                        >
                            <span>Next Page</span>
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <p className="text-m mb-6 leading-relaxed text-gray-700">
                    In this section, you will review a comparison summary
                    showing where your insights aligned with or diverged from
                    the AI&apos;s rationale. At the top, you&apos;ll see areas
                    of agreement — places where both you and the Al highlighted
                    similar strengths or challenges in the student&apos;s work.
                    Below that, you&apos;ll see areas of disagreement — where
                    your interpretation differed from the AI&apos;s evaluation.
                </p>
                <p className="text-m mb-6 leading-relaxed text-gray-700">
                    Carefully read through these summaries to reflect on your
                    own evaluation process and how it compared with the
                    AI&apos;s reasoning. Once you have reviewed both sections,
                    the Next Reflection button will become clickable, allowing
                    you to continue to the next student reflection.
                </p>
                <div className="flex items-center justify-center">
                    <Image
                        src="/instruction-images/feedback.png"
                        alt="Feedback Screenshot"
                        width={600}
                        height={400}
                        className="max-h-full w-1/2 max-w-full rounded-md object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
