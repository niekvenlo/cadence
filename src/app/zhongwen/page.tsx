"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases, pinyin } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { useMemo, useRef, useState } from "react";

export default function Chinese() {
  const [selected, setSelected] = useState<{
    kanji: string;
    alternativeKanji: string[];
  }>();
  const memoedPhrases = useMemo(
    () =>
      phrases
        .toSorted((a, b) => (Math.random() < 0.4 ? -1 : 1))
        .map(({ label, parts }) => (
          <Phrase key={label} parts={parts} setSelected={setSelected} />
        )),
    []
  );
  return (
    <main id="zhongwen">
      <div className="top">
        <h1>Zhongwen home</h1>
        <BasicLink href="/zhongwen/list">List</BasicLink>
        <BasicLink href="/zhongwen/pinyin">Pinyin</BasicLink>
      </div>
      <NoSSR>
        <div className="sdjhh">{memoedPhrases}</div>
        {selected && (
          <div className="selected">
            <h2>{selected.kanji}</h2>
            <p>{pinyin[selected.kanji]}</p>
            <p>{selected.alternativeKanji}</p>
          </div>
        )}
      </NoSSR>
    </main>
  );
}

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
  const alternativeKanji = part.filter((c) => c !== kanji).join("―");
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
