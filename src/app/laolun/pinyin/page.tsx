"use client";

import "../style.css";

import { getPinyin, phrases, pinyin } from "../phrase-util-sync";
import { setPinyin } from "../phrase-actions-async";
import { useEffect, useState } from "react";
import { breakRawPinyin } from "../util";

export default function Chinese() {
  const [newPinyin, setNewPinyin] = useState("");
  const pinyinArray = newPinyin
    .split(/,\s?/)
    .map((f) => f.trim())
    .filter((f) => f);

  const allUniqueParts = [
    ...new Set(phrases.map(({ parts }) => parts).flat(2)),
  ].sort();
  const partsPlus = allUniqueParts.map((p) => [
    p,
    getPinyin(p, { requireExplicit: true }),
  ]);
  const partsWithoutPinyin = partsPlus.filter(([_, v]) => !v);
  const partsWithPinyin = partsPlus.filter(([_, v]) => v);

  const update = (kanji, pinyin) => {
    setPinyin(kanji, pinyin.toLowerCase().trim());
  };

  useEffect(() => {
    const pinyinArray = newPinyin
      .split(/,\s?/)
      .map((f) => f.trim())
      .filter((f) => f)
      .map(breakRawPinyin);
    if (pinyinArray.length === 0) {
      console.log("No new pinyin given");
      return;
    }
    console.log({ pinyinArray });
    const isFirstPinyinInStringSet = Object.values(pinyin).includes(
      pinyinArray[0] || "never"
    );
    if (isFirstPinyinInStringSet) {
      console.log("already processed.");
      return;
    }
    partsWithoutPinyin.forEach((part, i) => {
      setTimeout(() => {
        if (!pinyinArray[i]) {
          return;
        }
        update(part.toString().replace(",", ""), pinyinArray[i]);
      }, i * 100);
      setTimeout(() => {
        setNewPinyin("");
      }, partsWithoutPinyin.length * 100 + 1000);
    });
  }, [newPinyin]);
  return (
    <main id="zhongwen">
      <div id="pin">
        {partsWithoutPinyin.length > 0 && (
          <>
            <h2>Parts without Pinyin</h2>
            <div className="pin-k">
              <span className="pin-kanji">
                {partsWithoutPinyin.map((p) => (
                  <p key={p[0]}>{p[0]},</p>
                ))}
              </span>
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
            </div>
            或者
            {partsWithoutPinyin.map(([kanji, pinyin], i) => (
              <div className="pin-k" key={kanji}>
                <span className="pin-kanji">{kanji}</span>
                <input
                  type="text"
                  defaultValue={pinyin || pinyinArray[i]}
                  placeholder="❌"
                  onBlur={(e) => update(kanji, e.target.value)}
                />
              </div>
            ))}
          </>
        )}
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
