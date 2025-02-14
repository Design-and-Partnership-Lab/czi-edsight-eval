"use server"

import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const DEEPGRAM_API_KEY = "";

export class DeepgramTranscriber {
    private deepgram;
    private live: any;
    private mediaRecorder: MediaRecorder | null = null;
    private audioStream: MediaStream | null = null;
    private setTranscript: (text: string) => void;

    constructor(setTranscript: (text: string) => void) {
        this.deepgram = createClient(DEEPGRAM_API_KEY!); // Ensure API key is available
        this.setTranscript = setTranscript;
    }

    async startRecording() {
        try {
            this.audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });

            this.live = this.deepgram.listen.live({ model: "nova-3" });

            this.live.on(LiveTranscriptionEvents.Open, () => {
                console.log("Connected to Deepgram ✅");
            });

            this.live.on(LiveTranscriptionEvents.Error, (err: Error) => {
                console.error("Deepgram Error:", err);
            });

            this.live.on(LiveTranscriptionEvents.Transcript, (data: any) => {
                const transcriptText = data.channel.alternatives[0]?.transcript;
                if (transcriptText) {
                    this.setTranscript((prev) => `${prev}\n${transcriptText}`);
                }
            });

            this.mediaRecorder = new MediaRecorder(this.audioStream, { mimeType: "audio/webm" });

            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0 && this.live) {
                    this.live.send(event.data);
                }
            };

            this.mediaRecorder.start(250);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    }

    stopRecording() {
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }

        if (this.audioStream) {
            this.audioStream.getTracks().forEach((track) => track.stop());
        }

        if (this.live) {
            this.live.requestClose();
        }
    }
}
