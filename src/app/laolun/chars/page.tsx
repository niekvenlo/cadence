"use client";

import BasicLink from "../../components/basic/BasicLink";
import { sheetList } from "./data";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";

export default function Chinese() {
  const phrasesCharSet = new Set(
    phrases
      .map((phrase) => phrase.parts.map((part) => part.map((c) => c.split(""))))
      .flat(4)
  );
  const sheetSet = new Set(sheetList.map((p) => p.split("")).flat());

  const inLaolun = getInLaoLun(phrasesCharSet);
  const inSheet = getOnlyInGoogleSheet(sheetSet, phrasesCharSet);
  return (
    <main id="zhongwen">
      <div id="pin">
        <L list={inLaolun} title="In Laolun" />
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

function getInLaoLun(phrasesCharSet) {
  return [...phrasesCharSet];
}

function getOnlyInGoogleSheet(sheetSet, phrasesCharSet) {
  return [...sheetSet.difference(phrasesCharSet)];
}
