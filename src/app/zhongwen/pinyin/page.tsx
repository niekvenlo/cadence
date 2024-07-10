"use client";

import BasicLink from "../../components/basic/BasicLink";
import "../style.css";

import { phrases, pinyin } from "../phrase-util-sync";
import { setPinyin } from "../phrase-actions-async";

export default function Chinese() {
  const allUniqueParts = [
    ...new Set(phrases.map(({ parts }) => parts).flat(2)),
  ].sort();
  const partsPlus = allUniqueParts.map((p) => [p, pinyin[p]]);
  const partsWithoutPinyin = partsPlus.filter(([_, v]) => v === undefined);
  const partsWithPinyin = partsPlus.filter(([_, v]) => v !== undefined);

  const update = (kanji, pinyin) => {
    setPinyin(kanji, pinyin);
  };
  // const d = `yī kè , sān kè , líng jū , zuò shén me , cè suǒ , zhī māo , tóng shì , míng yī shēng , zài nǎ lǐ , jiā fàn guǎn , zhāng zhǐ , nín , ài rén , wán yóu xì , xiāng xìn , píng guǒ , shuō shén me`;
  // const f = d.split(",").map((f) => f.trim());
  // return partsWithoutPinyin.map((p, i) => {
  //   setTimeout(() => update(p, f[i]), i * 100);
  //   return [p, f[i]];
  // });
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen">Back</BasicLink>
        <h1>List of pinyin</h1>
      </div>
      <div id="pin">
        <h2>Parts without Pinyin</h2>
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
