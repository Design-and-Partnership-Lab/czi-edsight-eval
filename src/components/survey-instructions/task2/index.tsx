import Image from "next/image";

export default function Task2Instructions({
    incrementProgress,
}: {
    incrementProgress: () => void;
}) {
    return (
        <div className="p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">
                        Task 2
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
                    You will review the student&apos;s reflection and select the
                    EPE category — Emerging, Progressing, or Excelling — that
                    you believe best fits the overall quality of the response.
                    Carefully read through the student&apos;s writing and
                    consider how well it addresses the prompt. Once you have
                    made your selection by clicking one of the three category
                    buttons, the Next Activity button will become clickable,
                    allowing you to move on to the next part of the survey.
                    Please take your time to reflect before making your choice,
                    as you will not be able to revise your selection afterward.
                </p>

                <div className="flex items-center justify-center">
                    <Image
                        src="/instruction-images/task2.png"
                        alt="Task 2 Screenshot"
                        width={600}
                        height={400}
                        className="max-h-full w-3/4 max-w-full rounded-md object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
