"use client";

import { hsk1, hsk2, hsk3, hsk4, hsk5, duolingo, sheetList } from "./data";
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
  const inHsk1 = [...new Set(hsk1).difference(phrasesCharSet)];
  const inHsk2 = [...new Set(hsk2).difference(phrasesCharSet)];
  const inHsk3 = [...new Set(hsk3).difference(phrasesCharSet)];
  const inHsk4 = [...new Set(hsk4).difference(phrasesCharSet)];
  const inHsk5 = [...new Set(hsk5).difference(phrasesCharSet)];

  const segmentMap = new Map();
  phrases.forEach((phrase) =>
    phrase.parts.forEach((part) =>
      part.forEach((segment) => {
        segmentMap.set(segment, (segmentMap.get(segment) || 0) + 1);
      })
    )
  );
  const appearOnlyTwice = [...segmentMap]
    .filter((f) => f[1] < 3)
    .map((f) => f[0])
    .sort((a, b) => (a.length < b.length ? -1 : 1));

  return (
    <main id="zhongwen">
      <div id="pin">
        <Dumb />
        {/* <L list={inLaolun} title="In Laolun" /> */}
        <L
          list={appearOnlyTwice}
          title="Segments that appear only once or twice standalone"
        />
        <L list={inHsk1} title="Only in HSK1" />
        <L list={inHsk2} title="Only in HSK2" />
        <L list={inHsk3} title="Only in HSK3" />
        <L list={inHsk4} title="Only in HSK4" />
        <L list={inHsk5} title="Only in HSK5" />
        <L list={inDuolingo} title="Only in Duolingo" />
        <L list={inSheet} title="Only in Google Sheet" />
      </div>
    </main>
  );
}

const L = ({ title, list }) => {
  const cleanList = list.filter((f) => f !== "," && f !== " ");
  return (
    <>
      <h2>
        {title}
        <small>({cleanList.length})</small>
      </h2>
      <div className="ddfdx">
        {cleanList.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </>
  );
};

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
