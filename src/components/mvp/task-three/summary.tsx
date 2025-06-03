import { COLOR_MAP, type Category } from "@/components/mvp/lib/utils";
import { cx } from "@/lib/utils";
import { Card, Text } from "@tremor/react";
import { ArrowRightIcon } from "lucide-react";

interface SummaryProps {
    teacherEval: Category;
    aiEval: Category;
}

export function Summary({ teacherEval, aiEval }: SummaryProps) {
    return (
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
    );
}
