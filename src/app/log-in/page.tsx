import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export default function LogInPage() {
  return (
    <>
      <Head>
        <title>Login - SkillSight Evaluations</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-[#25488A]">Welcome to</h2>
            <h1 className="text-2xl font-bold text-[#25488A]">SkillSight Evaluations</h1>
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
                  formButtonPrimary: "bg-[#25488A] text-white rounded-full hover:bg-blue-900",
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
