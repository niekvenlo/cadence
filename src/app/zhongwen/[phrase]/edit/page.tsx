"use client";

import { useMemo, useRef, useState } from "react";
import NoSSR from "../../../components/NoSSR";
import BasicLink from "../../../components/basic/BasicLink";
import { Part, findPhraseByLabel, getSuggested } from "../../phrase-util-sync";
import { writePhrase } from "../../phrase-actions-async";
import "../../style.css";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));

  const [_, setX] = useState(0);

  console.log(label);

  const timer = useRef<NodeJS.Timeout>();
  const onChangePart = (i, value, append) => {
    const foundValues = value.split("\n").filter((f) => f);
    if (append) {
      parts[i].options = [...(parts[i].options || []), ...foundValues];
    } else {
      parts[i].options = foundValues;
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      console.log("writing");
      writePhrase({ label, parts });
      setX((x) => x + 1);
    }, 1000);
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
          {parts.map(({ value, options }, i) => (
            <Column
              key={options?.join()}
              value={value}
              options={options}
              onChangePart={(value, append) => onChangePart(i, value, append)}
            />
          ))}
        </div>
      </main>
    </NoSSR>
  );
}

type ColumnProps = {
  onChangePart: (value: string, append?: boolean) => void;
} & Part;

const Column = ({ value, options, onChangePart }: ColumnProps) => {
  const suggested = useMemo(() => {
    return Array.isArray(options) ? getSuggested(options) : null;
  }, [options]);
  if (options === undefined || options.length < 2) {
    // Only one value.
    return (
      <div className="column">
        <span className="init">{value}</span>
        <span className="random">{value}</span>
        <textarea className="constant" defaultValue={value} />
      </div>
    );
  }
  // Multiple possible values.
  const random = options[Math.floor(Math.random() * options.length)];
  return (
    <div className="column">
      <span className="init">{value}</span>
      <span className="random">{random}</span>
      <textarea
        className="options"
        defaultValue={options.join("\n")}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChangePart(e.target.value)
        }
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
