import Comments from "@/components/comments/comments"

export default function Page() {
    const promptCode: string = "Diversity";
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <Comments
                promptCode={promptCode}
            />
        </div>
    );
}
