import { useCallback, useEffect, useRef, useState } from "react";
import { delay } from "../../utils";

export default function useMicrophone() {
  const [state, setState] = useState<
    "inactive" | "recording" | "paused" | "not-allowed"
  >("inactive");
  const alreadyRequested = useRef(false);
  const recorder = useRef<MediaRecorder>();
  const [blob, setBlob] = useState<Blob>();
  const [audioUrl, setAudioUrl] = useState<string>();
  const revokeUrl = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(undefined);
  };
  const updateState = () => {
    if (recorder.current) {
      setState(recorder.current.state);
    }
  };

  useEffect(() => {
    if (alreadyRequested.current) {
      return;
    }
    if (!("mediaDevices" in navigator)) {
      setState("not-allowed");
      return;
    }
    alreadyRequested.current = true;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recorder.current = new MediaRecorder(stream);
        setState(recorder.current.state);
        const chunks: Blob[] = [];
        recorder.current.ondataavailable = (e) => {
          chunks.push(e.data);
        };
        recorder.current.onstop = (e) => {
          const blob = new Blob(chunks, {
            type: "audio/ogg; codecs=opus",
          });
          chunks.splice(0);
          setBlob(blob);
          setAudioUrl(URL.createObjectURL(blob));
        };
      })
      .catch((err) => {
        if (err instanceof DOMException) {
          setState("not-allowed");
        } else {
          throw err;
        }
      });
    () => {
      recorder.current = undefined;
      revokeUrl();
    };
  }, []);
  const reset = async () => {
    updateState();
    setBlob(undefined);
    revokeUrl();
  };
  const start = async () => {
    if (recorder.current?.state === "inactive") {
      revokeUrl();
      await delay(50);
      recorder.current?.start();
    }
    updateState();
  };
  const stop = async () => {
    if (recorder.current?.state === "recording") {
      recorder.current.stop();
    }
    updateState();
  };
  return {
    audioUrl,
    blob,
    state,
    stop: useCallback(stop, [recorder]),
    start: useCallback(start, [recorder]),
    reset: useCallback(reset, [recorder]),
    isRecording: state === "recording",
    isInactive: state === "inactive",
    isNotAllowed: state === "not-allowed",
  };
}
