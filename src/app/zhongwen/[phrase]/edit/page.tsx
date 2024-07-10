"use client";

import { useMemo, useState } from "react";
import NoSSR from "../../../components/NoSSR";
import BasicLink from "../../../components/basic/BasicLink";
import { findPhraseByLabel, getSuggested } from "../../phrase-util-sync";
import { writePhrase } from "../../phrase-actions-async";
import "../../style.css";
import { getIsChinese } from "../../util";

const no_text = "。";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));

  const [_, setX] = useState(0);

  const onChangePart = (i, part, append = false) => {
    if (append) {
      parts[i] = [...(parts[i] || []), ...part];
    } else {
      parts[i] = part.length < 1 ? [no_text] : part;
    }

    writePhrase({ label, parts });
    setX((x) => x + 1);
  };
  return (
    <NoSSR>
      <main id="zhongwen">
        <div className="top">
          <BasicLink href="/zhongwen/list">Back</BasicLink>
          <h1>Phrase editor</h1>
        </div>
        <div className="phrase">
          <div className="column">
            <span className="init">
              <span className="label">template</span>
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
  onChangePart: (value: string, append?: boolean) => void;
};

const Column = ({ part, onChangePart }: ColumnProps) => {
  const value = part?.[0] || "";
  const suggested = useMemo(() => {
    return getSuggested(part);
  }, [part]);
  if (part.length < 2) {
    // Only one value.
    return (
      <div className="column constant">
        <span className="init">{value}</span>
        <span className="random">{value}</span>
        <TextArea part={part} onBlur={(value) => onChangePart(value)} />
      </div>
    );
  }
  // Multiple possible values.
  const random = part[Math.floor(Math.random() * part.length)];
  return (
    <div className="column">
      <span className="init">{value}</span>
      <span className="random">{random}</span>
      <TextArea part={part} onBlur={(value) => onChangePart(value)} />
      <div className="suggested">
        {suggested?.map((s) => (
          <div key={s} onClick={() => onChangePart(s, true)}>
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
      .filter(getIsChinese)
      .map((f) => f.trim());
    const unique = [...new Set(foundValues)];
    return unique;
  };
  return (
    <textarea
      className="options"
      defaultValue={part.join("\n") + "\n"}
      onBlur={(e) => onBlur(cleanValues(e.target.value))}
    />
  );
};
