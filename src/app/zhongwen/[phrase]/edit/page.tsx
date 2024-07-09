"use client";

import { useMemo, useRef, useState } from "react";
import NoSSR from "../../../components/NoSSR";
import BasicLink from "../../../components/basic/BasicLink";
import { findPhraseByLabel, getSuggested } from "../../phrase-util-sync";
import { writePhrase } from "../../phrase-actions-async";
import "../../style.css";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));

  const [_, setX] = useState(0);

  const timer = useRef<NodeJS.Timeout>();
  const onChangePart = (i, value, append) => {
    const foundValues = value
      .split("\n")
      .filter((f) => f)
      .map((f) => f.trim());
    if (append) {
      parts[i] = [...(parts[i] || []), ...foundValues];
    } else {
      parts[i] = foundValues;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      writePhrase({ label, parts });
      setX((x) => x + 1);
    }, 10000);
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
              onChangePart={(value, append) => onChangePart(i, value, append)}
            />
          ))}
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
  const [temp, setTemp] = useState("");
  const value = part?.[0] || "";
  const suggested = useMemo(() => {
    return getSuggested(part);
  }, [part]);
  if (part.length < 2) {
    // Only one value.
    return (
      <div className="column">
        <span className="init">{value}</span>
        <span className="random">{value}</span>
        <textarea
          className="constant"
          defaultValue={value}
          onChange={(e) => setTemp(e.target.value)}
          onBlur={() => onChangePart(temp)}
        />
      </div>
    );
  }
  // Multiple possible values.
  const random = part[Math.floor(Math.random() * part.length)];
  return (
    <div className="column">
      <span className="init">{value}</span>
      <span className="random">{random}</span>
      <textarea
        className="options"
        defaultValue={part.join("\n") + "\n"}
        onChange={(e) => setTemp(e.target.value)}
        onBlur={() => onChangePart(temp)}
      />
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
