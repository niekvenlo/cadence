"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases, pinyin } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { memo, useRef, useState } from "react";
import { Accents } from "./accents";

export default function Chinese() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  const [showTones, setShowTones] = useState(false);
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
          <button className="sparkle" onClick={() => setShowTones((t) => !t)}>
            🐦‍🔥
          </button>
          <button className="sparkle" onClick={reload}>
            ✨
          </button>
          <Phrases
            showTones={showTones}
            key={key}
            phrases={phrases}
            setSelected={setSelected}
          />
        </div>
        {selected && (
          <div className="selected" onClick={() => setSelected(null)}>
            <p className="alternative">
              {selected.alternativeKanji.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </p>
            <Accents pinyin={pinyin[selected.kanji]} />
            <h2>{selected.kanji}</h2>
            <p>{pinyin[selected.kanji]}</p>
          </div>
        )}
      </NoSSR>
    </main>
  );
}

type PProps = {
  showTones: boolean;
  phrases: any[];
  setSelected: (s: { kanji; alternativeKanji }) => void;
};
const Phrases = memo(function Phrases({
  phrases,
  showTones,
  setSelected,
}: PProps) {
  return toShuffle(phrases).map(({ label, parts }, i) => (
    <Phrase
      showTones={showTones}
      key={label + i}
      parts={parts}
      setSelected={setSelected}
    />
  ));
});

function Phrase({ parts, setSelected, showTones }) {
  const Component = showTones ? CharsWithTones : Chars;
  return (
    <div className="phrase-s">
      {parts.map((part, i) => (
        <Component part={part} key={i} setSelected={setSelected} />
      ))}
      <span className="full-stop">。</span>
    </div>
  );
}

function toShuffle(array) {
  const copy = [...array];
  let cIdx = array.length;

  // While there remain elements to shuffle...
  while (cIdx != 0) {
    // Pick a remaining element...
    let rIdx = Math.floor(Math.random() * cIdx);
    cIdx--;

    // And swap it with the current element.
    [copy[cIdx], copy[rIdx]] = [copy[rIdx], copy[cIdx]];
  }
  return copy;
}

let random = Math.floor((Date.now() / 100) * 1000);
const getRandomIndex = (arr) => arr[random++ % arr.length];

function CharsWithTones({ part, setSelected }) {
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
      <Accents pinyin={pinyin[kanji]} />
      <span className="kanji">{kanji}</span>
    </button>
  );
}
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
