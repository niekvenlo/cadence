"use client";

import "./style.css";

import type { Phrase } from "./phrase-util-sync";

import { phrases } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { CSSProperties, useState } from "react";
import { toChunk, toShuffle } from "./util";
import Part from "./Part";
import { Accent } from "./Accents";
import { writePhrase } from "./phrase-actions-async";

export default function Chinese() {
  const [fontSize, setFontSize] = useState(12);
  const [serifFont, setSerifFont] = useState(true);
  const [reload] = useReload();
  const itemsPerChunk = 25;
  const phrasesWithFocusedLearning = [
    ...phrases,
    ...phrases.filter((p) => p.isFocusedLearning),
  ];
  const phraseChunks = toChunk(
    [
      ...toShuffle(phrasesWithFocusedLearning),
      ...toShuffle(phrasesWithFocusedLearning),
    ],
    itemsPerChunk
  );
  phraseChunks[0].unshift({ label: "捞论一片肃穆", parts: [["捞论一片肃穆"]] });

  return (
    <main
      id="zhongwen"
      style={
        {
          fontSize: `${fontSize}px`,
          "--chinese-font-source": serifFont
            ? "var(--chinese-font-source)"
            : undefined,
        } as CSSProperties
      }
    >
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
        <label>
          <input
            type="checkbox"
            id="font-size"
            value={fontSize}
            onChange={() => setFontSize((x) => (x === 12 ? 16 : 12))}
          />
          Font size
        </label>
        <label>
          <input
            type="checkbox"
            value={fontSize}
            onChange={() => setSerifFont((x) => !x)}
          />
          Serif font
        </label>
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
      {chunk.map(
        ({ label, parts, isFocusedLearning, isValidateGrammar }, i) => {
          return (
            <span className="phrase-s" key={label + i}>
              {parts.map((part, i) => (
                <Part
                  key={part[0] + i}
                  part={part}
                  label={label}
                  isFocusedLearning={isFocusedLearning}
                  isValidateGrammar={isValidateGrammar}
                />
              ))}
              <span className="part">
                <span className="full-stop char">
                  <span className="pinyin"></span>
                  <span className="tone">{<Accent />}</span>
                  <span className="kanji">。</span>
                </span>
              </span>
            </span>
          );
        }
      )}
    </div>
  );
}

function useReload() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  return [reload, key] as const;
}
