import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const NEXT_PUBLIC_DEEPGRAM_KEY = process.env.NEXT_PUBLIC_DEEPGRAM_KEY;

if (!NEXT_PUBLIC_DEEPGRAM_KEY) {
    throw new Error("Deepgram API key is missing in environment variables.");
}

interface DeepgramTranscriptData {
    channel: {
        alternatives: {
            transcript: string;
        }[];
    };
}

export class DeepgramTranscriber {
    private deepgram = createClient(NEXT_PUBLIC_DEEPGRAM_KEY);
    private live: any = null;
    private mediaRecorder: MediaRecorder | null = null;
    private setTranscription: (text: string) => void;
    private setIsRecording: (status: boolean) => void;
    private currentTranscription: string = "";

    constructor(setTranscription: (text: string) => void, setIsRecording: (status: boolean) => void) {
        this.setTranscription = setTranscription;
        this.setIsRecording = setIsRecording;
    }


    async startRecording() {
        try {
            console.log("Requesting microphone access...");
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.mediaRecorder = new MediaRecorder(stream);

            console.log("Connecting to Deepgram...");
            this.live = this.deepgram.listen.live({ model: "nova-3" });

            this.live.on(LiveTranscriptionEvents.Transcript, (data: DeepgramTranscriptData) => {
                const newTranscript = data.channel?.alternatives[0]?.transcript;
                if (newTranscript) {
                    this.currentTranscription += ` ${newTranscript}`;
                    this.setTranscription(this.currentTranscription.trim());
                }
            });

            this.live.on(LiveTranscriptionEvents.Error, (error: any) => {
                console.error("Deepgram WebSocket Error:", error);
            });

            this.live.on(LiveTranscriptionEvents.Close, (event: any) => {
                console.warn("Deepgram WebSocket closed:", event);
            });

            this.mediaRecorder.ondataavailable = async (event) => {
                if (event.data.size > 0 && this.live) {
                    this.live.send(event.data);
                }
            };

            this.mediaRecorder.start(500);
            this.setIsRecording(true);
        } catch (error) {
            console.error("Error starting recording:", error);
        }
    }

    stopRecording() {
        console.log("Stopping recording...");
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
        }
        if (this.live) {
            console.log("Closing Deepgram WebSocket...");
            this.live.requestClose();
        }
        this.setIsRecording(false);
    }

    clearRecording() {
        console.log("Clearing current recording transcription...");
        this.currentTranscription = "";
        this.setTranscription("");
    }
}
