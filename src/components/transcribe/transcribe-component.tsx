"use client";

import { useState, useRef } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const DEEPGRAM_API_KEY = ""; // Replace with your key

const LiveTranscription = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const deepgram = createClient(DEEPGRAM_API_KEY);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const liveRef = useRef<any>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            // Initialize Deepgram Live Transcription
            const live = deepgram.listen.live({ model: "nova-3" });
            liveRef.current = live;

            live.on(LiveTranscriptionEvents.Open, () => {
                console.log("Connected to Deepgram");

                live.on(LiveTranscriptionEvents.Transcript, (data) => {
                    if (data.channel?.alternatives[0]?.transcript) {
                        setTranscription((prev) => prev + " " + data.channel.alternatives[0].transcript);
                    }
                });
            });

            mediaRecorder.ondataavailable = async (event) => {
                if (event.data.size > 0 && liveRef.current) {
                    liveRef.current.send(event.data);
                }
            };

            mediaRecorder.start(500);
            setIsRecording(true);
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
        }
        if (liveRef.current) {
            liveRef.current.requestClose();
        }
        setIsRecording(false);
    };

    return (
        <div>
            <h2>Live Transcription</h2>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop" : "Start"} Recording
            </button>
            <p><strong>Transcription:</strong> {transcription}</p>
        </div>
    );
};

export default LiveTranscription;
