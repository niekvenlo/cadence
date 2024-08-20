"use client";

import "../style.css";

import useLaolunQuery from "../../api/useLaolunQuery";
import { useEffect, useRef, useState } from "react";
import useLaolunAudioUploadMutation from "../../api/useLaolunAudioUploadMutation";

function getWeightedRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  const get1 = () => Math.floor(Math.random() * arr.length);
  return arr[Math.max(get1(), get1())];
}

export default function Chinese() {
  const laolunQuery = useLaolunQuery();
  const phrases = laolunQuery.data?.phrases ?? [];

  const getPhraseText = () => {
    const randomPhrase = getWeightedRandomElement(phrases);
    if (!randomPhrase) {
      return "";
    }
    const text = randomPhrase.parts
      .map((segment) => segment[Math.floor(Math.random() * segment.length)])
      .join("");
    return text;
  };

  const [isAllowed, setIsAllowed] = useState(false);
  const [phraseText = "", setPhraseText] = useState<string>();

  useEffect(() => {
    setPhraseText(getPhraseText());
  }, [phrases]);

  if (!isAllowed) {
    return (
      <main id="zhongwen">
        <button onClick={() => setIsAllowed(true)}>
          Request microphone permissions
        </button>
      </main>
    );
  }
  return (
    <main id="zhongwen">
      <div style={{ fontSize: "2em", marginBlock: "2em" }}>{phraseText}</div>
      <Aud
        title={phraseText}
        requestNew={() => setPhraseText(getPhraseText())}
      />
    </main>
  );
}

const Aud = ({
  title,
  requestNew,
}: {
  title: string;
  requestNew: () => void;
}) => {
  const uploadMutation = useLaolunAudioUploadMutation();

  const alreadyRequested = useRef(false);
  const recorder = useRef<MediaRecorder | undefined>();
  const chunks = useRef<Blob[]>([]);
  const [audioUrl, setAudioUrl] = useState<string>();

  const upload = () => {
    const blob = new Blob(chunks.current, {
      type: "audio/ogg; codecs=opus",
    });
    uploadMutation.mutate(
      { title, blob },
      {
        onSettled: () => {
          reset();
          requestNew();
        },
      }
    );
  };

  const reset = () => {
    chunks.current = [];
    setAudioUrl(undefined);
  };

  const getNewStuff = () => {
    reset();
    requestNew();
  };

  useEffect(() => {
    if (!navigator.mediaDevices) {
      console.log("ffuck");
      return;
    }
    if (alreadyRequested.current) {
      return;
    }
    alreadyRequested.current = true;
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
  }, []);

  useEffect(() => {
    const startRecorder = (e) => {
      if (
        !recorder.current ||
        e.code !== "Space" ||
        recorder.current?.state === "recording"
      ) {
        return;
      }
      recorder.current?.start();
    };
    const stopRecorder = (e) => {
      if (
        !recorder.current ||
        e.code !== "Space" ||
        recorder.current?.state !== "recording"
      ) {
        return;
      }
      recorder.current?.stop();
    };
    document.addEventListener("keydown", startRecorder);
    document.addEventListener("keyup", stopRecorder);
    () => {
      document.removeEventListener("keydown", startRecorder);
      document.removeEventListener("keyup", stopRecorder);
    };
  }, []);

  return (
    <div className="audiorecorder">
      <button onClick={getNewStuff}>New phrase</button>
      {!audioUrl && (
        <>
          <span> </span>
          <span>Hold down Space to record this phrase. Release when done.</span>
          <span> </span>
        </>
      )}
      {audioUrl && (
        <>
          <a href={audioUrl} target="_blank">
            Listen
          </a>
          <button onClick={reset}>Discard</button>
          {uploadMutation.isError ? (
            "Something went wrong uploading to the server"
          ) : uploadMutation.isPending ? (
            "Uploading"
          ) : (
            <button onClick={upload}>Upload recorded phrase</button>
          )}
        </>
      )}
    </div>
  );
};
