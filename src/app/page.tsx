import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


export default async function Home() {
    const { userId } = await auth();
    
    if (userId) {
        redirect("/mvp");
    }

    return (
        <div className="mx-auto flex w-full flex-col space-y-8 pt-16">
            <h1>Home</h1>
        </div>
    );
}
