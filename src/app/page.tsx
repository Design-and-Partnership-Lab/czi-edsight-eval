import { foo } from "@/actions/foo/foo";
import QuestionTwo from "../components/questions/question-two";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default async function Home() {
    const bar = await foo();
    console.log(bar);

    return (
        <div className="mx-auto flex w-full flex-col space-y-8 pt-16">
            <SignedOut>
                <SignInButton/>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
            <QuestionTwo />
        </div>
    );
}
