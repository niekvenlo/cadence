"use client";

import BasicLink from "../../components/basic/BasicLink";
import { sheetList } from "./data";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";

export default function Chinese() {
  const kanjiSet = new Set(Object.keys(pinyin));
  const phrasesCharSet = new Set(
    phrases
      .map((phrase) => phrase.parts.map((part) => part.map((c) => c)))
      .flat(3)
  );
  const sheetSet = new Set(
    sheetList.sort((a, b) => (a.length > b.length ? -1 : 1))
  );
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen/list">Back</BasicLink>
        <h1>List of chars</h1>
      </div>
      <div id="pin">
        <h2>In Multiple</h2>
        {getInMultiple(kanjiSet, sheetSet, phrasesCharSet).map((d) => (
          <span key={d} style={{ margin: "0.7em" }}>
            {d}
          </span>
        ))}
        <h2>Only in old set</h2>
        {getOnlyInPreviousApp(kanjiSet, phrasesCharSet).map((d) => (
          <span key={d} style={{ margin: "0.7em" }}>
            {d}
          </span>
        ))}
        <h2>Google sheet</h2>
        {getOnlyInGoogleSheet(sheetSet, phrasesCharSet).map((d) => (
          <span key={d} style={{ margin: "0.7em" }}>
            {d}
          </span>
        ))}
      </div>
    </main>
  );
}

function getInMultiple(kanjiSet, sheetSet, phrasesCharSet) {
  return [...kanjiSet.union(sheetSet).intersection(phrasesCharSet)];
}

function getOnlyInPreviousApp(kanjiSet, phrasesCharSet) {
  return [...kanjiSet.difference(phrasesCharSet)];
}

function getOnlyInGoogleSheet(sheetSet, phrasesCharSet) {
  return [...sheetSet.difference(phrasesCharSet)];
}
