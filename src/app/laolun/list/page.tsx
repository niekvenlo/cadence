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

  const matchingPhrases = getMatchingPhrases(phrases, searchString);

  const totalPermutations = phrases.reduce(
    (acc, { parts }) => acc + parts.reduce((a, part) => a * part.length, 1),
    0
  );

  return (
    <main id="zhongwen">
      {missingPinyin.length > 0 && (
        <a href="/laolun/pinyin">
          Missing pinyin for {missingPinyin.length} phrase part variants:{" "}
          {missingPinyin.slice(0, 2).join(", ")}
          {missingPinyin.length > 2 && " and more"}
        </a>
      )}
      <InteractiveElements>
        <InputChinese
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          placeholder="搜索"
        />
      </InteractiveElements>
      <div className="sdjhh ddd">
        <table className="phrase-list-table">
          <thead>
            <tr>
              <th>Tags</th>
              <th>Phrase</th>
              <th>Permutations</th>
              <th>Variants</th>
              <th>Parts/Columns</th>
            </tr>
          </thead>
          <tbody>
            {matchingPhrases.map(
              ({ label, parts, isValidateGrammar, isFocusedLearning }) => (
                <tr key={label}>
                  <td>
                    {isValidateGrammar && <Tag type="grammar" />}
                    {isFocusedLearning && <Tag type="focus" />}
                  </td>
                  <td>
                    <a
                      className={cx({ isValidateGrammar, isFocusedLearning })}
                      href={`/laolun/${label}/edit`}
                    >
                      {label}
                    </a>
                  </td>
                  <ComplexityTDs parts={parts} />
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <small>
        {matchingPhrases.length} phrases
        {matchingPhrases.length !== phrases.length && (
          <span> of {phrases.length}</span>
        )}
        | {totalPermutations} total permutations
      </small>
    </main>
  );
}

function Tag({ type }) {
  if (type === "grammar") {
    return <span className="tag grammar">validate grammar</span>;
  }
  return <span className="tag">focused learning</span>;
}

function InteractiveElements({ children }) {
  const router = useRouter();
  const [value, setValue] = useState("");
  const addNewPhrase = async () => {
    const label = cleanChineseString(value);
    if (!label) {
      return;
    }
    await writePhrase({ label, parts: label.split("|").map((f) => [f]) });
    router.push(`/laolun/${await getSafePhraseLabel(label)}/edit`);
  };
  return (
    <div className="interactive-elements">
      {children}
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

function ComplexityTDs({ parts }) {
  let complexity = 1;
  parts.forEach((part) => (complexity *= part.length));
  const boringKanji = "我门你们他门妈妈弟弟";
  const maxLength = Math.max(
    ...parts.map((p) => p.filter((f) => !boringKanji.includes(f)).length)
  );
  return (
    <>
      <td className="complexity">
        {complexity} <small>permutations</small>
      </td>
      <td className={cx("complexity", { prettyLong: maxLength > 10 })}>
        {maxLength}+ <small>max. variants</small>
      </td>
      <td className={cx("complexity", { prettyLong: parts.length === 1 })}>
        {parts.length} <small>parts</small>
      </td>
    </>
  );
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
