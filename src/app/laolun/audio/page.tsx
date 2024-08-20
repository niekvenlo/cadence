"use client";

import { hskChars, hskWords, duolingo, sheetList } from "./data";
import "../style.css";

import useLaolunQuery from "../../api/useLaolunQuery";
import { useEffect, useRef, useState } from "react";

export default function Chinese() {
  const laolunQuery = useLaolunQuery();
  const phrases = laolunQuery.data?.phrases ?? [];

  return (
    <main id="zhongwen">
      <Aud />
    </main>
  );
}

const Aud = () => {
  const [isAllowed, setIsAllowed] = useState(false);
  const recorder = useRef<MediaRecorder | undefined>();
  const chunks = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>();
  useEffect(() => {
    if (!navigator.mediaDevices) {
      console.log("ffuck");
      return;
    }
    if (!isAllowed) {
      return;
    }
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      recorder.current = new MediaRecorder(stream);
      recorder.current.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };
      recorder.current.onstop = (e) => {
        const blob = new Blob(chunks.current, {
          type: "audio/ogg; codecs=opus",
        });
        chunks.current = [];
        setAudioUrl(URL.createObjectURL(blob));
      };
    });
  }, [isAllowed]);

  if (!isAllowed) {
    return (
      <button onClick={() => setIsAllowed(true)}>
        Request microphone permissions
      </button>
    );
  }
  return (
    <div>
      Allowed
      <button onClick={() => recorder.current?.start()}>Start</button>
      <button onClick={() => recorder.current?.stop()}>Stop</button>
      <a href={audioUrl} target="_blank">
        Listen
      </a>
    </div>
  );
};
