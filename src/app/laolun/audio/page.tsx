"use client";

import "../style.css";

import useLaolunQuery from "../../api/useLaolunQuery";
import { useState } from "react";
import useLaolunAudioUploadMutation from "../../api/useLaolunAudioUploadMutation";
import useMicrophone from "./useMicrophone";

// Favours returning elements toward the end of the array
function getWeightedRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  const get1 = () => Math.floor(Math.random() * arr.length);
  return arr[Math.max(get1(), get1())];
}

export default function Page() {
  const laolunQuery = useLaolunQuery();
  const uploadMutation = useLaolunAudioUploadMutation();
  const {
    audioUrl,
    blob,
    isNotAllowed,
    isInactive,
    isRecording,
    reset,
    start,
    stop,
  } = useMicrophone();
  const [phraseText, setPhraseText] = useState<string>();
  const [noticeText, setNoticeText] = useState<string>();
  const [count, setCount] = useState(0);
  const loadNewPhrase = () => {
    const phrases = laolunQuery.data?.phrases;
    if (phrases === undefined) {
      return;
    }
    const samplePhrase = getWeightedRandomElement(phrases);
    if (!samplePhrase) {
      return;
    }
    const samplePhraseText = samplePhrase.parts
      .map((part) => part[Math.floor(Math.random() * part.length)])
      .join("");
    setPhraseText(samplePhraseText);
  };

  const upload = () => {
    if (!blob || !phraseText) {
      return;
    }
    uploadMutation.mutate(
      { title: phraseText, blob },
      {
        onSuccess: () => {
          reset();
          setCount((c) => c + 1);
        },
        onError: (err) => {
          setNoticeText("Upload failed. Something went wrong");
          console.error(err);
        },
      }
    );
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space") {
      start();
      e.preventDefault();
    }
  };
  const handleKeyUp = (e) => {
    if (e.code === "Space") {
      stop();
    }
    if (e.code === "Backspace") {
      reset();
    }
    if (e.code === "Enter") {
      upload();
    }
  };

  if (isNotAllowed) {
    return (
      <div>
        <h1>Recording is not allowed</h1>
        <p>
          This could be because the browser does not allow it, or because the
          user has not given permission.
        </p>
        <p>
          This site is served with <code>http</code>, not <code>https</code>,
          which limits what permissions we get by default.
        </p>
      </div>
    );
  }

  return (
    <main id="audio">
      {noticeText && <div style={{ color: "red" }}>{noticeText}</div>}
      <button
        className="audio-phrase-button"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onClick={loadNewPhrase}
      >
        {phraseText || "..."}
      </button>
      <div className="buttons">
        <button onClick={loadNewPhrase}>
          {phraseText ? "Load new phrase" : "Load phrase"}
        </button>
        <button
          onClick={start}
          disabled={isRecording || phraseText === undefined}
        >
          Start
        </button>
        <button onClick={stop} disabled={isInactive}>
          Stop
        </button>
        <button onClick={reset}>Reset</button>
        <button onClick={upload} disabled={(blob && phraseText) === undefined}>
          Upload
        </button>
      </div>
      <p>recorder is {isInactive ? "stopped" : "recording"}</p>
      {audioUrl && (
        <p>
          audio recorded
          <audio src={audioUrl} autoPlay loop />
        </p>
      )}
      <p>
        {count} succesful {count === 1 ? "upload" : "uploads"}
      </p>
    </main>
  );
}
