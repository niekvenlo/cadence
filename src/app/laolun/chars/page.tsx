"use client";

import { duolingo, sheetList } from "./data";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";

export default function Chinese() {
  const phrasesCharSet = new Set(
    phrases
      .map((phrase) => phrase.parts.map((part) => part.map((c) => c.split(""))))
      .flat(4)
  );
  const sheetSet = new Set(sheetList.map((p) => p.split("")).flat());

  const inLaolun = [...phrasesCharSet];
  const inSheet = [...sheetSet.difference(phrasesCharSet)];
  const inDuolingo = [...new Set(duolingo).difference(phrasesCharSet)];
  return (
    <main id="zhongwen">
      <div id="pin">
        <L list={inLaolun} title="In Laolun" />
        <L list={inDuolingo} title="Only in Duolingo" />
        <L list={inSheet} title="Only in Google Sheet" />
      </div>
    </main>
  );
}

const L = ({ title, list }) => (
  <>
    <h2>
      {title}
      <small>({list.length})</small>
    </h2>
    <div className="ddfdx">
      {list.map((d) => (
        <span key={d}>{d}</span>
      ))}
    </div>
  </>
);
