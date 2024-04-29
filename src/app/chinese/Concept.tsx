"use client";

import { useState, useRef } from "react";
import "./style.css";
import * as struct from "./sentenceStructures";

const pickRandomIdx = (array) => Math.floor(Math.random() * array.length);

export default function Concept({ words, children }) {
  const [idx, setIdx] = useState(pickRandomIdx(words));
  const style = useRef({
    color: `hsl(${200 + Math.floor(Math.random() * 60)}, 50%, 50%)`,
  });
  const incrementWithLooping = (idx) => (idx + 1) % words.length;
  return (
    <div className="one">
      <span
        className={words.length < 2 ? "unique" : ""}
        style={style.current}
        onClick={() => setIdx(incrementWithLooping)}
      >
        {words[idx].kanji}
      </span>
      <span className="pinyin" style={{ fontSize: "0.5em" }}>
        {words[idx].pinyin}
      </span>
      {children}
    </div>
  );
}
