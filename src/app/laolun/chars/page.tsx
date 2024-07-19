"use client";

import { duolingo, sheetList } from "./data";
import "../style.css";

import "../webcomtest";

import { phrases } from "../phrase-util-sync";

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
        <Dumb />
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

function Dumb() {
  return (
    <div hidden>
      {phrases.map((p) => (
        <chinese-phrase key={p.label} is={p.label} />
      ))}
      <br />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase
        onClick={() => console.log("d")}
        is="酒店的早饭是免费的"
      />
      <chinese-phrase
        onClick={() => console.log("d")}
        is="酒店的早饭是免费的"
      />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase
        onClick={() => console.log("d")}
        is="酒店的早饭是免费的"
      />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
      <chinese-phrase
        onClick={() => console.log("d")}
        is="酒店的早饭是免费的"
      />
      <chinese-phrase onClick={() => console.log("d")} is="不可以" />
    </div>
  );
}
