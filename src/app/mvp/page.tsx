import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";
import { Card, Title } from "@tremor/react";
import { CheckIcon } from "lucide-react";

const REFLECTION_IDS = ["2661ac76-5440-4dc5-8712-c4c5629ac00f"];

export default async function Page() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const reflections = await db.reflection.findMany({
        where: {
            id: {
                in: REFLECTION_IDS,
            },
        },
    });

    return (
        <div className="mx-auto my-8 flex w-fit min-w-[1000px] flex-col items-center justify-center space-y-8">
            <Title className="w-full border-b-2 text-left text-4xl font-semibold text-ee-gray-dark">
                Reflections to Evaluate
            </Title>

            {reflections.map((reflection, index) => (
                <Link
                    href={`/mvp/${reflection.id}`}
                    key={reflection.id}
                    className="w-full"
                >
                    <Card className="mb-6 flex cursor-pointer flex-row items-center justify-between rounded-md bg-gray-100 drop-shadow-md transition-colors hover:bg-gray-200">
                        <span className="w-fit text-3xl font-semibold text-ee-gray-dark">
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
