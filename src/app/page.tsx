import { foo } from "@/actions/foo/foo";
import AnnotateText from "@/components/annotate/AnnotateText";
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
            <AnnotateText>
                Lorem ipsum odor amet, consectetuer adipiscing elit. Risus tristique vitae convallis augue dapibus erat dis. Pulvinar congue efficitur turpis convallis pulvinar ultrices tempus habitant. Interdum nisi blandit risus leo dui. 
            </AnnotateText>
        </div>
    );
}
