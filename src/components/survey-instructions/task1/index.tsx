export default function Task1Instructions({
    incrementProgress,
}: {
    incrementProgress: () => void;
}) {
    return (
        <div className="p-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="mb-8 text-4xl font-bold text-gray-900">
                        Task 1
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
                    You will read a prompt followed by a student's written
                    response. Your task is to carefully review the response and
                    highlight parts that stand out to you — this could include
                    sections you find important, interesting, or particularly
                    well-phrased, as well as areas that raise questions or seem
                    unclear. Once you click the "Start Annotating" button, you
                    will be able to highlight directly on the text. Please note
                    that you will not be able to revise or undo your highlights
                    once they are made, so take your time reading through the
                    response before beginning. When you are finished selecting
                    your highlights, click "Stop Annotating" to save your
                    selections and move on. Once the activity is complete, the
                    Next Activity button will become clickable, allowing you to
                    move forward in the survey.
                </p>
                <div className="flex items-center justify-center">
                    <img
                        src="/instruction-images/task1.png"
                        alt="Task 1 Screenshot"
                        className="max-h-full w-1/2 max-w-full rounded-md object-contain"
                    />
                </div>
            </div>
        </div>
    );
}
