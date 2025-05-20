import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <div className="flex items-center justify-between border-b-2 border-opacity-50 px-3 py-4 drop-shadow-md">
            <h1 className="text-xl font-bold">EdSight Eval</h1>

            <div className="h-7 min-h-7">
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    );
}
