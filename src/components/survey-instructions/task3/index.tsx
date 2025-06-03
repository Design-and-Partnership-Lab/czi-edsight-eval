export default function Task3Instructions({
    incrementProgress,
}: {
    incrementProgress: () => void;
}) {
    return (
        <div className="p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">
                        Task 3
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
                    You will compare your own evaluation with the Al's
                    evaluation. You will see which EPE category you chose and
                    which one the Al selected, followed by detailed Al rationale
                    across five sub-skills. Carefully read through all five
                    sub-skill tabs to understand the Al's reasoning.
                </p>
                <p className="text-m mb-6 leading-relaxed text-gray-700">
                    Once you have reviewed everything, reflect on how your
                    annotations and judgments compare or contrast with the Al's.
                    What stood out to you? When you are ready, either press the
                    Record button to voice your thoughts or type your response
                    manually into the provided box. Please note that you must
                    read through all five sub-skills before you can respond.
                    After completing this step, the Next Activity button will
                    become clickable so you can proceed.
                </p>
                <div className="flex items-center justify-center">
                    <img
                        src="/instruction-images/task3.png"
                        alt="Task 3 Screenshot"
                        className="max-h-full w-1/2 max-w-full rounded-md object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
