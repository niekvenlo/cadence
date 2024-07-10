"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { useRef } from "react";

export default function Chinese() {
  return (
    <main id="zhongwen">
      <div className="top">
        <h1>Zhongwen home</h1>
        <BasicLink href="/zhongwen/list">List</BasicLink>
      </div>
      <NoSSR>
        <div className="sdjhh">
          {phrases
            .toSorted((a, b) => (Math.random() < 0.4 ? -1 : 1))
            .map(({ label, parts }) => (
              <Phrase key={label} parts={parts} />
            ))}
        </div>
      </NoSSR>
    </main>
  );
}

function Phrase({ parts }) {
  return (
    <div className="phrase-s">
      {parts.map((part, i) => (
        <Chars part={part} key={i} />
      ))}
      。
    </div>
  );
}

let random = Math.floor((Date.now() / 100) * 1000);
const getRandomIndex = (arr) => arr[random++ % arr.length];

function Chars({ part }) {
  const style = useRef({
    color: `hsl(${200 + Math.random() * 100}, 60%, 60%)`,
  });
  const chars = getRandomIndex(part);
  const data = part.filter((c) => c !== chars).join("―");
  return (
    <button
      className="chars"
      style={style.current}
      data-part={data.length < 1 ? null : data}
    >
      {chars}
    </button>
  );
}
