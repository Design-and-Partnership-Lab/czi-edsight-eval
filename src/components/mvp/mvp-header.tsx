import { cx } from "@/lib/utils";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <div
            className={cx(
                "sticky left-0 top-0 z-50 flex w-[100dvw] items-center justify-between border-b-2 border-opacity-50 bg-white px-3 py-4 drop-shadow-md"
                // "min-w-[1264px]" // MAGIC NUMBER (min-width of body + padding on one side)
            )}
        >
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
