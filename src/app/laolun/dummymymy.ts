import { pinyin } from "./phrase-util-sync";

var breakPinyinIntoSylables = (string = "") => {
  const normalString = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return string
    .replace(/([aieouǎěǐǔǒāēīōūàèìòùáíéóúǚǜ])([bcdfghjklmpqstvwxyz])/g, "$1 $2")
    .replace(/(n)([bdfhjklmnpqstwxyz])/g, "$1 $2")
    .replace(/(r)([fhlmpqsyz])/g, "$1 $2") //
    .replace(/(ng)([abcdfgjklmnpqstuwxyz])/g, "$1 $2")
    .replace(/([?,])/g, " $1 ")
    .replace(/(diǎnr)/g, " $1 ")
    .replace(/(rén)/g, " $1 ")
    .replace(/(rèn)/g, " $1 ")
    .replace(/(rán)/g, " $1 ")
    .replace(/(zài)/g, " $1 ")
    .replace(/(niú)/g, " $1 ")
    .replace(/(nǎi)/g, " $1 ")
    .replace(/(hěn)/g, " $1 ")
    .replace(/(bù)([an])/g, "$1 $2")
    .replace(/(gè)([rn])/g, "$1 $2")
    .replace(/(kě)([n])/g, "$1 $2")
    .trim();
};
var some = Object.values(pinyin);
var countSyl = (string) => string.split(/[-]|[']|\s/).filter((d) => d).length;
var tryEm = some.map(([charCount, pinyin]) => {
  const appearsCorrectLength =
    countSyl(breakPinyinIntoSylables(pinyin)) === charCount;
  if (appearsCorrectLength) {
    return null;
  }
  return breakPinyinIntoSylables(pinyin);
});
// console.log(
//   tryEm.length,
//   tryEm.filter((g) => g).length,
//   tryEm.filter((g) => g)
// );
