"use client";

import React, { useState } from "react";
import { createReflection } from "@/actions/(legacy)/reflection/createReflection";

const AddReflection = () => {
    const [inputs, setInputs] = useState({
        id: "",
        title: "",
        courseId: 0,
        teacherId: 0,
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]:
                name === "courseId" || name === "teacherId"
                    ? Number(value)
                    : value,
        });
    };

    return (
        <form
            className="max-w-sm space-y-4 rounded-lg bg-white p-6 text-black shadow"
            onSubmit={() => {
                createReflection(inputs);
            }}
        >
            <h2 className="mb-4 text-xl font-semibold text-black">
                Create Reflection
            </h2>

            <input
                name="id"
                placeholder="ID"
                value={inputs.id}
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            <input
                name="title"
                placeholder="Title"
                value={inputs.title}
                onChange={handleChange}
                className="w-full rounded border p-2"
            />

            <input
                name="courseId"
                placeholder="Course ID"
                value={inputs.courseId}
                onChange={handleChange}
                type="number"
                className="w-full rounded border p-2"
            />

            <input
                name="teacherId"
                placeholder="Teacher ID"
                value={inputs.teacherId}
                onChange={handleChange}
                type="number"
                className="w-full rounded border p-2"
            />

            <button
                type="submit"
                className="w-full rounded bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
};

export default AddReflection;
