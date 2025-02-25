"use client";

import { useState, useEffect, useRef } from "react";
import { Card, Textarea, Button, Title } from "@tremor/react";
import { DeepgramTranscriber } from "@/actions/transcribe/action";

const QuestionThree = () => {
  const [textResponse, setTextResponse] = useState("");
  const [audioResponse, setAudioResponse] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<"audio" | "text">("text");
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcription, setTranscription] = useState(""); // Holds real-time transcription

  // Use a ref to store the transcriber instance
  const transcriberRef = useRef<DeepgramTranscriber | null>(null);

  useEffect(() => {
    let interval: number | null = null;

    if (isRecording && !isPaused) {
      interval = window.setInterval(() => {
        setRecordingTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, isPaused]);

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextResponse(event.target.value);
  };

  const handleTextSubmit = () => {
    console.log("Text Response:", textResponse);
    setTextResponse("");
  };

  const handleAudioRecording = async () => {
    setMode("audio");
    setIsRecording(true);
    setIsPaused(false);
    setRecordingTime(0);
    console.log("Started recording");

    try {
      transcriberRef.current = new DeepgramTranscriber(setTranscription, setIsRecording);
      await transcriberRef.current.startRecording();
    } catch (error) {
      console.error("Error starting Deepgram transcription:", error);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    console.log("Stopped recording");

    transcriberRef.current?.stopRecording();
    setAudioResponse(transcription);
  };

  const handlePauseRecording = () => {
    if (isPaused) {
      // Resume recording
      transcriberRef.current?.startRecording();
      setIsPaused(false);
      console.log("Resumed recording");
    } else {
      // Pause recording
      transcriberRef.current?.stopRecording();
      setIsPaused(true);
      console.log("Paused recording");
    }
  };

  const handleAudioSubmit = () => {
    console.log("Final Transcription:", audioResponse);
    setAudioResponse(null);
  };

  const handleSwitchToText = () => {
    setMode("text");
    setIsRecording(false);
    setIsPaused(false);
    console.log("Switched to text mode");
  };

  const handleClearRecording = () => {
    transcriberRef.current?.clearRecording();
    setTranscription("");
    setAudioResponse(null);
    setRecordingTime(0);
    console.log("Cleared previous recording");
  };

  return (
    <Card className="p-6 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg space-y-4">
      <Title className="text-lg text-gray-800 font-semibold">
        3. Describe your ratings in more detail. What stood out in the student response? What did you agree or disagree with from the AI Guestimate?
      </Title>
      <p className="text-gray-800">
        You may either record an audio response or write in the text field below.
      </p>

      <div className="flex space-x-4 mt-4">
        <Button
          onClick={handleAudioRecording}
          variant={mode === "audio" ? "secondary" : "primary"}
          className="px-4 py-2 text-base flex items-center space-x-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
        >
          <span>Record</span>
        </Button>
        <Button
          onClick={handleSwitchToText}
          variant={mode === "text" ? "secondary" : "primary"}
          className="px-4 py-2 text-base flex items-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
        >
          Text
        </Button>
      </div>

      {mode === "audio" && (
        <div className="w-full border rounded-lg p-4 mt-2 flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            {(isRecording || isPaused) && (
              <>
                <Button
                  variant="secondary"
                  className="flex items-center space-x-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
                  onClick={handlePauseRecording}
                >
                  <span className="text-sm">{isPaused ? "Resume" : "Pause"}</span>
                </Button>
                <Button
                  variant="secondary"
                  className="flex items-center space-x-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
                  onClick={handleStopRecording}
                >
                  <span className="text-sm">Stop</span>
                </Button>
                <Button
                  onClick={handleClearRecording}
                  variant="secondary"
                  className="flex items-center space-x-1 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
                >
                  <span className="text-sm">Clear</span>
                </Button>
                <div className="text-gray-600 text-sm">
                  {new Date(recordingTime * 1000).toISOString().substr(14, 5)}
                </div>
              </>
            )}
            {!(isRecording || isPaused) && !audioResponse && (
              <div className="text-gray-600 text-sm">Audio recording not active.</div>
            )}
          </div>

          <Textarea
            value={transcription}
            onChange={(e) => setTranscription(e.target.value)}
            placeholder="Transcription will appear here..."
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            // disabled // NOTE: Uncomment to disable editing
          />

          {!isRecording && audioResponse && (
            <Button
              onClick={handleAudioSubmit}
              variant="primary"
              className="mt-4 flex items-center px-4 py-2 text-base space-x-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
            >
              <span>Submit</span>
            </Button>
          )}
        </div>
      )}

      {mode === "text" && (
        <div className="mt-4">
          <Textarea
            value={textResponse}
            onChange={handleTextChange}
            placeholder="Enter your response here..."
            className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button
            onClick={handleTextSubmit}
            variant="primary"
            className="mt-4 flex items-center px-4 py-2 text-base space-x-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-500"
          >
            <span>Submit</span>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default QuestionThree;
