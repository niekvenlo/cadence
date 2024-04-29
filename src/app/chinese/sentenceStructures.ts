type One = {
  kanji: string;
  pinyin: string;
  defs?: string[];
}[];

type Sentence = One[];

const _: { [char: string]: One } = {
  不: [{ kanji: "不", pinyin: "bu" }],
  的: [{ kanji: "的", pinyin: "de" }],
  在: [{ kanji: "在", pinyin: "zai" }],
};

export const pronoun: One = [
  { kanji: "我", pinyin: "wo" },
  { kanji: "你", pinyin: "ni" },
  { kanji: "他", pinyin: "ta" },
  { kanji: "她", pinyin: "ta" },
  { kanji: "它", pinyin: "ta" },
  { kanji: "我们", pinyin: "women" },
  { kanji: "你们", pinyin: "nimen" },
  { kanji: "他们", pinyin: "tamen" },
  { kanji: "她们", pinyin: "tamen" },
  { kanji: "它们", pinyin: "tamen" },
];

export const acquaintance: One = [
  { kanji: "朋友", pinyin: "pengyou" },
  { kanji: "老师", pinyin: "laoshi" },
  { kanji: "老板", pinyin: "laoban" },
];

export const relative: One = [
  { kanji: "妈妈", pinyin: "mama" },
  { kanji: "爸爸", pinyin: "baba" },
  { kanji: "叔叔", pinyin: "shushu", defs: ["noun: uncle"] },
];

export const relation = [pronoun, _.的, relative];

export const person = [...pronoun, ...acquaintance, ...relative];

export const verb: One = [
  { kanji: "看", pinyin: "kan" },
  { kanji: "有", pinyin: "you" },
  { kanji: "爱", pinyin: "ai" },
  { kanji: "听", pinyin: "ting" },
  { kanji: "要", pinyin: "yao" },
  { kanji: "需要", pinyin: "xuyao" },
  { kanji: "喜欢", pinyin: "xihuan" },
  { kanji: "最喜欢", pinyin: "zuixihuan" },
];

export const animal: One = [
  { kanji: "猫", pinyin: "mao" },
  { kanji: "狗", pinyin: "gou" },
  { kanji: "狼", pinyin: "lang", defs: ["wolf"] },
  { kanji: "马", pinyin: "ma" },
  { kanji: "动物", pinyin: "dongwu" },
];

export const food: One = [
  { kanji: "牛奶", pinyin: "niunai" },
  { kanji: "面包", pinyin: "mianbao" },
];

export const object: One = [
  { kanji: "帽子", pinyin: "maozi" },
  { kanji: "碗", pinyin: "wan" },
  { kanji: "杯子", pinyin: "beizi" },
];

export const thing = [...animal, ...food, ...object];

export const position: One = [
  { kanji: "上", pinyin: "shang", defs: ["above/over"] },
  { kanji: "上面", pinyin: "shangmian" },
  { kanji: "下", pinyin: "xia" },
  { kanji: "下面", pinyin: "xiamian", defs: ["underneath"] },
  { kanji: "里", pinyin: "li", defs: ["inside of"] },
  { kanji: "里面", pinyin: "limian", defs: ["inside of"] },
  { kanji: "旁边", pinyin: "pangbian", defs: ["next to"] },
  { kanji: "前面", pinyin: "qianmian", defs: ["in front of"] },
  { kanji: "对面", pinyin: "duimian", defs: ["across from"] },
];

export const sentenceStructures: Sentence[] = [
  [person, _.在, object, position, verb, object],
  [...relation, verb, object],
  [person, verb, object],
  [pronoun, _.的, relative, verb, thing],
  [person, _.不, verb, object],
  [animal, verb, person],
  [_.在, object, position],
  [person, verb, relative],
  [pronoun, verb, relative, _.的, acquaintance],
  [pronoun, verb, acquaintance, _.的, [...acquaintance, ...relative]],
];
