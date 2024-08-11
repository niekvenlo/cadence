"use client";

import { hskChars, hskWords, duolingo, sheetList } from "./data";
import "../style.css";

import useLaolunQuery from "../../api/useLaolunQuery";

export default function Chinese() {
  const laolunQuery = useLaolunQuery();
  const phrases = laolunQuery.data?.phrases ?? [];
  const pinyin = laolunQuery.data?.pinyin ?? {};
  const phrasesCharSet = new Set(
    phrases
      .map((phrase) => phrase.parts.map((part) => part.map((c) => c.split(""))))
      .flat(4)
  );
  const sheetSet = new Set(sheetList.map((p) => p.split("")).flat());

  const segmentMap = new Map();
  phrases.forEach((phrase) =>
    phrase.parts.forEach((part) =>
      part.forEach((segment) => {
        segmentMap.set(segment, (segmentMap.get(segment) || 0) + 1);
      })
    )
  );
  const appearOnlyTwice = [...segmentMap]
    .filter((f) => f[1] < 3)
    .map((f) => f[0])
    .sort((a, b) => (a.length < b.length ? -1 : 1));

  const allSegments = phrases
    .map(({ parts }) => parts.map((part) => part))
    .flat(2);

  const getMissingHskWords = (hskwords, count = 0) =>
    hskwords
      .split(/[,]\s/g)
      .filter(
        (word) =>
          allSegments.filter((seg) => seg.includes(word)).length === count
      );

  return (
    <main id="zhongwen">
      <div id="pin">
        <p>
          We cannot fully trust these sources. The Duolingo data comes from a
          third party scraper, and the list of HSK words is shorter than the
          list of HSK characters, which makes no sense.
        </p>
        <p>That said, it&apos;s a start</p>
        {[1, 2, 3, 4, 5].map((level) => {
          const missing = getMissingHskWords(hskWords[level]);
          const usedOnce = getMissingHskWords(hskWords[level], 1);
          const otherNeverUsed = [
            ...new Set(hskChars[level])
              .difference(phrasesCharSet)
              .difference(new Set(missing)),
          ];
          return (
            <details key={level}>
              <summary>
                <h2>
                  HSK{level} <small>({missing.length} never used)</small>
                </h2>
              </summary>

              <L list={missing} title={`HSK${level} words never used`} />
              <L list={usedOnce} title={`HSK${level} words only once`} />
              <L
                list={otherNeverUsed}
                title={`Other HSK${level} chars never used`}
              />
            </details>
          );
        })}
        <L
          list={appearOnlyTwice}
          title="Segments that appear only once or twice standalone"
        />
        <L
          list={[...new Set(duolingo).difference(phrasesCharSet)]}
          title="Only in Duolingo"
        />
        <L
          list={[...sheetSet.difference(phrasesCharSet)]}
          title="Only in Google Sheet"
        />
        <L list={[...phrasesCharSet]} title="In Laolun" />
      </div>
    </main>
  );
}

const L = ({ title, list }) => {
  const cleanList = list.filter((f) => f !== "," && f !== " ");
  return (
    <details>
      <summary>
        <h3>
          {title} <small>({cleanList.length})</small>
        </h3>
      </summary>
      <div className="ddfdx">
        {cleanList.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
    </details>
  );
};
