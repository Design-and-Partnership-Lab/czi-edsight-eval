import { foo } from "@/actions/foo/foo";

export default async function Home() {
    const bar = await foo();
    console.log(bar);

    return (
        <div className="mx-auto flex w-full flex-col space-y-8 pt-16">home</div>
    );
}
