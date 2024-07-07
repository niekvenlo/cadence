"use client";

import { useMemo, useState } from "react";
import NoSSR from "../../../components/NoSSR";
import BasicLink from "../../../components/basic/BasicLink";
import { findPhraseByLabel, getSuggested } from "../../phrases";
import "../../style.css";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));
  return (
    <NoSSR>
      <main id="zhongwen">
        <div className="top">
          <BasicLink href="/zhongwen">Back</BasicLink>
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
          {parts.map(({ init, options, constant }, i) => (
            <Column key={i} init={init} constant={constant} options={options} />
          ))}
        </div>
      </main>
    </NoSSR>
  );
}

const Column = ({ init, constant, options }) => {
  // const [suggested, setSuggested] = useState<string[] | null>(null);
  const suggested = useMemo(() => {
    return Array.isArray(options) ? getSuggested(options) : null;
  }, [options]);
  if (constant) {
    return (
      <div className="column">
        <span className="init">{constant}</span>
        <span className="random">{constant}</span>
      </div>
    );
  }
  const random = options[Math.floor(Math.random() * options.length)];
  return (
    <div className="column">
      <span className="init">{init}</span>
      <span className="random">{random}</span>
      <textarea defaultValue={options.join("\n")} />
      <div className="suggested">
        {suggested?.map((s) => (
          <div key={s}>{s}</div>
        ))}
      </div>
    </div>
  );
};
