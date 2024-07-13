"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases } from "./phrase-util-sync";
import NoSSR from "../components/NoSSR";
import { useState } from "react";
import { toShuffle } from "./util";
import Part from "./Part";
import { Accent } from "./Accents";

export default function Chinese() {
  const [reload] = useReload();
  return (
    <main id="zhongwen">
      <div className="top">
        <h1>中文</h1>
        <div className="links">
          <BasicLink href="/zhongwen/list">✏️</BasicLink>
        </div>
      </div>
      <NoSSR>
        <div className="sdjhh">
          <button className="sparkle" onClick={reload}>
            ✨
          </button>
          {toShuffle(phrases).map(({ label, parts }, i) => (
            <span className="phrase-s" key={label + i}>
              {parts.map((part, i) => (
                <Part key={part[0] + i} part={part} />
              ))}
              <span className="part">
                <span className="full-stop char">
                  <span className="pinyin"></span>
                  <span className="tone">{<Accent />}</span>
                  <span className="kanji">。</span>
                </span>
              </span>
            </span>
          ))}
        </div>
      </NoSSR>
    </main>
  );
}

function useReload() {
  const [key, setReload] = useState(0);
  const reload = () => setReload((x) => x + 1);
  return [reload, key] as const;
}
