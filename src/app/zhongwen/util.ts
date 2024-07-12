/**
 * @param {String} chars -like `四点钟`
 * @returns {Boolean} - is every character in this string a Chinese character?
 */
export const getIsChinese = (chars: string = "") =>
  chars
    .split("")
    .every((char) =>
      /[|〇\u4E00-\u9FCC\u3400-\u4DB5\uFA0E\uFA0F\uFA11\uFA13\uFA14\uFA1F\uFA21\uFA23\uFA24\uFA27-\uFA29]|[\ud840-\ud868][\udc00-\udfff]|\ud869[\udc00-\uded6\udf00-\udfff]|[\ud86a-\ud86c][\udc00-\udfff]|\ud86d[\udc00-\udf34\udf40-\udfff]|\ud86e[\udc00-\udc1d]/.test(
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

  ǚ: "x",
  ǜ: "y",

  "": "none",
};
export const getTones = (string: string = "") => {
  return string
    .split(/['abcdfghjklmnpqrstvwxyz]|\s/)
    .filter((d) => d)
    .map((d) => d.replace(/\w/g, ""))
    .map((d) => accents[d] || "");
};
