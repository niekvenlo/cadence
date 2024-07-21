"use server";

import fs from "fs/promises";

import type { Phrase } from "./phrase-util-sync";

const phrasesJsonFilePath = "src/app/laolun/phrases.json";
const pinyinJsonFilePath = "src/app/laolun/pinyin.json";

const readPhrases = async () =>
  JSON.parse(await fs.readFile(phrasesJsonFilePath, "utf-8"));
const writePhrases = (data) =>
  fs.writeFile(phrasesJsonFilePath, JSON.stringify(data, null, 2), "utf-8");

const readPinyin = async () =>
  JSON.parse(await fs.readFile(pinyinJsonFilePath, "utf-8"));
const writePinyin = (data) =>
  fs.writeFile(pinyinJsonFilePath, JSON.stringify(data, null, 2), "utf-8");

export const writePhrase = async (phraseToWrite) => {
  phraseToWrite.label = await getSafePhraseLabel(phraseToWrite.label);
  const phrases = (await readPhrases()) as Phrase[];
  const foundPhraseIdx = phrases.findIndex(
    (p) => p.label === phraseToWrite.label
  );
  if (foundPhraseIdx === -1) {
    phrases.push(phraseToWrite);
  } else {
    const oldPhrase = phrases[foundPhraseIdx];
    phrases[foundPhraseIdx] = { ...oldPhrase, ...phraseToWrite };
  }
  writePhrases(phrases);
  return phrases;
};

export const updateLabel = async (oldLabel, newLabel) => {
  const phrases = (await readPhrases()) as Phrase[];
  const foundPhraseIdx = phrases.findIndex((p) => p.label === oldLabel);
  const isNameClash = phrases.some((p) => p.label === newLabel);
  const uniqueLabel = isNameClash
    ? `${newLabel} ${Math.random().toString().slice(14)}`
    : newLabel;
  const safeLabel = getSafePhraseLabel(uniqueLabel);

  if (foundPhraseIdx > -1) {
    phrases[foundPhraseIdx].label = safeLabel;
    writePhrases(phrases);
  }
  return safeLabel;
};

export const setPinyin = async (kanji, pinyin) => {
  const allPinyin = (await readPinyin()) as { [kanji: string]: string }[];
  allPinyin[kanji] = pinyin;
  writePinyin({ ...allPinyin });
};

export const getSafePhraseLabel = (label: string) =>
  label.replace(/[|]/g, "").replace(/[,]/g, "，").replace(/[?]/g, "？");
