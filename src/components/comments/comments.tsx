"use client";
import { Card, Title, Button, Text } from "@tremor/react";
import { useState } from "react";

export default function Comment({ promptCode }: CommentProps) {
    const [response, setResponse] = useState(""); // State to hold the user's input

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-xl p-6 space-y-6 rounded-lg shadow-lg bg-white">
                <div>
                    <Title className="text-3xl text-black font-bold inline rounded">
                        {promptCode}
                    </Title>
                    <Text className="text-gray-500 mt-1">1 of 1</Text>
                </div>

                <Card className="p-2">
                    <textarea
                        className="w-full h-40 p-2 text-gray-500 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        placeholder="Type your response here..."
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                    />
                </Card>

                <div className="flex justify-center">
                    <Button
                        className="w-32 bg-blue-500 text-white hover:bg-blue-600"
                        onClick={() => alert(`Saved response: ${response}`)}
                    >
                        Save
                    </Button>
                </div>
            </Card>
        </div>
    );
}

interface CommentProps {
    promptCode: string;
}
