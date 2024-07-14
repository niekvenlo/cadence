"use client";

import BasicLink from "../../components/basic/BasicLink";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";
import { setPinyin } from "../phrase-actions-async";
import { useEffect } from "react";

export default function Chinese() {
  const allUniqueParts = [
    ...new Set(phrases.map(({ parts }) => parts).flat(2)),
  ].sort();
  const partsPlus = allUniqueParts.map((p) => [p, pinyin[p]]);
  const partsWithoutPinyin = partsPlus.filter(([_, v]) => !v);
  const partsWithPinyin = partsPlus.filter(([_, v]) => v);

  const update = (kanji, pinyin) => {
    setPinyin(kanji, pinyin.toLowerCase().trim());
  };

  const d = `yī dìng , bù hǎo yì sī , dōng xué xiào , gè nǚ rén , gè hái zǐ , gè gù shì , gè nán rén , yě , yě xǔ , mǎi , mǎi liǎo , zuò , zhī gòu , kě bù kě yǐ , kě néng , hē pí jiǔ , huí , zuò , hǎo kàn , yīng gāi mǎi , xiǎng bù xiǎng , bào qiàn , fāng biàn , běn shū , shuǐ guǒ , méi yǒu , ài bù ài , diàn zǐ yóu jiàn , fān qié , duǎn xìn , mǐ , táng guǒ , gěi nǐ , néng bù néng , chuán , yào bù yào , huán , xū bù xū yào , mài kè`;
  const f = d.split(/,\s?/).map((f) => f.trim());
  useEffect(() => {
    const isLastPinyiInStringSet = Object.values(pinyin).includes(
      f.at(-1) || "never"
    );
    if (isLastPinyiInStringSet) {
      return;
    }
    partsWithoutPinyin.forEach((p, i) => {
      const pp = p.toString().replace(",", "");
      const ff = f[i];
      setTimeout(() => update(pp, ff), i * 100);
    });
  }, []);
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen/list">Back</BasicLink>
        <h1>List of pinyin</h1>
      </div>
      <div id="pin">
        <h2>Parts without Pinyin</h2>
        {partsWithoutPinyin.map((p) => p[0]).join(", ")}
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
