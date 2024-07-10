"use server";

import fs from "fs/promises";

import type { Phrase } from "./phrase-util-sync";

const phrasesJsonFilePath = "src/app/zhongwen/phrases.json";
const pinyinJsonFilePath = "src/app/zhongwen/phrases.json";

const readPhrases = async () =>
  JSON.parse(await fs.readFile(phrasesJsonFilePath, "utf-8"));
const writePhrases = (data) =>
  fs.writeFile(phrasesJsonFilePath, JSON.stringify(data, null, 2), "utf-8");

const readPinyin = async () =>
  JSON.parse(await fs.readFile(pinyinJsonFilePath, "utf-8"));
const writePinyin = (data) =>
  fs.writeFile(pinyinJsonFilePath, JSON.stringify(data, null, 2), "utf-8");

export const writePhrase = async (phraseToWrite) => {
  const phrases = (await readPhrases()) as Phrase[];
  const foundPhraseIdx = phrases.findIndex(
    (p) => p.label === phraseToWrite.label
  );
  if (foundPhraseIdx === -1) {
    phrases.push(phraseToWrite);
  } else {
    phrases[foundPhraseIdx] = phraseToWrite;
  }
  writePhrases(phrases);
  return phrases;
};

export const setPinyin = async (kanji, pinyin) => {
  const allPinyin = (await readPinyin()) as { [kanji: string]: string }[];
  allPinyin[kanji] = pinyin;
  writePinyin(allPinyin);
};
