import { COLOR_MAP, type Category } from "@/components/mvp/lib/utils";
import { cx } from "@/lib/utils";
import { Card, Text } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";
import { useState } from 'react'

interface SummaryProps {
    teacherEval: Category;
    aiEval: Category;
}

export function Summary({ teacherEval, aiEval }: SummaryProps) {
    const [showInstructions, setShowInstructions] = useState(false)
    const toggleInstructions = () => {
        setShowInstructions(!showInstructions)
    }

    return (
        <div>
            <div className="flex justify-center">
                <button className="w-full mb-2 border-2 color-black" onClick={toggleInstructions}> {showInstructions ? "Click to Hide Instructions" : "Click to Show Detailed Instructions"}</button>
            </div>
            {showInstructions && (
                <p className="text-m mb-6 leading-relaxed text-gray-700">
                    You will compare your own evaluation with the AI&apos;s
                    evaluation. You will see which EPE category you chose and
                    which one the Al selected, followed by detailed Al rationale
                    across five sub-skills. Carefully read through all five
                    sub-skill tabs to understand the AI&apos;s reasoning.
                    <br />
                    Once you have reviewed everything, reflect on how your
                    annotations and judgments compare or contrast with the
                    AI&apos;s. What stood out to you? When you are ready, either
                    press the Record button to voice your thoughts or type your
                    response manually into the provided box. Please note that
                    you must read through all five sub-skills before you can
                    respond. After completing this step, the Next Activity
                    button will become clickable so you can proceed.
                </p>
            )}

            <Card className="mb-6 flex flex-col space-y-4 rounded-md bg-gray-100 ring-0 drop-shadow-md">
                <Text className="inline-flex items-center gap-x-1 text-xl font-semibold">
                    Here&apos;s what you thought{" "}
                    <ArrowRightIcon className="size-5" />{" "}
                    <span
                        className={cx("font-semibold", COLOR_MAP[teacherEval].text)}
                    >
                        {teacherEval}
                    </span>{" "}
                </Text>

                <Text className="inline-flex items-center gap-x-1 text-xl font-semibold">
                    Here&apos;s what the AI thought{" "}
                    <ArrowRightIcon className="size-5" />{" "}
                    <span className={cx("font-semibold", COLOR_MAP[aiEval].text)}>
                        {aiEval}
                    </span>
                </Text>

                <Text className="text-base">
                    Please review all five sub-skill tabs below.
                </Text>
            </Card>
        </div>
    );
}
