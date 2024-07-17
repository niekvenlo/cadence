"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import BasicLink from "../../components/basic/BasicLink";
import BasicButton from "../../components/basic/BasicButton";
import "../style.css";

import { phrases } from "../phrase-util-sync";
import { writePhrase } from "../phrase-actions-async";
import { cleanChineseString } from "../util";

export default function Chinese() {
  const [searchString, setSearchString] = useState("");
  const matchingPhrases = phrases.filter((phrase) => {
    const allChars = phrase.parts.flat().join();
    if (!searchString) {
      return true;
    }
    return searchString
      .split("")
      .every((searchChar) => allChars.includes(searchChar));
  });
  const x = useRef(false);
  return (
    <main id="zhongwen">
      <div className="top">
        <h1>✏️</h1>
        <div className="links">
          <BasicLink href="/laolun">中文</BasicLink>
          <BasicLink href="/laolun/pinyin">拼音</BasicLink>
          <BasicLink href="/laolun/chars">字符</BasicLink>
        </div>
      </div>
      <div className="search">
        <input
          hidden
          onCompositionStart={(e) => console.log("onCompositionStart")}
          onCompositionUpdate={(e) => console.log("onCompositionUpdate")}
          onCompositionEnd={(e) => console.log("onCompositionEnd")}
          // onChange={() => {
          //   console.log(x.current);
          //   if (x.current) {
          //     x.current = false;
          //     return;
          //   }
          // }}
        />

        <input
          data-value={searchString}
          type="text"
          defaultValue=""
          onChange={(e) => setSearchString(cleanChineseString(e.target.value))}
          placeholder="找"
        />
      </div>
      <div className="sdjhh sssdsv">
        {matchingPhrases.map(({ label, parts }) => (
          <p key={label}>
            <span>{label}</span>
            <BasicLink href={`/laolun/${label}`}>👀</BasicLink>
            <BasicLink href={`/laolun/${label}/edit`}>✏️</BasicLink>
            <BasicButton
              variant="look-like-a-link"
              onClick={() => writePhrase({ label: `${label} 2️`, parts })}
            >
              🗳️
            </BasicButton>
            <span className="complexity">{getComplexityFromParts(parts)}</span>
          </p>
        ))}
      </div>
      <Add />
    </main>
  );
}

function Add() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement | null>(null);
  const addNewPhrase = () => {
    const messyLabel = ref.current?.value ?? Math.random().toString();
    const label = cleanChineseString(messyLabel);
    if (!label) {
      return;
    }
    const parts = label.includes("|")
      ? label.split("|").map((f) => [f])
      : label.split("").map((f) => [f]);
    const labelWithoutPipes = label.replace(/[|]/g, "");
    router.push(`/laolun/${labelWithoutPipes}/edit`);
    writePhrase({ label: labelWithoutPipes, parts });
  };
  return (
    <div style={{ paddingBlock: "3em", display: "flex", gap: "0.1em" }}>
      <input
        ref={ref}
        type="text"
        defaultValue=""
        placeholder="使用'|'符分隔"
      />
      <button className="add" onClick={addNewPhrase}>
        加句子
      </button>
    </div>
  );
}

function getComplexityFromParts(parts) {
  let complexity = 1;
  parts.forEach((part) => (complexity *= part.length));
  return complexity;
}
