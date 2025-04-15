import { useState } from "react";
import Image from "next/image";
import { Text } from "@tremor/react";

type RationaleItemProps = {
    title: string;
    status: string;
    points: string[];
    icon: string;         // path to unfilled icon
    filledIcon: string;   // path to filled icon
};

export default function RationaleItem({
    title,
    status,
    points,
    icon,
    filledIcon,
}: RationaleItemProps) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <div
            className="cursor-pointer rounded-lg border p-4 hover:bg-gray-50"
            onClick={() => setIsSelected(!isSelected)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Image
                        src={isSelected ? filledIcon : icon}
                        alt={`${title} icon`}
                        width={24}
                        height={24}
                    />
                    <span className="text-xl font-semibold">{title}</span>
                </div>
                <span className="rounded-full border border-blue-300 px-3 py-1 text-sm text-blue-600">
                    {status}
                </span>
            </div>
            <ul className="mt-2 list-disc pl-6 text-gray-700">
                {points.map((point, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                ))}
            </ul>
        </div>
    );
}
