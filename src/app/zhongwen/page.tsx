"use client";

import NoSSR from "../components/NoSSR";

import {
  字,
  人,
  冷,
  做,
  物,
  动物,
  东西,
  Sentence,
  刷牙,
  上面,
  颜色,
} from "./components";
import "./style.css";

const pickRandomElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

export default function Chinese() {
  const sentenceStructures = [
    <Sentence>
      <物 />
      <字 is="是" />
      <字 is="什么" />
      <颜色 />
    </Sentence>,

    <Sentence>
      <人 />
      <刷牙>
        <人 relative />
      </刷牙>
    </Sentence>,

    <Sentence>
      <人 pronoun>
        <人 relative />
      </人>
      <字 is="在" />
      <物 />
      <上面 />
      <做 />
      <物 />
    </Sentence>,

    <Sentence>
      <人 pronoun 的>
        <人 relative />
      </人>
    </Sentence>,

    <Sentence>
      <人 />
      <字 is="的" />
      <冷 />
      <东西 />
    </Sentence>,

    <Sentence>
      <人 />
      <做 />
      <物 />
    </Sentence>,

    <Sentence>
      <人 />
      <做 />
      <东西 />
    </Sentence>,

    <Sentence>
      <动物 />
      <做 />
      <人 />
    </Sentence>,

    <Sentence>
      <字 is="在" />
      <物 />
      <上面 />
    </Sentence>,
  ];
  return (
    <NoSSR>
      <main style={{ fontSize: "3em" }}>
        {pickRandomElement(sentenceStructures)}
        {sentenceStructures}
      </main>
    </NoSSR>
  );
}
