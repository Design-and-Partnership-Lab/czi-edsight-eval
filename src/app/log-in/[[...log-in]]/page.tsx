import Head from "next/head";
import { SignIn } from "@clerk/nextjs";

export default function LogInPage() {
    return (
        <>
            <Head>
                <title>Login - SkillSight Evaluations</title>
            </Head>
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="space-y-6 text-center">
                    <div>
                        <h2 className="text-xl font-semibold text-[#25488A]">
                            Welcome to
                        </h2>
                        <h1 className="text-2xl font-bold text-[#25488A]">
                            SkillSight Evaluations
                        </h1>
                    </div>
                    <div className="flex justify-center">
                        <SignIn
                            appearance={{
                                elements: {
                                    card: "shadow-none border-none p-0",
                                    cardBox: "p-5",
                                    headerTitle: "hidden",
                                    headerSubtitle: "hidden",
                                    socialButtonsBlockButton: "rounded-full",
                                    formButtonPrimary:
                                        "bg-[#25488A] text-white rounded-full hover:bg-blue-900",
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
