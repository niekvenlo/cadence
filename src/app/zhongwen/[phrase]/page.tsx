"use client";

import NoSSR from "../../components/NoSSR";
import BasicLink from "../../components/basic/BasicLink";
import { findPhraseByLabel } from "../phrases";
import "../style.css";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));
  return (
    <NoSSR>
      <main id="zhongwen">
        <div className="top">
          <BasicLink href="/zhongwen">Back</BasicLink>
          <h1>Phrase review</h1>
        </div>
        <div className="phrase">
          <div className="column">
            <span className="init">
              <span className="label">template</span>
            </span>
            <span className="random">
              <span className="label">random</span>
            </span>
          </div>
          {parts.map(({ init, options, constant }, i) => (
            <Column key={i} init={init} options={options} constant={constant} />
          ))}
        </div>
      </main>
    </NoSSR>
  );
}

const Column = ({ init, constant, options }) => {
  if (constant) {
    return (
      <div className="column">
        <span className="init">{constant}</span>
        <span className="random">{constant}</span>
        <span className="random">{constant}</span>
        <span className="random">{constant}</span>
        <span className="random">{constant}</span>
        <span className="random">{constant}</span>
      </div>
    );
  }
  const getRandom = () => options[Math.floor(Math.random() * options.length)];
  return (
    <div className="column">
      <span className="init">{init}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
    </div>
  );
};
