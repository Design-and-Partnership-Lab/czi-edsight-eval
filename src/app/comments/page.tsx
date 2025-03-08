import Comments from "@/components/comments/comments"

export default function Page() {
    const promptCode: string = "Diversity";
    return (
        <div>
            <Comments
                promptCode={promptCode}
            />
        </div>
    );
}
