import { ProgressProvider } from "@/components/progress/ProgressContext";

export default function Layout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return <ProgressProvider>{children}</ProgressProvider>;
}
