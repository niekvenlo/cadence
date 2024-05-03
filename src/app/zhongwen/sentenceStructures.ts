export type Word = {
  kanji: string;
  pinyin: string;
  defs?: string[];
};
export type Split = {
  first: string;
  second: string;
  pinyin: string;
};
export type One = Word[];

export type Sentence = One[];

export const chars: { [char: string]: One } = {
  不: [{ kanji: "不", pinyin: "bu" }],
  的: [{ kanji: "的", pinyin: "de" }],
  在: [{ kanji: "在", pinyin: "zai" }],
  是: [{ kanji: "是", pinyin: "shi" }],
  什么: [{ kanji: "什么", pinyin: "shenme" }],
  是什么: [{ kanji: "是什么", pinyin: "shishenme" }], //
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

export const relation = [pronoun, chars.的, relative];

export const person: One = [...pronoun, ...acquaintance, ...relative];

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
export const splitVerb: Split[] = [
  { first: "刷", second: "牙", pinyin: "shua ya" },
  { first: "跳", second: "舞", pinyin: "tiao wu" },
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

export const adjective: One = [
  { kanji: "冷", pinyin: "leng" },
  { kanji: "热", pinyin: "re" },
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

export const type: One = [
  { kanji: "颜色", pinyin: "yanse" },
  { kanji: "形状", pinyin: "xíngzhuàng" },
];

export const sentenceStructures: Sentence[] = [
  [person, chars.在, object, position, verb, object],
  [...relation, verb, object],
  [person, verb, object],
  [pronoun, chars.的, relative, verb, thing],
  [person, chars.不, verb, object],
  [animal, verb, person],
  [chars.在, object, position],
  [person, verb, relative],
  [pronoun, verb, relative, chars.的, acquaintance],
  [pronoun, verb, acquaintance, chars.的, [...acquaintance, ...relative]],
];
