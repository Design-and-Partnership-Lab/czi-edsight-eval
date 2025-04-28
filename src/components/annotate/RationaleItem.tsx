import { useState } from "react";
import { Highlighter } from "lucide-react";

type RationaleItemProps = {
    title: string;
    status: string;
    points: string[];
    colorText: string;
    color: { name: string; bgClass: string; colorValue: string };
    selectedColor?: { name: string; bgClass: string; colorValue: string };
    setSelectedColor?: (color: { name: string; bgClass: string; colorValue: string }) => void;
};

export function RationaleItem({
    title,
    status,
    points,
    colorText,
    color,
    selectedColor,
    setSelectedColor,
}: RationaleItemProps) {

    const handleColorChange = (color: { name: string; bgClass: string; colorValue: string }) => {
        if (setSelectedColor) {
            setSelectedColor(color);
        }
    }

    const isSelected = selectedColor && selectedColor.name === color.name;

    return (
        <div
            className={`${isSelected ? "bg-neutral-100" : "hover:bg-gray-50"} cursor-pointer rounded-lg border p-4`}
            onClick={() => handleColorChange(color)}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Highlighter className={`${colorText}`} size={38}/>
                    <span className="text-xl font-semibold">{title}</span>
                </div>
                <span className={`${isSelected ? "rounded-full border border-transparent bg-neutral-700 px-3 py-1 text-sm text-white" : "rounded-full border border-neutral-300 px-3 py-1 text-sm text-neutral-500"}`}>
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

export default RationaleItem;