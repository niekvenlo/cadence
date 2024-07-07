"use client";

import BasicLink from "../../components/basic/BasicLink";
import "../style.css";

import { phrases } from "../phrases";

export default function Chinese() {
  return (
    <main id="zhongwen">
      <div className="top">
        <BasicLink href="/zhongwen">Back</BasicLink>
        <h1>List of phrases</h1>
      </div>
      <div className="sdjhh">
        {phrases.map(({ label }) => (
          <p key={label}>
            <span>{label}</span>
            <BasicLink href={`/zhongwen/${label}`}>[Review]</BasicLink>
            <BasicLink href={`/zhongwen/${label}/edit`}>[Edit]</BasicLink>
          </p>
        ))}
      </div>
    </main>
  );
}
