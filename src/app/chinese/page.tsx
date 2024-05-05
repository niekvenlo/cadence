"use client";

import NoSSR from "../components/NoSSR";
import { Paragraph, Sentence, $, C, useReload } from "./components";
import "./style.css";

export default function Chinese() {
  const { reload, key } = useReload();
  const sentenceVariants = [
    () => {
      // const animal = <$.Animal />;
      return (
        <Sentence key="{animal}{relative}给{animal}{relative}{drink}">
          <$.Animal />
          <$.Relative />
          <C 给 />
          <$.Animal />
          <$.Relative />
          <$.Drink />
        </Sentence>
      );
    },
    <Sentence key="{anyone}{pvp-verb}{anyone}">
      <$.WeOrThey />
      <$.PvpVerb />
      <$.Relative />
    </Sentence>,
    <Sentence key="{anyone}{give-verb}{anyone}{thing}">
      <$.Anyone />
      <$.GiveVerb />
      <$.Anyone />
      <$.Thing />
    </Sentence>,
    <Sentence key="{number}{occupation}">
      <$.Occupation number />
    </Sentence>,
    <Sentence key="{anyone}会去{thing}">
      <$.WeOrThey />
      <C 会 />
      <C 去 />
      <$.Place />
      <C 吗 />
    </Sentence>,
    <Sentence key="{number}{number-place}">
      <$.NumberPlace number />
    </Sentence>,
    <Sentence key="{we-or-they(relative)}是{occupation}">
      <$.WeOrThey>
        <$.Relative />
      </$.WeOrThey>
      <C 是 />
      <$.Occupation />
    </Sentence>,
    <Sentence key="{time}{anyone}{verb}{food}">
      <$.Time />
      <$.Anyone />
      <$.Verb />
      <$.Food />
    </Sentence>,
    <Sentence key="{anyone}{time}{verb}{animal}">
      <$.Anyone />
      <$.Time />
      <$.Verb />
      <$.Container />
      <C 吗 />
    </Sentence>,
    <Sentence key="{we}{time-not-past}去{place}吧">
      <$.We />
      <$.TimeNotPast />
      <C 去 />
      <$.Place />
      <C 吧 />
    </Sentence>,
    <Sentence key="{anyone}喝{adjective}{drink}">
      <$.Anyone />
      <C 喝 />
      <$.FoodAdjective />
      <$.Drink />
    </Sentence>,
    <Sentence key="{anyone}决定喝{drink}">
      <$.Anyone />
      <C 决定 />
      <C 喝 />
      <$.Drink />
    </Sentence>,
    <Sentence key="{anyone}{sometimes}{split-verb(person)}">
      <$.Anyone />
      <$.Sometimes />
      <$.SplitVerb>
        <$.Anyone />
      </$.SplitVerb>
    </Sentence>,
    <Sentence key="{animal}{verb}{animal}{conjuction}{anyone}{verb}{food}">
      <$.Animal />
      <$.Verb />
      <$.Animal />
      <C />
      <$.Conjunction />
      <$.Anyone />
      <$.Verb />
      <$.Food />
    </Sentence>,
    <Sentence key="{anyone}{verb}{anyone}">
      <$.Anyone />
      <$.Verb />
      <$.Anyone />
    </Sentence>,
    <Sentence key="{these}{relative}{verb}">
      <$.These />
      <$.Relative />
      <$.Verb />
    </Sentence>,
    <Sentence key="{anyone}{verb}{container}{conjunction}{animal}喝{drink}">
      <$.Anyone />
      <$.Verb />
      <$.Container />
      <C />
      <$.Conjunction />
      <$.Animal />
      <C 喝 />
      <$.Drink />
    </Sentence>,
    <Sentence key="{animal}{verb}{anyone}吗">
      <$.Animal />
      <$.Verb />
      <$.Anyone />
      <C 吗 />
    </Sentence>,
    <Sentence key="{animal}{verb}{anyone}">
      <$.Animal />
      <$.Verb />
      <$.Anyone />
    </Sentence>,
    <Sentence key="{relative}{verb}{adjective}{thing}">
      <$.Relative />
      <$.Verb />
      <$.Adjective />
      <$.Thing />
    </Sentence>,
    <Sentence key="{relative}{verb}{colour}{thing}">
      <$.Relative />
      <$.Verb />
      <$.Colour />
      <$.Thing />
    </Sentence>,
    <Sentence key="{relative}{verb}{colour}色的{thing}">
      <$.Relative />
      <$.Verb />
      <$.Colour />
      <$.Thing />
    </Sentence>,
    <Sentence key="{person(person)}{verb}{food}">
      <$.Anyone>
        <$.Relative />
      </$.Anyone>
      <$.Verb />
      <$.Food />
    </Sentence>,
    <Sentence key="{anyone}{sometimes}{verb}{food}">
      <$.Anyone />
      <$.Verb />
      <$.Food />
    </Sentence>,
    <Sentence key="给{anyone}{thing}">
      <C 给 />
      <$.Anyone />
      <$.Thing />
    </Sentence>,
    <Sentence key="{animal}是{long-colour}和{animal}是{long-colour}">
      <$.Animal />
      <C 是 />
      <$.LongColour />
      <C 和 />
      <$.Animal />
      <C 是 />
      <$.LongColour />
    </Sentence>,
    <Sentence key="{thing}是什么{property-of-object}">
      <$.Thing />
      <C 是 />
      <C 什么 />
      <$.PropertyOfObject />
    </Sentence>,
    <Sentence key="那{number}{thing(number)}是什么{property-of-object}">
      <C 那 />
      <$.Thing number />
      <C 是 />
      <C 什么 />
      <$.PropertyOfObject />
    </Sentence>,
    <Sentence key="{time}{container}{position}有{colour}{thing}">
      <$.Time />
      <$.Container />
      <$.Position />
      <C 有 />
      <$.Colour />
      <$.Thing />
    </Sentence>,
    <Sentence key="{anyone}的{container}{position}有{anyone}的{thing}">
      <$.Anyone>
        <$.Container />
      </$.Anyone>
      <$.Position />
      <C 有 />
      <$.Anyone>
        <$.Thing />
      </$.Anyone>
    </Sentence>,
    <Sentence key="{anyone}不可以在{place}{split-verb}">
      <$.Anyone />
      <C 不 />
      <C 可以 />
      <C 在 />
      <$.Place />
      <$.SplitVerb />
    </Sentence>,
    <Sentence key="{anyone}在{container}{position}">
      <$.Anyone />
      <C 在 />
      <$.Container />
      <$.Position />
    </Sentence>,
    <Sentence key="{anyone}很{person-adjective}">
      <$.Anyone />
      <C 很 />
      <$.PersonAdjective />
    </Sentence>,
    <Sentence key="{that}是{anyone(thing)}">
      <$.That />
      <C 是 />
      <$.Anyone>
        <$.Thing />
      </$.Anyone>
      <C 吗 />
    </Sentence>,
    <Sentence key="{number}块钱">
      <$.Number />
      <C 块钱 />
    </Sentence>,

    <Paragraph key="{number}">
      <Sentence>
        <$.That />
        <C 是 />
        <C 叫 />
        <C 什么 />
      </Sentence>
      <Sentence>
        <$.That />
        <C 是 />
        <C 叫 />
        <$.Thing />
      </Sentence>
    </Paragraph>,
    <Sentence key="{">
      <$.SplitConcept>
        <$.Number />
      </$.SplitConcept>
    </Sentence>,
    <Sentence key="第九十次">
      <C 第次>
        <$.Times />
      </C>
    </Sentence>,
  ]
    .sort(() => 0.5 - Math.random())
    .sort(() => 0.5 - Math.random())
    .slice(0, 20)
    .map((variant) => {
      if (variant instanceof Function) {
        return variant();
      }
      return variant;
    });
  return (
    <NoSSR>
      <main key={key}>
        <div className="sentence">
          <button className="reload" onClick={reload} aria-label="Refresh text">
            ✨
          </button>
          {sentenceVariants}
        </div>
      </main>
    </NoSSR>
  );
}
