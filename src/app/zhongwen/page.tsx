"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases, pinyin } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { memo, useMemo, useRef, useState } from "react";

export default function Chinese() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  const [selected, setSelected] = useState<{
    kanji: string;
    alternativeKanji: string[];
  } | null>();
  return (
    <main id="zhongwen">
      <div className="top">
        <h1>中文</h1>
        <div className="links">
          <BasicLink href="/zhongwen/list">✏️</BasicLink>
        </div>
      </div>
      <NoSSR>
        <div className="sdjhh">
          <button className="sparkle" onClick={reload}>
            ✨
          </button>
          <Phrases key={key} phrases={phrases} setSelected={setSelected} />
        </div>
        {selected && (
          <div className="selected">
            <h2 onClick={() => setSelected(null)}>{selected.kanji}</h2>
            <p>{pinyin[selected.kanji]}</p>
            <p className="alternative">
              {selected.alternativeKanji.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </p>
          </div>
        )}
      </NoSSR>
    </main>
  );
}

type PProps = {
  phrases: any[];
  setSelected: (s: { kanji; alternativeKanji }) => void;
};
const Phrases = memo(function Phrases({ phrases, setSelected }: PProps) {
  return [...phrases, ...phrases]
    .toSorted(() => (Math.random() < 0.4 ? -1 : 1))
    .map(({ label, parts }, i) => (
      <Phrase key={label + i} parts={parts} setSelected={setSelected} />
    ));
});

function Phrase({ parts, setSelected }) {
  return (
    <div className="phrase-s">
      {parts.map((part, i) => (
        <Chars part={part} key={i} setSelected={setSelected} />
      ))}
      。
    </div>
  );
}

let random = Math.floor((Date.now() / 100) * 1000);
const getRandomIndex = (arr) => arr[random++ % arr.length];

function Chars({ part, setSelected }) {
  const style = useRef({
    color: `hsl(${200 + Math.random() * 100}, 60%, 60%)`,
  });
  const kanji = getRandomIndex(part);
  const alternativeKanji = part.filter((c) => c !== kanji);
  return (
    <button
      className="chars"
      style={style.current}
      onClick={() => setSelected({ kanji, alternativeKanji })}
    >
      <span className="kanji">{kanji}</span>
      <span className="pinyin">{pinyin[kanji] || "*"}</span>
    </button>
  );
}
