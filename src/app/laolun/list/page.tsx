"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import "../style.css";

import { phrases } from "../phrase-util-sync";
import { writePhrase } from "../phrase-actions-async";
import { cleanChineseString } from "../util";
import { cx } from "../../utils";

export default function Chinese() {
  const searchString = decodeURI(
    useSearchParams()?.toString().slice(0, -1) || ""
  );
  const router = useRouter();
  const pathname = usePathname();
  const setSearchString = (string: string) =>
    router.push(pathname + "?" + string);

  const matchingPhrases = phrases.filter((phrase) => {
    const allChars = phrase.parts.flat().join();
    if (!searchString) {
      return true;
    }
    return searchString
      .split("")
      .every((searchChar) => allChars.includes(searchChar));
  });

  return (
    <main id="zhongwen">
      <div className="search">
        <InputChinese
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="找"
        />
      </div>
      <div className="sdjhh sssdsv">
        {matchingPhrases.map(({ label, parts }) => (
          <p key={label}>
            <a href={`/laolun/${label}/edit`}>{label}</a>
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

function InputChinese({ className = undefined, value, onChange, placeholder }) {
  const preventOnChange = useRef(false);
  const [isCompositionMode, setIsCompositionMode] = useState(false);

  return (
    <input
      defaultValue={value}
      placeholder={placeholder}
      className={cx("input-chinese", className, { isCompositionMode })}
      onCompositionStart={() => {
        preventOnChange.current = true;
        setIsCompositionMode(true);
      }}
      onChange={(e) => {
        if (!preventOnChange.current) {
          onChange(e);
        }
      }}
      onCompositionEnd={(e) => {
        preventOnChange.current = false;
        setIsCompositionMode(false);
        onChange(e);
      }}
    />
  );
}
