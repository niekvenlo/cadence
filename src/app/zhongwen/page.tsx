"use client";

import BasicLink from "../components/basic/BasicLink";
import "./style.css";

import { phrases } from "./phrase-util-sync";

export default function Chinese() {
  return (
    <main id="zhongwen">
      <div className="top">
        <h1>Zhongwen home</h1>
        <BasicLink href="/zhongwen/list">List</BasicLink>
      </div>
      <div className="sdjhh">
        {phrases.map(({ label }) => (
          <p key={label}>
            <span>{label}</span>
          </p>
        ))}
      </div>
    </main>
  );
}
