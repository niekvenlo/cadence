"use client";

import BasicLink from "../../components/basic/BasicLink";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";
// import { setPinyin } from "../phrase-actions-async";

export default function Chinese() {
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen/list">Back</BasicLink>
        <h1>List of chars</h1>
      </div>
      <div id="pin">
        <h2>In Both</h2>
        {getBloo(pinyin, phrases)[0].map((d) => (
          <span key={d} style={{ margin: "0.7em" }}>
            {d}
          </span>
        ))}
        <h2>Only in old set</h2>
        {getBloo(pinyin, phrases)[1].map((d) => (
          <span key={d} style={{ margin: "0.7em" }}>
            {d}
          </span>
        ))}
      </div>
    </main>
  );
}

function getBloo(pinyin, phrases) {
  const list: string[] = [];
  const list2: string[] = [];
  const charSet = new Set(
    phrases
      .map((phrase) => phrase.parts.map((part) => part.map((c) => c)))
      .flat(3)
  );
  const kanjiSet = new Set(Object.keys(pinyin));
  [...kanjiSet].forEach((k) => {
    if (charSet.has(k)) {
      list.push(k);
    } else {
      list2.push(k);
    }
  });
  // console.log(charSet.difference(kanjiSet));
  return [list.sort(), list2.sort()];
  // const list: any[] = [];
  // const kanjiSet = new Set(Object.keys(pinyin));
  // console.log(kanjiSet);
  // phrases.forEach(({ parts }) => {
  //   parts.forEach((part) => {
  //     part.forEach((char) => {
  //       console.log(char, typeof char);
  //       if (!kanjiSet.has(char)) {
  //         list.push(char);
  //       }
  //     });
  //   });
  // });
  // console.log(kanjiSet.has("零"), kanjiSet.has("半"));
  // return list;
}
