"use client";

import NoSSR from "../components/NoSSR";
import { useState, useRef } from "react";
import "./style.css";

import { sentenceStructures } from "./sentenceStructures";

const pickRandomIdx = (array) => Math.floor(Math.random() * array.length);

function SentenceStructure({ components }: any) {
  return (
    <div className="sentence">
      {components.map((component, i) => (
        <ShowOne key={i} words={component} />
      ))}
    </div>
  );
}

function ShowOne({ words }) {
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
    </div>
  );
}

export default function Chinese() {
  const [idx, setIdx] = useState(0);
  return (
    <NoSSR>
      <main style={{ fontSize: "3em" }}>
        <button onClick={() => setIdx((x) => x + 1)}>Randomize</button>
        <SentenceStructure
          key={idx}
          components={sentenceStructures[pickRandomIdx(sentenceStructures)]}
        />
        <br />
        {sentenceStructures.map((sentenceStructure, i) => (
          <SentenceStructure key={i} components={sentenceStructure} />
        ))}
      </main>
    </NoSSR>
  );
}
