import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import QuestionTwo from "../components/questions/question-two";

export default async function Home() {
    return (
        <div className="mx-auto flex w-full flex-col space-y-8 pt-16">
            <SignedOut>
                <SignInButton />
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <QuestionTwo />
        </div>
    );
}
