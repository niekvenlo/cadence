"use client";

import "./style.css";

import type { Phrase } from "./phrase-util-sync";

import { toChunk, toShuffle } from "./util";
import Part from "./Part";
import { Accent } from "./Accents";
import SpecialCheckbox from "./SpecialCheckbox";
import useLaolunQuery from "../api/useLaolunQuery";

export default function Chinese() {
  const laolunQuery = useLaolunQuery();
  const phrases = laolunQuery.data?.phrases ?? [];
  const pinyin = laolunQuery.data?.pinyin ?? {};

  const itemsPerChunk = 25;
  const phrasesWithFocusedLearning = [
    ...phrases,
    ...phrases.filter((p) => p.isFocusedLearning),
    ...phrases.filter((p) => p.isFocusedLearning),
  ];
  const phraseChunks = toChunk(
    [
      ...toShuffle(phrasesWithFocusedLearning),
      ...toShuffle(phrasesWithFocusedLearning),
    ],
    itemsPerChunk
  );

  return (
    <main id="zhongwen">
      <div className="sdjhh">
        {phraseChunks.map((chunk, idx) => (
          <Chunk key={idx + (chunk[0][0] || idx)} idx={idx} chunk={chunk} />
        ))}
      </div>
      <SpecialCheckbox />
      <small>
        Based on {phrases.length} phrases |{" "}
        {new Date().toLocaleTimeString("NL", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    </main>
  );
}

type ChunkProps = {
  chunk: Phrase[];
  idx: number;
};
function Chunk({ chunk, idx }: ChunkProps) {
  return (
    <div className="chunk">
      <p className="page-number">Page {idx + 1}</p>
      {chunk.map(({ label, parts }, i) => {
        return (
          <span className="phrase-s" key={label + i}>
            {parts.map((part, i) => (
              <Part key={part[0] + i} part={part} label={label} />
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
      })}
    </div>
  );
}
