"use client";

import { breakPinyinIntoSylables, getTones } from "./util";
import { useId, useRef, useState } from "react";
import { pinyin as pinyinJson, getPinyin } from "./phrase-util-sync";
import { Accent, Accents } from "./Accents";
import PersonaModal from "./PersonaModal";

function Part({ label, part }) {
  const [isSelected, setIsSelected] = useState(false);
  const { style, segment } = useRandomNess(part);
  const p = getPinyin(segment) || "";
  const pinyin = breakPinyinIntoSylables(p);
  const tones = getTones(p);
  const chars = segment.split("").map((char, i) => [char, pinyin[i], tones[i]]);
  const alternativeKanji = part.filter((c) => c !== segment);

  return (
    <>
      <button
        className="part"
        style={style}
        onDoubleClick={() => setIsSelected((t) => !t)}
      >
        {chars.map(([char, pinyin, tone], i) => (
          <span className="char" tabIndex={1} key={char + i}>
            <span className="pinyin">{pinyin}</span>
            <span className="tone">{<Accent type={tone} />}</span>
            <span className="kanji">{char}</span>
          </span>
        ))}
      </button>
      {isSelected && (
        <PersonaModal
          isOpen
          closeOnBackdropClick
          className="selected"
          requestClose={() => setIsSelected(false)}
        >
          <p className="alternative">
            {alternativeKanji.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </p>
          <Accents pinyin={pinyinJson[segment]} />
          <h2>{segment}</h2>
          <p>{pinyinJson[segment]?.replace(/-/g, " ")}</p>
          <div className="buttons">
            <a href={`/laolun/${label}/edit`}>
              <span>✏️</span>Go to edit page
            </a>
          </div>
        </PersonaModal>
      )}
    </>
  );
}

function turnIdIntoNumber(string) {
  let hash = 0;
  if (string.length === 0) return hash;
  for (let i = 0; i < string.length; i++) {
    hash = (hash << 5) - hash + string.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}
function useRandomNess(part) {
  const randomNumber = turnIdIntoNumber(useId());
  const hue = 230 + (randomNumber % 50);
  const randomStuff = {
    style: { color: `hsl(${hue}, 60%, 60%)` },
    segment: part[randomNumber % part.length],
  };
  return useRef(randomStuff).current;
}

export default Part;
