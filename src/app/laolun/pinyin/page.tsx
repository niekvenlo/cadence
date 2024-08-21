"use client";

import "../style.css";

import { getPinyin } from "../phrase-util-sync";
import { breakRawPinyin } from "../util";
import useLaolunQuery from "../../api/useLaolunQuery";
import useLaolunMutation from "../../api/useLaolunMutation";
import { useState } from "react";

export default function Chinese() {
  const [entries, setEntries] = useState<string[] | undefined>();

  const laolunQuery = useLaolunQuery();
  const phrases = laolunQuery.data?.phrases ?? [];
  const pinyin = laolunQuery.data?.pinyin ?? {};

  const laolunMutation = useLaolunMutation();

  const allUniqueSegments = [
    ...new Set(phrases.map(({ parts }) => parts).flat(2)),
  ].sort();
  const segmentsPlusPinyin = allUniqueSegments.map((p) => [
    p,
    getPinyin(pinyin, p, { requireExplicit: true }),
  ]);
  const segmentsThatLackPinyin = segmentsPlusPinyin.filter(([_, v]) => !v);
  const segmentsThatHavePinyin = segmentsPlusPinyin.filter(([_, v]) => v);

  const entriesPlusHanzi = entries?.map((entry, idx) => {
    return { p: entry, h: segmentsThatLackPinyin[idx] };
  });

  function addNewPinyin(pastedText: string) {
    const entries = pastedText
      .split(/,\s?/)
      .map((f) => f.trim())
      .filter((f) => f)
      .map(breakRawPinyin);
    setEntries(entries);
  }

  function save() {
    if (entries === undefined || entries.length < 1) {
      return;
    }
    const pinyinCopy = { ...pinyin };
    const hanziArrCopy = segmentsThatLackPinyin.map((d) => d[0]) as string[];
    entries.forEach((entry, idx) => {
      const hanzi = hanziArrCopy[idx];
      pinyinCopy[hanzi] = entry;
    });
    laolunMutation.mutateAsync({ pinyin: pinyinCopy });
  }

  return (
    <main id="zhongwen">
      <div id="pin">
        <div>
          <h2>Parts with Pinyin</h2>
          {segmentsThatHavePinyin.map(([kanji, pinyin]) => (
            <div className="pin-k" key={kanji}>
              <span className="pin-kanji">{kanji}</span>
              <span>{pinyin}</span>
            </div>
          ))}
        </div>
        {segmentsThatLackPinyin.length > 0 && (
          <div>
            <h2>Parts without Pinyin</h2>
            <div className="add-many-pinyin">
              <p>
                <code style={{ fontSize: "1.3em" }}>
                  {segmentsThatLackPinyin.map((g) => g[0]).join(", ")}
                </code>
              </p>
              <a href="https://www.chineseboost.com/tools/hanzi-pinyin-conversion">
                Get pinyin from &quot;Chinese Boost&quot;
              </a>
              <div>
                <input
                  type="text"
                  defaultValue=""
                  onPaste={(e) => {
                    const target = e.target as HTMLInputElement;
                    setTimeout(() => {
                      addNewPinyin(target.value);
                      target.select();
                      target.value = "";
                    }, 100);
                  }}
                  placeholder="粘贴"
                />
              </div>
            </div>
            <div>
              {entriesPlusHanzi?.map(({ h, p }) => (
                <div className="pin-k" key={p}>
                  <span className="pin-kanji">{h}</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
            <button onClick={save}>Save</button>
          </div>
        )}
      </div>
    </main>
  );
}
