import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { Card, Title } from "@tremor/react";
import { CheckIcon } from "lucide-react";

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
        redirect("/sign-in");
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

                        {/* TODO: Add an x icon if not complete */}
                        <CheckIcon className="text-green-500" />
                    </Card>
                </Link>
            ))}
        </div>
    );
}
