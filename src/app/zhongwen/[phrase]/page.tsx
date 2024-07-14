"use client";

import NoSSR from "../../components/NoSSR";
import BasicLink from "../../components/basic/BasicLink";
import { findPhraseByLabel } from "../phrase-util-sync";
import "../style.css";
import { getRandomElement } from "../util";

export default function Chinese({ params }: { params: { phrase: string } }) {
  const { label, parts } = findPhraseByLabel(decodeURI(params.phrase));
  return (
    <NoSSR>
      <main id="zhongwen">
        <div className="top">
          <BasicLink href="/zhongwen/list">Back</BasicLink>
          <h1>Phrase review</h1>
        </div>
        <ol
          style={{
            width: "80%",
            fontSize: "1.5em",
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} style={{ paddingBlock: "0.5em" }}>
              {parts.map((part) => getRandomElement(part))}
            </li>
          ))}
        </ol>
      </main>
    </NoSSR>
  );
}
