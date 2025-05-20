"use client";

import { type Category } from "@/components/mvp/lib/utils";

import "@/app/annotation-lexical/index.css";

import { useEffect } from "react";
import AnnotateLexical from "@/app/annotation-lexical/AnnotateLexical";

interface TaskOneProps {
    teacherEval: Category | null;
    setTeacherEval: (value: Category) => void;
    handleCanProgress: (value: boolean) => void;
}

export function TaskOne({
    teacherEval,
    setTeacherEval,
    handleCanProgress,
}: TaskOneProps) {
    useEffect(() => {
        handleCanProgress(true);
    }, [handleCanProgress]);

    return (
        <AnnotateLexical>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            venenatis eget metus id mattis. Morbi eget leo nec diam tincidunt
            viverra. Nullam molestie quam et sollicitudin bibendum. Proin
            egestas volutpat lacus, ut rhoncus ligula dignissim a. Aliquam vitae
            consectetur magna. Vestibulum volutpat interdum eros vel egestas.
            Praesent euismod orci et quam mollis, id efficitur risus bibendum.
            Vestibulum sollicitudin quam nunc, eget ullamcorper libero
            pellentesque sit amet. Nunc faucibus odio placerat nisi vestibulum,
            elementum viverra sapien elementum. Etiam vel posuere felis. Nullam
            auctor tincidunt hendrerit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
        </AnnotateLexical>
    );
}
