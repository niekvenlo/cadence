"use client";

import "./tweak-page-style.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { findPhraseByLabel, pinyin } from "../../phrase-util-sync";
// import { writePhrase, updateLabel } from "../../phrase-actions-async";
import "../../style.css";
import { getIsChinese } from "../../util";
import { cx } from "../../../utils";
import { InputChinese } from "../../components/InputChinese";

const no_text = "。";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts, isValidateGrammar, isFocusedLearning } =
    findPhraseByLabel(decodeURI(params.phrase));

  return (
    <main id="zhongwen" className="tweak-page">
      <div id="label-edit-box">
        <input
          className="label-edit"
          type="text"
          defaultValue={label}
          // onBlur={(e) => {
          //   if (e.target.value !== label) {
          //     changeLabel(e.target.value);
          //   }
          // }}
        />
      </div>

      <PhraseEditor parts={parts} />
    </main>
  );
}

function PhraseEditor({ parts }) {
  return (
    <div className="editor">
      {parts.map((part, i) => (
        <Column key={i} part={part} onChange={(e) => console.log(e)} />
      ))}
    </div>
  );
}

// const cleanValues = (string) => {
//   const foundValues = string
//     .split("\n")
//     .filter((c) => c)
//     .filter(getIsChinese)
//     .map((f) => f.trim());
//   const unique = [...new Set(foundValues)];
//   return unique;
// };

const Column = ({ part, onChange }) => {
  return (
    <div className="column-wrapper">
      <TextArea value={part.join("\n")} onChange={onChange} />
      <div className="overlay">
        {part.map((segment) => (
          <div key={segment} className={cx("line", `offset-${segment.length}`)}>
            <span className="pinyin">{pinyin[segment]}</span>
            <span className="rarity">🔵</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TextArea = ({
  value,
  className = "",
  onChange,
  onPaste = (e: Event) => {},
}) => {
  // We don't want onChange to trigger while we are in composition mode.
  const preventOnChange = useRef(false);
  // We want to call handlePaste once the value has been updated.
  const justPasted = useRef(false);

  const handleChange = (e) => {
    if (justPasted.current === true) {
      justPasted.current = false;
      handlePaste(e);
      return;
    }
    if (preventOnChange.current === true) {
      return;
    }
    onChange(e);
  };
  const handlePaste = (e) => {
    onPaste(e);
  };
  return (
    <textarea
      className={className}
      defaultValue={value}
      onCompositionStart={() => (preventOnChange.current = true)}
      onCompositionEnd={() => (preventOnChange.current = false)}
      onPaste={() => (justPasted.current = true)}
      onChange={handleChange}
    />
  );
};
