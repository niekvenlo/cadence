import phrasesJson from "./phrases.json";
import pinyinJson from "./pinyin.json";

// I trust that the JSON is correctly formed.
export const phrases = phrasesJson as Phrase[];
export const pinyin = pinyinJson;

export type Phrase = {
  label: string;
  parts: string[][];
};

export const findPhraseByLabel = (label: string): Phrase =>
  phrases.find((phrase) => phrase.label === label) || phrases[0];

const suggestionMap = new Map();

const fillSuggestedMap = () => {
  phrases.forEach((phrase) => {
    phrase.parts.forEach((part) => {
      if (part.length < 2) {
        return;
      }
      part.forEach((chars) => {
        const innerMap = suggestionMap.get(chars) ?? new Map();
        part.forEach((option) => {
          const count = innerMap.get(option) || 0;
          innerMap.set(option, count + 1);
        });
        suggestionMap.set(chars, innerMap);
      });
    });
  });
};

export const getSuggested = (options: string[]) => {
  if (suggestionMap.size < 1) {
    fillSuggestedMap();
  }

  const combinedMap = new Map();
  options.forEach((option) => {
    const optionMap = suggestionMap.get(option) || new Map();
    [...optionMap.entries()].forEach(([k, v]) => {
      const countSoFar = combinedMap.get(k) ?? 0;
      combinedMap.set(k, countSoFar + v);
    });
  });

  const sortedSuggestions = [...combinedMap]
    .sort((a, b) => (a[1] > b[1] ? -1 : 1))
    .filter((s) => !options.includes(s[0]))
    .map((s) => s[0]);

  return sortedSuggestions;
};
