export const phrases = [
  {
    label: "我爱你",
    parts: [
      { init: "我", options: ["我", "你", "他"] },
      { init: "爱", options: ["爱", "看到", "喜欢", "相信"] },
      { init: "你", options: ["我", "你", "他"] },
    ],
  },
  {
    label: "我给你水",
    parts: [
      { init: "我", options: ["我", "你", "他"] },
      { init: "给", options: ["给"] },
      { init: "你", options: ["我", "你", "他"] },
      { init: "水", options: ["水", "茶", "猫"] },
    ],
  },
  {
    label: "我有茶，你有水",
    parts: [
      { init: "我", options: ["我", "你"] },
      { constant: "有" },
      { init: "茶", options: ["水", "茶"] },
      { constant: "，" },
      { init: "你", options: ["我", "你", "他"] },
      { constant: "有" },
      { init: "水", options: ["水", "茶"] },
    ],
  },
];

export const findPhraseByLabel = (label: string) =>
  phrases.find((phrase) => phrase.label === label) || phrases[0];

const suggestionMap = new Map();

const fillSuggestedMap = () => {
  phrases.map((phrase) => {
    phrase.parts.map(({ options }) =>
      options?.forEach((chars) => {
        const suggestionSet = suggestionMap.get(chars) ?? new Set();
        options.forEach((option) => suggestionSet.add(option));
        suggestionMap.set(chars, suggestionSet);
      })
    );
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
