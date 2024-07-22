"use client";

import { useRef, useState } from "react";
import "../style.css";

import {
  getSafePhraseLabel,
  getMissingPinyin,
  phrases,
} from "../phrase-util-sync";
import { writePhrase } from "../phrase-actions-async";
import { cleanChineseString } from "../util";
import { cx } from "../../utils";
import { useSearch } from "../hooks";
import { useRouter } from "next/navigation";
import { InputChinese } from "../components/InputChinese";

export default function Chinese() {
  const [searchString, setSearchString] = useSearch();

  const missingPinyin = getMissingPinyin();

  return (
    <main id="zhongwen">
      {missingPinyin.length > 0 && (
        <a href="/laolun/pinyin">
          Missing pinyin for {missingPinyin.length} phrase part variants:{" "}
          {missingPinyin.slice(0, 2).join(", ")}
          {missingPinyin.length > 2 && " and more"}
        </a>
      )}
      <div className="search">
        <InputChinese
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="找"
        />
      </div>

      <Add />
      <div className="sdjhh">
        <table className="phrase-list-table">
          <thead>
            <tr>
              <td>Phrase</td>
              <td>Tags</td>
              <td>Complexity</td>
            </tr>
          </thead>
          <tbody>
            {getMatchingPhrases(phrases, searchString).map(
              ({ label, parts, isValidateGrammar, isFocusedLearning }) => (
                <tr
                  key={label}
                  className={cx({ isValidateGrammar, isFocusedLearning })}
                >
                  <td>
                    <a href={`/laolun/${label}/edit`}>{label}</a>
                  </td>
                  <td>
                    {isValidateGrammar && <span>🧙‍♀️ validate grammar</span>}
                    {isFocusedLearning && <span>focused learning</span>}
                  </td>
                  <td className="complexity">
                    {getComplexityFromParts(parts)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <small>{phrases.length} phrases</small>
    </main>
  );
}

function Add() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const addNewPhrase = async () => {
    const messyLabel = ref.current?.value ?? Math.random().toString();
    const label = cleanChineseString(messyLabel);
    if (!label) {
      return;
    }
    const parts = label.includes("|")
      ? label.split("|").map((f) => [f])
      : [label];
    router.push(`/laolun/${await getSafePhraseLabel(label)}/edit`);
    writePhrase({ label, parts });
  };
  return (
    <div style={{ paddingBlock: "3em", display: "flex", gap: "0.1em" }}>
      <InputChinese
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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

function getMatchingPhrases(phrases, searchString) {
  return phrases.filter((phrase) => {
    const allChars = phrase.parts.flat().join();
    if (!searchString) {
      return true;
    }
    return searchString
      .split("")
      .every((searchChar) => allChars.includes(searchChar));
  });
}
