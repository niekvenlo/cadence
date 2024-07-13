"use client";

import BasicLink from "../../components/basic/BasicLink";
import { sheetList } from "./data";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";

export default function Chinese() {
  const kanjiSet = new Set(
    Object.keys(pinyin)
      .map((p) => p.split(""))
      .flat()
  );
  const phrasesCharSet = new Set(
    phrases
      .map((phrase) => phrase.parts.map((part) => part.map((c) => c.split(""))))
      .flat(4)
  );
  const sheetSet = new Set(sheetList.map((p) => p.split("")).flat());

  const inMultiple = getInMultiple(kanjiSet, sheetSet, phrasesCharSet);
  const inPrevious = getOnlyInPreviousApp(kanjiSet, phrasesCharSet);
  const inSheet = getOnlyInGoogleSheet(sheetSet, phrasesCharSet);
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen/list">Back</BasicLink>
        <h1>List of chars</h1>
      </div>
      <div id="pin">
        <L list={inMultiple} title="In Multiple" />
        <L list={inPrevious} title="In Previous App" />
        <L list={inSheet} title="In Google Sheet" />
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

function getInMultiple(kanjiSet, sheetSet, phrasesCharSet) {
  return [...kanjiSet.union(sheetSet).intersection(phrasesCharSet)];
}

function getOnlyInPreviousApp(kanjiSet, phrasesCharSet) {
  return [...kanjiSet.difference(phrasesCharSet)];
}

function getOnlyInGoogleSheet(sheetSet, phrasesCharSet) {
  return [...sheetSet.difference(phrasesCharSet)];
}
