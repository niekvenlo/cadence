import phrasesJson from "./phrases.json";

// I trust that the JSON is correctly formed.
export const phrases = phrasesJson as Phrase[];

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
        const suggestionSet = suggestionMap.get(chars) ?? new Set();
        part.forEach((option) => suggestionSet.add(option));
        suggestionMap.set(chars, suggestionSet);
      });
    });
  });
};

export const getSuggested = (options: string[]) => {
  if (suggestionMap.size < 1) {
    fillSuggestedMap();
  }

  // Return all possible matches, removing the original options.
  return [
    ...new Set(
      ...options.map((chars) => [...(suggestionMap.get(chars) || [])])
    ),
  ].filter((o) => !options.includes(o)) as string[];
};
