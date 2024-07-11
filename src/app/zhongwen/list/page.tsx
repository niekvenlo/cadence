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
        <h1>✏️</h1>
        <div className="links">
          <BasicLink href="/zhongwen">中文</BasicLink>
          <BasicLink href="/zhongwen/pinyin">拼音</BasicLink>
          <BasicLink href="/zhongwen/chars">字符</BasicLink>
        </div>
      </div>
      <div className="sdjhh">
        {phrases.map(({ label }) => (
          <p key={label}>
            <span>{label}</span>
            <BasicLink href={`/zhongwen/${label}`}>👀</BasicLink>
            <BasicLink href={`/zhongwen/${label}/edit`}>✏️</BasicLink>
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
    const label = cleanChineseString(messyLabel);
    const parts = label.includes("|")
      ? label.split("|").map((f) => [f])
      : label.split("").map((f) => [f]);
    console.log(label, label.replace(/[|]/g, ""));
    writePhrase({ label: label.replace(/[|]/g, ""), parts });
  };
  return (
    <div style={{ paddingTop: "3em", display: "flex", gap: "0.1em" }}>
      <input
        ref={ref}
        type="text"
        defaultValue=""
        placeholder="使用'|'符分隔"
      />
      <button className="add" onClick={addNewPhrase}>
        加句子
      </button>
    </div>
  );
}
