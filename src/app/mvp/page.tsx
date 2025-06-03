import Link from "next/link";
import { redirect } from "next/navigation";
import { getEvaluationData } from "@/actions/evaluation/action";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Card, Title } from "@tremor/react";
import { CheckIcon, CircleIcon } from "lucide-react";

const REFLECTION_RESPONSE_TRANSCRIPT_IDS = [
    "30518",
    "109270",
    "114390",
    "41318",
    "40653",
];

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/log-in");
    }

    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!email) {
        console.error("No email found for user");
        redirect("/log-in");
    }

    const completed_evaluation = await getEvaluationData(email);

    if (!completed_evaluation || "error" in completed_evaluation) {
        console.error(
            "Error fetching evaluation data: ",
            completed_evaluation.error
        );
        return <div>Error loading evaluation data.</div>;
    }

    return (
        <div className="mx-auto my-8 flex w-fit min-w-[50%] flex-col items-center justify-center space-y-8">
            <Title className="w-full border-b-2 text-left text-4xl font-semibold text-ee-gray-dark">
                Reflections to Evaluate
            </Title>

            {REFLECTION_RESPONSE_TRANSCRIPT_IDS.map((id, index) => (
                <Link
                    href={`/mvp/${id}`}
                    key={id}
                    className="w-full"
                >
                    <Card className="flex cursor-pointer flex-row items-center justify-between rounded-md bg-gray-100 drop-shadow-md transition-colors hover:bg-gray-200">
                        <span className="w-fit text-2xl font-semibold text-ee-gray-dark">
                            Reflection {index + 1}
                        </span>

                        {completed_evaluation.find(
                            (item) =>
                                item.reflection_response_id.toString() === id
                        ) != null ? (
                            <CheckIcon className="text-green-500" />
                        ) : (
                            <CircleIcon className="text-gray-400" />
                        )}
                    </Card>
                </Link>
            ))}
        </div>
    );
}
