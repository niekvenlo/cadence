"use client";

import { useMemo } from "react";
import NoSSR from "../../../components/NoSSR";
import BasicLink from "../../../components/basic/BasicLink";
import { Part, findPhraseByLabel, getSuggested } from "../../phrase-util-sync";
import { create } from "../../phrase-actions-async";
import "../../style.css";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));
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
            <Column key={i} value={value} options={options} />
          ))}
        </div>
        <button onClick={() => create()}>ssdsddsd</button>
      </main>
    </NoSSR>
  );
}

const Column = ({ value, options }: Part) => {
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
      <textarea className="options" defaultValue={options.join("\n")} />
      <div className="suggested">
        {suggested?.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </div>
    </div>
  );
};
