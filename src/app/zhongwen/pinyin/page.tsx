"use client";

import BasicLink from "../../components/basic/BasicLink";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";
import { setPinyin } from "../phrase-actions-async";
import { useEffect, useState } from "react";

export default function Chinese() {
  const [newPinyin, setNewPinyin] = useState("");

  const allUniqueParts = [
    ...new Set(phrases.map(({ parts }) => parts).flat(2)),
  ].sort();
  const partsPlus = allUniqueParts.map((p) => [p, pinyin[p]]);
  const partsWithoutPinyin = partsPlus.filter(([_, v]) => !v);
  const partsWithPinyin = partsPlus.filter(([_, v]) => v);

  const update = (kanji, pinyin) => {
    setPinyin(kanji, pinyin.toLowerCase().trim());
  };

  useEffect(() => {
    const pinyinArray = newPinyin.split(/,\s?/).map((f) => f.trim());
    const isFirstPinyinInStringSet = Object.values(pinyin).includes(
      pinyinArray[0] || "never"
    );
    if (isFirstPinyinInStringSet) {
      console.log("already processed.");
      return;
    }
    if (pinyinArray.length !== partsWithoutPinyin.length) {
      console.log("length mismatch");
      return;
    }
    partsWithoutPinyin.forEach((part, i) => {
      setTimeout(() => {
        update(part.toString().replace(",", ""), pinyinArray[i]);
      }, i * 100);
      setTimeout(() => {
        setNewPinyin("");
      }, partsWithoutPinyin.length * 100 + 1000);
    });
  }, [newPinyin]);
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen/list">Back</BasicLink>
        <h1>List of pinyin</h1>
      </div>
      <div id="pin">
        {partsWithoutPinyin.length > 0 && (
          <>
            <h2>Parts without Pinyin</h2>
            {partsWithoutPinyin.map((p) => p[0]).join(", ")}
            <br />
            {newPinyin}
            <br />
            <input
              type="text"
              defaultValue=""
              onPaste={(e) => {
                const target = e.target as HTMLInputElement;
                setTimeout(() => {
                  setNewPinyin(target.value);
                  target.select();
                  target.value = "";
                }, 100);
              }}
              placeholder="粘贴"
            />
          </>
        )}
        {partsWithoutPinyin.map(([kanji, pinyin]) => (
          <div className="pin-k" key={kanji}>
            <span className="pin-kanji">{kanji}</span>
            <input
              type="text"
              defaultValue={pinyin}
              placeholder="❌"
              onBlur={(e) => update(kanji, e.target.value)}
            />
          </div>
        ))}
        <br />
        <h2>Parts with Pinyin</h2>
        {partsWithPinyin.map(([kanji, pinyin]) => (
          <div className="pin-k" key={kanji}>
            <span className="pin-kanji">{kanji}</span>
            <input
              type="text"
              defaultValue={pinyin}
              onBlur={(e) => update(kanji, e.target.value)}
            />
          </div>
        ))}
      </div>
    </main>
  );
}
