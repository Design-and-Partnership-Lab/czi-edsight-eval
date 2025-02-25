"use client";

import { upsertReflectionResponse } from "@/actions/rr/reflectionresponse";
import { UserFeedback_category } from "@prisma/client";

interface Feedback {
    agree: boolean;
    reflectionId: string;
    studentId: number;
    category: UserFeedback_category;
    teacherEmail: string;
}

export const ToggleAgreeButton = ({ feedback }: { feedback: Feedback }) => {
    return (
        <button
            className="btn btn-primary bg-white text-black"
            onClick={() => {
                upsertReflectionResponse({
                    ...feedback,
                    agree: !feedback.agree,
                });
            }}
        >
            Toggle agree
        </button>
    );
};
