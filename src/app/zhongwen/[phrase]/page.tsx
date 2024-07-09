"use client";

import NoSSR from "../../components/NoSSR";
import BasicLink from "../../components/basic/BasicLink";
import { findPhraseByLabel } from "../phrase-util-sync";
import "../style.css";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));
  return (
    <NoSSR>
      <main id="zhongwen">
        <div className="top">
          <BasicLink href="/zhongwen/list">Back</BasicLink>
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
          {parts.map((part, i) => (
            <Column key={i} part={part} />
          ))}
        </div>
      </main>
    </NoSSR>
  );
}

const Column = ({ part }) => {
  const value = part[0];
  if (part.length < 2) {
    return (
      <div className="column">
        <span className="init">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
        <span className="random">{value}</span>
      </div>
    );
  }
  const getRandom = () => part[Math.floor(Math.random() * part.length)];
  return (
    <div className="column">
      <span className="init">{value}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="random">{getRandom()}</span>
      <span className="count">{part.length}</span>
    </div>
  );
};
