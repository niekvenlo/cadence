"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { useState } from "react";
import { toChunk, toShuffle } from "./util";
import Part from "./Part";
import { Accent } from "./Accents";

export default function Chinese() {
  const [reload] = useReload();
  // bullshit logic
  const itemsPerChunk = Math.ceil(
    phrases.length > 150
      ? phrases.length > 100
        ? phrases.length / 5
        : phrases.length / 4
      : phrases.length / 3
  );
  const phraseChunks = toChunk(toShuffle(phrases), itemsPerChunk);
  const sparkle = (
    <button className="sparkle" onDoubleClick={reload}>
      ✨<small>{new Date().toLocaleTimeString()}</small>
    </button>
  );
  return (
    <main id="zhongwen">
      <div className="top">
        <h4>
          {Math.min(itemsPerChunk, phrases.length)} of {phrases.length} phrases
        </h4>
        <div className="links">
          <BasicLink href="/zhongwen/list">✏️</BasicLink>
        </div>
      </div>
      <NoSSR>
        <div className="sdjhh">
          {phraseChunks.map((chunk) => (
            <Chunk chunk={chunk} sparkle={sparkle} />
          ))}
        </div>
      </NoSSR>
    </main>
  );
}

function Chunk({ chunk, sparkle }) {
  return (
    <>
      {sparkle}
      {chunk.map(({ label, parts }, i) => (
        <span className="phrase-s" key={label + i}>
          {parts.map((part, i) => (
            <Part key={part[0] + i} part={part} />
          ))}
          <span className="part">
            <span className="full-stop char">
              <span className="pinyin"></span>
              <span className="tone">{<Accent />}</span>
              <span className="kanji">。</span>
            </span>
          </span>
        </span>
      ))}
    </>
  );
}

function useReload() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  return [reload, key] as const;
}
