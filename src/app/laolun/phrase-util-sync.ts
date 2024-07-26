import phrasesJson from "./phrases.json";
import pinyinJson from "./pinyin.json";
import { breakPinyinIntoSylables } from "./util";

// I trust that the JSON is correctly formed.
export const phrases = phrasesJson as Phrase[];
export const pinyin = pinyinJson;

export type Phrase = {
  label: string;
  parts: string[][];
  isFocusedLearning?: boolean;
  isValidateGrammar?: boolean;
};

export const getMissingPinyin = () => {
  const missing: string[] = [];
  phrases.forEach(({ parts }) => {
    parts.forEach((part) => {
      part.forEach((variant) => {
        const isThere = getPinyin(variant, { requireExplicit: true });
        if (!isThere) {
          missing.push(variant);
        }
      });
    });
  });
  return missing;
};

export const getDangerousKanji = () => {
  const kanjiMap = new Map();
  const dangerousKanji = new Map();
  Object.entries(pinyin).forEach(([kanji, pinyin]) => {
    const kan = kanji.split("");
    const pin = breakPinyinIntoSylables(pinyin);
    kan.forEach((k, i) => {
      const p = pin[i];
      if (kanjiMap.get(k) && kanjiMap.get(k) !== p) {
        dangerousKanji.set(k, [kanjiMap.get(k), p]);
      }
      kanjiMap.set(k, p);
    });
  });
  return [...dangerousKanji];
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

export const getPinyin = (
  kanji: string,
  options: {
    requireExplicit?: boolean;
  } = {}
) => {
  const explicit = pinyin[kanji] as string | undefined;
  if (explicit) {
    return explicit;
  }

  if (options.requireExplicit) {
    return;
  }

  // TODO: Partial matches with explicit pinyin.
  const kanjiChars = kanji.split("");
  if (kanjiChars.some((char) => pinyin[char] === undefined)) {
    return "";
  }
  return kanjiChars
    .map((char) => pinyin[char])
    .filter((f) => f)
    .join(" ");
};

export const getSafePhraseLabel = (label: string) =>
  label.replace(/[|]/g, "").replace(/[,]/g, "，").replace(/[?]/g, "？");

export const getSegmentsRarity = () => {
  const segmentsRarityMap = new Map();
  phrases.forEach((phrase) => {
    phrase.parts.forEach((part) => {
      part.forEach((segment) => {
        const count = segmentsRarityMap.get(segment) || 0;
        segmentsRarityMap.set(segment, count + 1);
      });
    });
  });
  const entries = [...segmentsRarityMap];
  const annotatedEntries = entries.map(([segment, count]) => {
    const appearsInOtherEntriesCount =
      entries.filter(([e]) => e.includes(segment)).length - 1;
    return {
      segment,
      baseCount: count,
      appearsInOtherEntriesCount,
      totalCount: appearsInOtherEntriesCount + count,
      length: segment.length,
    };
  });
  return annotatedEntries.sort((a, b) =>
    a.totalCount < b.totalCount ? -1 : 1
  );
};
