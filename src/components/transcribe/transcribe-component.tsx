"use client";

import { useState, useRef } from "react";
import { DeepgramTranscriber } from "@/actions/transcribe/action";

const LiveTranscription = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const transcriberRef = useRef<DeepgramTranscriber | null>(null);

    const handleStartStop = () => {
        if (isRecording) {
            transcriberRef.current?.stopRecording();
        } else {
            transcriberRef.current = new DeepgramTranscriber(setTranscription, setIsRecording);
            transcriberRef.current.startRecording();
        }
    };

    return (
        <div>
            <h2>Live Transcription</h2>
            <button onClick={handleStartStop}>
                {isRecording ? "Stop" : "Start"} Recording
            </button>
            <p>
                <strong>Transcription:</strong> {transcription}
            </p>
        </div>
    );
};

export default LiveTranscription;
