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

  const d = `bù kāi xīn , shì jiè , zhōng wén , èr shí wǔ , wǔ shí , rén , huì bù , huì shuō , shāng xīn , gōng sī , bīng chá , bié wàng liǎo , mài shū , qù cè suǒ , shū shū , chī wǔ fàn , míng , chàng gē , guó jiā , zài zhè gè , zài nà gè , xiǎo māo , shuài , nián qīng , hěn máng , hěn gāo xīng , hěn gāo xīng rèn shí nǐ , bì xū , wàng liǎo , wàng jì liǎo , yì dà lì , dǎ diàn huà , dǎ lán qiú , dǎ zú qiú , rì běn , rì yǔ , shì dú shū , shì è liǎo , yǒu qián , hàn yǔ , fǎ yǔ , tài yǔ , ào dà lì yà , rè shuǐ , yé yé , niú ròu , bǎi shí , ǎi , xiào liǎo , cōng míng , féi , pàng , yīng yǔ , suī rán , jì dé , gǎn jǐn `;
  const f = d.split(/,\s?/).map((f) => f.trim());
  useEffect(() => {
    const isFirstPinyinInStringSet = Object.values(pinyin).includes(
      f[0] || "never"
    );
    if (isFirstPinyinInStringSet) {
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
