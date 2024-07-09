"use server";

import fs from "fs/promises";

import type { Phrase } from "./phrase-util-sync";

const jsonFilePath = "src/app/zhongwen/phrases.json";

const readPhrases = async () =>
  JSON.parse(await fs.readFile(jsonFilePath, "utf-8"));
const writePhrases = (data) =>
  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");

export const writePhrase = async (phraseToWrite) => {
  const phrases = (await readPhrases()) as Phrase[];
  const foundPhraseIdx = phrases.findIndex(
    (p) => p.label === phraseToWrite.label
  );
  if (foundPhraseIdx === -1) {
    phrases.push(phraseToWrite);
  } else {
    console.log("found", foundPhraseIdx);
    phrases[foundPhraseIdx] = phraseToWrite;
  }
  writePhrases(phrases);
  return phrases;
};
