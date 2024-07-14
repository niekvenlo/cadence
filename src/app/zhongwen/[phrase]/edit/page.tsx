"use client";

import { useMemo, useState } from "react";
import NoSSR from "../../../components/NoSSR";
import BasicLink from "../../../components/basic/BasicLink";
import { findPhraseByLabel, getSuggested } from "../../phrase-util-sync";
import { writePhrase, updateLabel } from "../../phrase-actions-async";
import "../../style.css";
import { getIsChinese } from "../../util";
import { cx } from "../../../utils";
import { useRouter } from "next/navigation";

const no_text = "。";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const router = useRouter();
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));

  const [_, setX] = useState(0);

  const [shiftColumnIdx, setShiftColumnIdx] = useState<number | null>(null);

  const onChangePart = (i, part, append = false) => {
    if (part === "rem-col-hack") {
      writePhrase({ label, parts: parts.toSpliced(i, 1) });
      return;
    }
    if (part === "shift-col-hack") {
      if (shiftColumnIdx !== null) {
        // move
        [parts[shiftColumnIdx], parts[i]] = [parts[i], parts[shiftColumnIdx]];
        setShiftColumnIdx(null);
      } else {
        console.log(i);
        setShiftColumnIdx(i);
      }
      return;
    }
    if (append) {
      parts[i] = [...(parts[i] || []), ...part];
    } else {
      parts[i] = part.length < 1 ? [no_text] : part;
    }

    writePhrase({ label, parts });
    setX((x) => x + 1);
  };
  const changeLabel = async (newLabel: string) => {
    const finalLabel = await updateLabel(label, newLabel);
    router.replace(`/zhongwen/${finalLabel}/edit`);
  };
  return (
    <NoSSR>
      <main id="zhongwen">
        <div className="top">
          <BasicLink href="/zhongwen/list">Back</BasicLink>
          <h1>Phrase editor</h1>
        </div>
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

        <div className="phrase">
          <div className="column">
            <span className="init">
              <span className="label">template</span>
            </span>
            <span className="random">
              <span className="label">random</span>
            </span>
            <span className="random">
              <span className="label">random</span>
            </span>
            <span className="random">
              <span className="label">random</span>
            </span>
            <span className="options">
              <span className="label">options</span>
            </span>
          </div>
          {parts.map((part, i) => (
            <Column
              key={part?.join() + i}
              part={part}
              shiftColumnIdx={shiftColumnIdx}
              onChangePart={(part, append) => onChangePart(i, part, append)}
            />
          ))}
          <div>
            <button
              className="plus"
              onClick={() => onChangePart(parts.length, [no_text])}
            >
              加字
            </button>
          </div>
        </div>
      </main>
    </NoSSR>
  );
}

type ColumnProps = {
  part: string[];
  shiftColumnIdx: number | null;
  onChangePart: (
    part: string[] | "rem-col-hack" | "shift-col-hack",
    append?: boolean
  ) => void;
};

const Column = ({ part, shiftColumnIdx, onChangePart }: ColumnProps) => {
  const suggested = useMemo(() => getSuggested(part), [part]);
  const getRandom = () => part[Math.floor(Math.random() * part.length)];
  const canBeDeleted = part.toString() === "。";
  const longestStringInColumn = Math.max(...part.map((chars) => chars.length));
  return (
    <div className={cx("column", `width-${longestStringInColumn}`)}>
      <span className="init">{part?.[0]}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <button className="shift" onClick={() => onChangePart("shift-col-hack")}>
        {shiftColumnIdx !== null ? "搬来这" : "移动"}
      </button>
      <TextArea part={part} onBlur={(part) => onChangePart(part)} />
      {canBeDeleted && (
        <button className="minus" onClick={() => onChangePart("rem-col-hack")}>
          除字
        </button>
      )}
      <div className="suggested">
        {suggested?.map((s) => (
          <div key={s} onClick={() => onChangePart([s], true)}>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

const TextArea = ({ part, onBlur }) => {
  const cleanValues = (string) => {
    const foundValues = string
      .split("\n")
      .filter((c) => c)
      .filter(getIsChinese)
      .map((f) => f.trim());
    const unique = [...new Set(foundValues)];
    return unique;
  };
  return (
    <textarea
      className="options"
      defaultValue={
        part
          .toSorted()
          .filter((c) => c)
          .join("\n") + "\n"
      }
      onBlur={(e) => onBlur(cleanValues(e.target.value))}
      onPaste={(e) => {
        const textarea = e.target as HTMLTextAreaElement;
        setTimeout(() => onBlur(cleanValues(textarea.value)), 100);
      }}
    />
  );
};
