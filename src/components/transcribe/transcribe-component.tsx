"use client"

import React, { useState, useEffect } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const DEEPGRAM_API_KEY = ""

const LiveTranscription = () => {
    const [transcript, setTranscript] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [live, setLive] = useState<any>(null);
    let mediaRecorder: MediaRecorder | null = null;

    useEffect(() => {
        if (!isRecording) return;

        const startRecording = async () => {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);

            const deepgram = createClient(DEEPGRAM_API_KEY);
            const liveClient = deepgram.listen.live({ model: "nova-3" });
            setLive(liveClient);

            liveClient.on(LiveTranscriptionEvents.Open, () => {
                liveClient.on(LiveTranscriptionEvents.Transcript, (data) => {
                    console.log(data);
                    setTranscript((prev) => prev + " " + data.channel.alternatives[0].transcript);
                });

                mediaRecorder?.addEventListener("dataavailable", (event) => {
                    /* console.log("Audio Data Available:", event.data); */
                    if (event.data.size > 0) {
                        liveClient.send(event.data);
                    }
                });
            });



            mediaRecorder.start(250);
        };

        startRecording();

        return () => {
            mediaRecorder?.stop();
            live?.requestClose();
        };
    }, [isRecording]);

    return (
        <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-2">Live Transcription</h2>
            <button
                onClick={() => setIsRecording(!isRecording)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg mb-2"
            >
                {isRecording ? "Stop" : "Start"} Recording
            </button>
            <div className="p-2 border rounded-md min-h-[100px] bg-gray-100 mt-2">
                {transcript || "Waiting for transcription..."}
            </div>
        </div>
    );
};

export default LiveTranscription;
