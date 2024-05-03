import type { ReactElement, ReactNode } from "react";
import type { Word } from "./sentenceStructures";
import { useState, useRef } from "react";
import * as data from "./sentenceStructures";

export const pickRandomIdx = (array) =>
  Math.floor(Math.random() * array.length);

export const Sentence = ({ children }: { children: ReactNode }) => (
  <div className="sentence">{children}</div>
);

const Concept = ({
  word,
  onClick,
  unique,
}: {
  word: Word;
  onClick?: () => void;
  unique?: boolean;
}) => {
  const style = useRef({
    color: `hsl(${200 + Math.floor(Math.random() * 100)}, 50%, 50%)`,
  });
  return (
    <div className="one">
      <span
        className={unique ? "unique" : ""}
        style={style.current}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {word.kanji}
      </span>
      <span className="pinyin" style={{ fontSize: "0.5em" }}>
        {word.pinyin}
      </span>
    </div>
  );
};

export const 字 = ({ is }: { is: string }) => {
  return <Concept unique word={data.chars[is][0]} />;
};

export const CycleableConcept = ({ words }) => {
  const [idx, setIdx] = useState(pickRandomIdx(words));
  const incrementWithLooping = (idx) => (idx + 1) % words.length;
  return (
    <Concept
      unique={words.length < 2}
      word={words[idx]}
      onClick={() => setIdx(incrementWithLooping)}
    />
  );
};

export const 人 = ({
  的,
  pronoun,
  relative,
  children,
}: {
  的?: boolean;
  pronoun?: boolean;
  relative?: boolean;
  children?: ReactElement;
}) => {
  let words = data.person;
  if (pronoun) {
    words = data.pronoun;
  } else if (relative) {
    words = data.relative;
  }
  return (
    <>
      <CycleableConcept words={words} />
      {的 && <字 is="的" />}
      {children}
    </>
  );
};

export const 刷牙 = ({ children }: { children: ReactElement }) => {
  const [idx, setIdx] = useState(pickRandomIdx(data.splitVerb));
  const incrementWithLooping = (idx) => (idx + 1) % data.splitVerb.length;
  const style = useRef({
    color: `hsl(${200 + Math.floor(Math.random() * 60)}, 50%, 50%)`,
    display: "flex",
  });
  return (
    <div className="one">
      <span
        className="nowhitespace"
        style={style.current}
        onClick={() => setIdx(incrementWithLooping)}
      >
        {data.splitVerb[idx].first}
        {children}
        <字 is="的" />
        {data.splitVerb[idx].second}
      </span>
      <span className="pinyin split" style={{ fontSize: "0.5em" }}>
        {data.splitVerb[idx].pinyin}
      </span>
    </div>
  );
};

export const 动物 = () => <CycleableConcept words={data.animal} />;
export const 做 = () => <CycleableConcept words={data.verb} />;
export const 物 = () => <CycleableConcept words={data.object} />;
export const 东西 = () => <CycleableConcept words={data.thing} />;
export const 上面 = () => <CycleableConcept words={data.position} />;
export const 冷 = () => <CycleableConcept words={data.adjective} />;
export const 颜色 = () => <CycleableConcept words={data.type} />;
