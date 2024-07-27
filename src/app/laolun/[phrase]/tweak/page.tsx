"use client";

import "./tweak-page-style.css";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  findPhraseByLabel,
  getSegmentsRarity,
  getSuggested,
  pinyin,
} from "../../phrase-util-sync";
import "../../style.css";
import { getIsChinese } from "../../util";
import { cx } from "../../../utils";
import { updateLabel } from "../../phrase-actions-async";
import { useRouter } from "next/navigation";
import NoSSR from "../../../components/NoSSR";

const no_text = "。";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const router = useRouter();
  const { label, parts, isValidateGrammar, isFocusedLearning } =
    findPhraseByLabel(decodeURI(params.phrase));

  const changeLabel = async (newLabel: string) => {
    const finalLabel = await updateLabel(label, newLabel);
    router.replace(`/laolun/${finalLabel}/edit`);
  };
  return (
    <main id="zhongwen" className="tweak-page">
      <div id="label-edit-box">
        <input
          className="label-edit"
          type="text"
          defaultValue={label}
          onBlur={(e) => {
            if (e.target.value !== label) {
              changeLabel(e.target.value);
            }
          }}
        />
      </div>

      <PhraseEditor parts={parts} />
    </main>
  );
}

function PhraseEditor({ parts }) {
  const [x, setX] = useState(parts);
  return (
    <div className="editor">
      {x.map((part, i) => (
        <Column
          key={i}
          part={part}
          setPart={(n) =>
            setX((x) => {
              x[i] = n;
              return [...x];
            })
          }
        />
      ))}
    </div>
  );
}

const splitPartStringIntoPart = (string) =>
  string
    .split("\n")
    .filter((c) => c)
    .filter(getIsChinese)
    .map((f) => f.trim());

const Column = ({ part, setPart }) => {
  const isWide = Math.max(...part.map((p) => p.length)) > 3;
  const isEmpty = part.length < 1;
  return (
    <>
      <div className={cx("column-wrapper", { isWide, isEmpty })}>
        <TextArea
          value={part.join("\n")}
          onChange={(e) => setPart(splitPartStringIntoPart(e.target.value))}
        />
        <div className="overlay">
          {part.map((segment) => (
            <div
              key={segment}
              className={cx("line", `offset-${segment.length}`)}
            >
              <span className="pinyin">{pinyin[segment]}</span>
              <RaritySpan segment={segment} />
            </div>
          ))}
        </div>
        <Suggestions part={part} />
        {isEmpty && (
          <div className="delete-column-overlay">
            <div>
              <button>Delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const RaritySpan = ({ segment }) => {
  const totalCount =
    getSegmentsRarity().find((s) => s.segment === segment)?.totalCount ?? 0;
  let emoji = "🟢";
  if (totalCount < 10) emoji = "🟣";
  if (totalCount < 6) emoji = "🟡";
  if (totalCount < 4) emoji = "🟠";
  if (totalCount < 2) emoji = "🔴";
  return (
    <span className="rarity">
      <span>{totalCount}</span>
      <span>{emoji}</span>
    </span>
  );
};

const Suggestions = ({ part }) => {
  const suggestions = getSuggested(part);
  if (suggestions.length < 1) {
    return null;
  }
  return (
    <NoSSR>
      <div className="suggestions">
        <p>Quick add</p>
        <div>
          {suggestions.map((s) => (
            <button key={s}>{s}</button>
          ))}
        </div>
      </div>
    </NoSSR>
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
