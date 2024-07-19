"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import type { Phrase } from "./phrase-util-sync";

import { phrases } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { CSSProperties, useEffect, useState } from "react";
import { toChunk, toShuffle } from "./util";
import Part from "./Part";
import { Accent } from "./Accents";

export default function Chinese() {
  const [fontSize, setFontSize] = useState(12);
  const [reload] = useReload();
  const itemsPerChunk = 16;
  const phraseChunks = toChunk(
    [...toShuffle(phrases), ...toShuffle(phrases)],
    itemsPerChunk
  );
  phraseChunks[0].unshift({ label: "捞论一片肃穆", parts: [["捞论一片肃穆"]] });
  return (
    <main id="zhongwen" style={{ fontSize: `${fontSize}px` }}>
      <NoSSR>
        <div className="sdjhh">
          {phraseChunks.map((chunk, idx) => (
            <Chunk
              key={idx + (chunk[0][0] || idx)}
              idx={idx}
              reload={reload}
              chunk={chunk}
            />
          ))}
        </div>
        <input
          type="range"
          id="font-size"
          min="8"
          max="30"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        />
        <small>
          Based on {phrases.length} phrases | {new Date().toLocaleTimeString()}
        </small>
      </NoSSR>
    </main>
  );
}

type ChunkProps = {
  chunk: Phrase[];
  idx: number;
  reload: () => void;
};
function Chunk({ chunk, idx, reload }: ChunkProps) {
  return (
    <div className="chunk">
      <button className="sparkle" onDoubleClick={reload}>
        Page {idx + 1}✨
      </button>
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
    </div>
  );
}

function useReload() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  return [reload, key] as const;
}
