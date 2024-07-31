/**
 * @param {String} chars -like `四点钟`
 * @returns {Boolean} - is every character in this string a Chinese character?
 */
export const getIsChinese = (chars: string = "") =>
  chars
    .split("")
    .every((char) =>
      /[、？，|〇\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(
        char
      )
    );

export const cleanChineseString = (chars: string = "") =>
  chars
    .replace(/\s/g, "")
    .replace(/./g, (char) => (getIsChinese(char) ? char : ""));

const accents = {
  ǎ: "wiggle",
  ě: "wiggle",
  ǐ: "wiggle",
  ǔ: "wiggle",
  ǒ: "wiggle",

  ā: "sing",
  ē: "sing",
  ī: "sing",
  ō: "sing",
  ū: "sing",

  à: "state",
  è: "state",
  ì: "state",
  ò: "state",
  ù: "state",

  á: "ask",
  í: "ask",
  é: "ask",
  ó: "ask",
  ú: "ask",

  ǚ: "wiggle",
  ǜ: "state",

  "": "none",
};
export const getTones = (string: string = "") => {
  return string
    .split(/[-'abcdfghjklmnpqrstvwxyz]|\s/)
    .filter((d) => d)
    .map((d) => d.replace(/\w/g, ""))
    .map((d) => accents[d] || "");
};
export const breakPinyinIntoSylables = (string: string = "") => {
  return string.split(/[-]|[']|\s/).filter((d) => d);
};

export const breakRawPinyin = (string = "") =>
  string
    .replace(/([aieouǎěǐǔǒāēīōūàèìòùáíéóúǚǜ])([bcdfghjklmpqstvwxyz])/g, "$1-$2")
    .replace(/(n)([bcdfhjklmnpqstwxyz])/g, "$1-$2")
    .replace(/(r)([fhlmpqsyz])/g, "$1-$2") //
    .replace(/(ng)([abcdfgjklmnpqstuwxyz])/g, "$1-$2")
    .replace(/([?,])/g, " $1 ");

export function toChunk<T>(array: T[], size: number): T[][] {
  const chunks: any[] = [];
  for (let i = 0; i < array.length; i = i + size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function toShuffle<T>(array: T[]): T[] {
  const copy = [...array];
  let cIdx = array.length;

  // While there remain elements to shuffle...
  while (cIdx != 0) {
    // Pick a remaining element...
    let rIdx = Math.floor(Math.random() * cIdx);
    cIdx--;

    // And swap it with the current element.
    [copy[cIdx], copy[rIdx]] = [copy[rIdx], copy[cIdx]];
  }
  return copy;
}

export const getRandomElement = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];
