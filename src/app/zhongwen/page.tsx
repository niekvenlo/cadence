"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases } from "./phrases";

export default function Chinese() {
  return (
    <main id="zhongwen">
      <h1>List of phrases</h1>
      <div className="sdjhh">
        {phrases.map(({ label }) => (
          <p key={label}>
            {label}
            <BasicLink href={`/zhongwen/${label}`}>[Review]</BasicLink>
            <BasicLink href={`/zhongwen/${label}/edit`}>[Edit]</BasicLink>
          </p>
        ))}
      </div>
    </main>
  );
}
