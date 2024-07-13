"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases, pinyin } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { memo, useState } from "react";
import { toShuffle } from "./util";
import Part from "./Part";
import { Accent, Accents } from "./Accents";

export default function Chinese() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  const [selected, setSelected] = useState<{
    kanji: string;
    alternativeKanji: string[];
  } | null>();
  return (
    <main id="zhongwen" onDoubleClick={() => setSelected(null)}>
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
      </NoSSR>
    </main>
  );
}

type PProps = {
  phrases: any[];
  setSelected: (s: { kanji; alternativeKanji }) => void;
};
const Phrases = memo(function Phrases({ phrases, setSelected }: PProps) {
  return toShuffle(phrases).map(({ label, parts }, i) => (
    <Phrase key={label + i} parts={parts} setSelected={setSelected} />
  ));
});

function Phrase({ parts, setSelected }) {
  return (
    <span className="phrase-s">
      {parts
        .map((part, i) => (
          <Part key={part[0] + i} part={part} setSelected={setSelected} />
        ))
        .flat()}
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
