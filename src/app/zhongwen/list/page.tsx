"use client";

import BasicLink from "../../components/basic/BasicLink";
import "../style.css";

import { phrases } from "../phrase-util-sync";
import { useRef } from "react";
import { writePhrase } from "../phrase-actions-async";
import { cleanChineseString } from "../util";

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
      <Add />
    </main>
  );
}

function Add() {
  const ref = useRef<HTMLInputElement | null>(null);
  const addNewPhrase = () => {
    const messyLabel = ref.current?.value ?? Math.random().toString();
    const label = cleanChineseString(messyLabel).replace("|", "");
    const parts = label.includes("|")
      ? label.split(/|/g).map((f) => [f])
      : label.split(/|/g).map((f) => [f]);
    writePhrase({ label, parts });
  };
  return (
    <div style={{ paddingTop: "3em" }}>
      <input
        ref={ref}
        type="text"
        defaultValue=""
        placeholder="使用'|'符分隔"
      />
      <button onClick={addNewPhrase}>加句子</button>
      <p>Use | to group characters.</p>
    </div>
  );
}
