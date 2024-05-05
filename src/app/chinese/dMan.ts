export type Role =
  | "Acquaintance"
  | "Adjective"
  | "Animal"
  | "Anyone"
  | "Char"
  | "Colour"
  | "Conjunction"
  | "Container"
  | "Drink"
  | "Food"
  | "FoodAdjective"
  | "GiveVerb"
  | "Number"
  | "NumberPlace"
  | "LongColour"
  | "LongPosition"
  | "Occupation"
  | "PersonAdjective"
  | "Place"
  | "Position"
  | "PropertyOfObject"
  | "PvpVerb"
  | "Relative"
  | "Sometimes"
  | "SplitConcept"
  | "SplitVerb"
  | "These"
  | "There"
  | "That"
  | "Thing"
  | "Time"
  | "Times"
  | "TimeNotPast"
  | "Vehicle"
  | "Verb"
  | "We"
  | "WeOrThey";
export type W = {
  kanji: string | string[];
  pinyin: string | string[];
  split?: string[];
  measure?: string;
  defs?: string[];
};

const dMan: {
  [key: string]: {
    pinyin: string | string[];
    roles: Role[];
    measure?: string;
    split?: string[];
    defs?: string[];
  };
} = {
  零: { pinyin: "líng", roles: ["Number", "Times"] },
  一: { pinyin: "yi", roles: ["Number", "Times"] },
  二: { pinyin: "èr", roles: ["Times"] },
  两: { pinyin: "liǎng", roles: ["Number"] },
  三: { pinyin: "san", roles: ["Number", "Times"] },
  四: { pinyin: "si", roles: ["Number", "Times"] },
  五: { pinyin: "wu", roles: ["Number", "Times"] },
  六: { pinyin: "liu", roles: ["Number", "Times"] },
  七: { pinyin: "qi", roles: ["Number", "Times"] },
  八: { pinyin: "ba", roles: ["Number", "Times"] },
  九: { pinyin: "jiu", roles: ["Number", "Times"] },
  十: { pinyin: "shí", roles: ["Number", "Times"] },
  十一: { pinyin: "shíyi", roles: ["Number", "Times"] },
  十二: { pinyin: "shí'èr", roles: ["Number", "Times"] },
  十三: { pinyin: "shísan", roles: ["Number", "Times"] },
  十四: { pinyin: "shísi", roles: ["Number", "Times"] },
  十五: { pinyin: "shíwu", roles: ["Number", "Times"] },
  十六: { pinyin: "shíliu", roles: ["Number", "Times"] },
  十七: { pinyin: "shíqi", roles: ["Number", "Times"] },
  十八: { pinyin: "shíba", roles: ["Number", "Times"] },
  十九: { pinyin: "shíjiu", roles: ["Number", "Times"] },
  二十: { pinyin: "èrshí", roles: ["Number", "Times"] },
  三十: { pinyin: "sanshí", roles: ["Number", "Times"] },
  四十: { pinyin: "sishí", roles: ["Number", "Times"] },
  五十: { pinyin: "wushí", roles: ["Number", "Times"] },
  六十: { pinyin: "liushí", roles: ["Number", "Times"] },
  七十: { pinyin: "qishí", roles: ["Number", "Times"] },
  八十: { pinyin: "bashí", roles: ["Number", "Times"] },
  九十: { pinyin: "jiushí", roles: ["Number", "Times"] },
  一百: { pinyin: "yibǎi", roles: ["Number", "Times"] },
  一千: { pinyin: "yiqiān", roles: ["Number", "Times"] },

  "。": { pinyin: ".", roles: ["Char"] },
  "，": { pinyin: ",", roles: ["Char"] },

  个: { pinyin: "ge", roles: ["Char"] },
  只: { pinyin: "zhǐ", roles: ["Char"] },
  不: { pinyin: "bu", roles: ["Char"] },
  的: { pinyin: "de", roles: ["Char"] },
  在: { pinyin: "zai", roles: ["Char"] },
  是: { pinyin: "shi", roles: ["Char"] },
  什么: { pinyin: "shenme", roles: ["Char"] },
  哪: { pinyin: "nǎ", roles: ["Char"] },
  了: { pinyin: "le", roles: ["Char"] },
  位: { pinyin: "wèi", roles: ["Char"] },
  会: { pinyin: "huì", roles: ["Char"] },
  去: { pinyin: "qù", roles: ["Char"] },
  色: { pinyin: "sè", roles: ["Char"] },
  吗: { pinyin: "ma", roles: ["Char"] },
  吧: { pinyin: "ba", roles: ["Char"] },
  所: { pinyin: "suǒ", roles: ["Char"] },
  和: { pinyin: "hé", roles: ["Char"] },
  能: { pinyin: "néng", roles: ["Char"] },
  块钱: { pinyin: "kuài qián", roles: ["Char"] },
  决定: { pinyin: "juédìng", roles: ["Char"] },

  我: { pinyin: "wo", roles: ["Anyone", "WeOrThey", "We"] },
  你: { pinyin: "ni", roles: ["Anyone", "WeOrThey", "We"] },
  他: { pinyin: "ta", roles: ["Anyone", "WeOrThey"] },
  她: { pinyin: "ta", roles: ["Anyone", "WeOrThey"] },
  它: { pinyin: "ta", roles: ["WeOrThey"] },

  我们: { pinyin: "women", roles: ["Anyone", "WeOrThey", "We"] },
  你们: { pinyin: "nimen", roles: ["Anyone", "WeOrThey", "We"] },
  他们: { pinyin: "tamen", roles: ["Anyone", "WeOrThey"] },
  她们: { pinyin: "tamen", roles: ["Anyone", "WeOrThey"] },
  它们: { pinyin: "tamen", roles: ["WeOrThey"] },

  朋友: { pinyin: "péngyǒu", roles: ["Anyone", "Acquaintance"] },
  男朋友: { pinyin: "nan péngyǒu", roles: ["Anyone", "Acquaintance"] },
  女朋友: { pinyin: "nǚ péngyǒu", roles: ["Anyone", "Acquaintance"] },
  老师: {
    pinyin: "laoshi",
    roles: ["Anyone", "Acquaintance", "Occupation"],
    measure: "位",
  },
  老板: { pinyin: "laoban", roles: ["Anyone", "Acquaintance", "Occupation"] },
  服务员: { pinyin: "fúwùyuán", roles: ["Anyone", "Occupation"] },
  医生: {
    pinyin: "yīshēng",
    roles: ["Anyone", "Acquaintance", "Occupation"],
    measure: "名",
  },
  学生: { pinyin: "xuéshēng", roles: ["Occupation"] },

  妈妈: { pinyin: "mama", roles: ["Anyone", "Relative"] },
  爸爸: { pinyin: "baba", roles: ["Anyone", "Relative"] },
  哥哥: { pinyin: "gege", roles: ["Anyone", "Relative"] },
  姐姐: { pinyin: "jiejie", roles: ["Anyone", "Relative"] },
  妹妹: { pinyin: "meimei", roles: ["Anyone", "Relative"] },
  弟弟: { pinyin: "didi", roles: ["Anyone", "Relative"] },
  叔叔: { pinyin: "shushu", roles: ["Anyone", "Relative"] },
  爷爷: { pinyin: "yeye", roles: ["Anyone", "Relative"] },
  奶奶: { pinyin: "nainai", roles: ["Anyone", "Relative"] },

  猫: { pinyin: "mao", roles: ["Thing", "Animal"], measure: "只" },
  狗: { pinyin: "gou", roles: ["Thing", "Animal"], measure: "只" },
  狼: { pinyin: "lang", roles: ["Thing", "Animal"], measure: "只" },
  马: { pinyin: "ma", roles: ["Thing", "Animal"], measure: "只" },
  猪: { pinyin: "zhū", roles: ["Thing", "Animal"], measure: "只" },
  牛: { pinyin: "niú", roles: ["Thing", "Animal"], measure: "只" },
  羊: { pinyin: "yáng", roles: ["Thing", "Animal"], measure: "只" },
  老虎: { pinyin: "lǎohǔ", roles: ["Thing", "Animal"], measure: "只" },
  动物: { pinyin: "dongwu", roles: ["Thing", "Animal"], measure: "只" },

  东西: { pinyin: "dōngxī", roles: ["Thing"] },
  菜单: { pinyin: "càidān", roles: ["Thing"] },
  筷子: { pinyin: "kuàizi", roles: ["Thing"] },
  钥匙: { pinyin: "yàoshi", roles: ["Thing"] },
  书: { pinyin: "shū", roles: ["Thing"] },
  地图: { pinyin: "dìtú", roles: ["Thing"] },
  植物: { pinyin: "zhíwù", roles: ["Thing"] },

  水: { pinyin: "shuǐ", roles: ["Thing", "Drink"] },
  茶: { pinyin: "chá", roles: ["Thing", "Drink"] },
  咖啡: { pinyin: "kāfēi", roles: ["Thing", "Drink"] },
  啤酒: { pinyin: "píjiǔ", roles: ["Thing", "Drink"] },
  牛奶: { pinyin: "niúnai", roles: ["Thing", "Drink"] },
  可乐: { pinyin: "kělè", roles: ["Thing", "Drink"] },

  面包: { pinyin: "mianbao", roles: ["Thing", "Food"] },
  拉面: { pinyin: "lāmiàn", roles: ["Thing", "Food"] },
  冰淇淋: { pinyin: "bīngqílín", roles: ["Thing", "Food"] },
  三明治: { pinyin: "sānmíngzhì", roles: ["Thing", "Food"] },
  煎饼: { pinyin: "jiānbing", roles: ["Thing", "Food"] },
  鸡蛋: { pinyin: "jīdàn", roles: ["Thing", "Food"] },
  蛋糕: { pinyin: "dàngāo", roles: ["Thing", "Food"] },

  帽子: { pinyin: "maozi", roles: ["Thing", "Container"] },
  碗: { pinyin: "wan", roles: ["Thing", "Container"] },
  杯子: { pinyin: "beizi", roles: ["Thing", "Container"] },
  瓶子: { pinyin: "píngzi", roles: ["Thing", "Container"] },
  房子: { pinyin: "fángzi", roles: ["Thing", "Container"] },
  冰箱: { pinyin: "bīngxiāng", roles: ["Thing", "Container"] },

  汽车: { pinyin: "qìchē", roles: ["Thing", "Vehicle", "Container"] },
  飞机: { pinyin: "fēijī", roles: ["Thing", "Vehicle", "Container"] },
  火车: { pinyin: "huǒchē", roles: ["Thing", "Vehicle", "Container"] },
  地铁: { pinyin: "dìtiě", roles: ["Thing", "Vehicle", "Container"] },
  自行车: { pinyin: "zìxíngchē", roles: ["Thing", "Vehicle"] },

  外面: { pinyin: "wàimiàn", roles: ["Place"] },
  城市: { pinyin: "chéngshì", roles: ["Place"] },
  公园: { pinyin: "gōngyuán", roles: ["Place"] },
  中国: { pinyin: "zhōngguó", roles: ["Place"] },
  荷兰: { pinyin: "hélán", roles: ["Place"] },
  马来西亚: { pinyin: "mǎláixīyà", roles: ["Place"] },

  //
  家: { pinyin: "jiā", roles: ["Place", "NumberPlace", "Container"] },
  饭馆: { pinyin: "fànguǎn", roles: ["Place", "NumberPlace", "Container"] },
  医院: { pinyin: "yīyuàn", roles: ["Place", "NumberPlace", "Container"] },
  森林: { pinyin: "sēnlín", roles: ["Place", "NumberPlace", "Container"] },
  商店: {
    pinyin: "shāngdiàn",
    roles: ["Thing", "Place", "NumberPlace", "Container"],
  },
  学校: {
    pinyin: "xuéxiào",
    roles: ["Thing", "Place", "NumberPlace", "Container"],
    measure: "所",
  },

  上: { pinyin: "shang", roles: ["Position"], defs: ["above/over"] },
  下: { pinyin: "xia", roles: ["Position"] },
  里: { pinyin: "li", roles: ["Position"], defs: ["inside of"] },
  前: { pinyin: "qian", roles: ["Position"], defs: ["in front of"] },
  旁: { pinyin: "pang", roles: ["Position"], defs: ["next to"] },
  旁边: {
    pinyin: "pangbian",
    roles: ["Position", "LongPosition"],
    defs: ["next to"],
  },
  上面: { pinyin: "shangmian", roles: ["Position", "LongPosition"] },
  下面: {
    pinyin: "xiamian",
    roles: ["Position", "LongPosition"],
    defs: ["underneath"],
  },
  里面: {
    pinyin: "limian",
    roles: ["Position", "LongPosition"],
    defs: ["inside of"],
  },
  前面: {
    pinyin: "qianmian",
    roles: ["Position", "LongPosition"],
    defs: ["in front of"],
  },
  对面: {
    pinyin: "duimian",
    roles: ["Position", "LongPosition"],
    defs: ["across from"],
  },

  好: { pinyin: "hǎo", roles: ["Adjective", "FoodAdjective"] },
  冷: { pinyin: "leng", roles: ["Adjective", "FoodAdjective"] },
  热: { pinyin: "re", roles: ["Adjective", "FoodAdjective"] },
  高: { pinyin: "gao", roles: ["Adjective"] },
  矮: { pinyin: "ai", roles: ["Adjective"] },
  高兴: { pinyin: "gāoxìng", roles: ["Adjective"] },
  漂亮: { pinyin: "piàoliang", roles: ["Adjective", "PersonAdjective"] },
  好看: { pinyin: "haokan", roles: ["PersonAdjective"] },
  累: { pinyin: "lei", roles: ["PersonAdjective"] },
  忙: { pinyin: "mang", roles: ["PersonAdjective"] },
  不错: { pinyin: "bucao", roles: ["PersonAdjective"] },

  红: { pinyin: "hóng", roles: ["Colour"] },
  蓝: { pinyin: "lán", roles: ["Colour"] },
  黄: { pinyin: "huáng", roles: ["Colour"] },
  绿: { pinyin: "lǜ", roles: ["Colour"] },
  白: { pinyin: "bái", roles: ["Colour"] },
  黑: { pinyin: "hēi", roles: ["Colour"] },
  红色: { pinyin: "hóngsè", roles: ["Colour", "LongColour"] },
  蓝色: { pinyin: "lánsè", roles: ["Colour", "LongColour"] },
  黄色: { pinyin: "huángsè", roles: ["Colour", "LongColour"] },
  绿色: { pinyin: "lǜsè", roles: ["Colour", "LongColour"] },
  白色: { pinyin: "báisè", roles: ["Colour", "LongColour"] },
  黑色: { pinyin: "hēisè", roles: ["Colour", "LongColour"] },

  颜色: { pinyin: "yanse", roles: ["PropertyOfObject"] },
  形状: { pinyin: "xíngzhuàng", roles: ["PropertyOfObject"] },

  这: { pinyin: "zhège", roles: ["That"] },
  那: { pinyin: "nàgè", roles: ["That", "Char"] },

  这个: { pinyin: "zhège", roles: ["These"] },
  这些: { pinyin: "zhèxiē", roles: ["These"] },
  那个: { pinyin: "nàgè", roles: ["These"] },
  那些: { pinyin: "nàxiē", roles: ["These"] },

  这儿: { pinyin: "zhè'er", roles: ["There", "Place"] },
  那儿: { pinyin: "nà'er", roles: ["There", "Place"] },
  那里: { pinyin: "nàlǐ", roles: ["There", "Place"] },
  这里: { pinyin: "zhèlǐ", roles: ["There", "Place"] },

  经常: { pinyin: "jīngcháng", roles: ["Sometimes"] },
  常常: { pinyin: "chángcháng", roles: ["Sometimes"] },
  有时: { pinyin: "yǒushí", roles: ["Sometimes"] },
  总是: { pinyin: "zǒng shì", roles: ["Sometimes"] },

  早上: { pinyin: "zǎoshang", roles: ["Time", "TimeNotPast"] },
  现在: { pinyin: "xiànzài", roles: ["Time", "TimeNotPast"] },
  一会儿: { pinyin: "yīhuǐ'er", roles: ["Time", "TimeNotPast"] },
  下午: { pinyin: "xiàwǔ", roles: ["Time", "TimeNotPast"] },
  晚上: { pinyin: "wǎnshàng", roles: ["Time", "TimeNotPast"] },
  前天: { pinyin: "qiántiān", roles: ["Time"] },
  昨天: { pinyin: "zuótiān", roles: ["Time"] },
  今天: { pinyin: "jīntiān", roles: ["Time", "TimeNotPast"] },
  明天: { pinyin: "míngtiān", roles: ["Time", "TimeNotPast"] },
  后天: { pinyin: "hòutiān", roles: ["Time", "TimeNotPast"] },
  今天下午: { pinyin: "jīntiānxiàwǔ", roles: ["Time", "TimeNotPast"] },

  周一: { pinyin: "zhōu", roles: ["Time", "TimeNotPast"] },
  周二: { pinyin: "zhōu'èr", roles: ["Time", "TimeNotPast"] },
  周三: { pinyin: "zhōusān", roles: ["Time", "TimeNotPast"] },
  周四: { pinyin: "zhōu sì", roles: ["Time", "TimeNotPast"] },
  周五: { pinyin: "zhōu wu", roles: ["Time", "TimeNotPast"] },
  周六: { pinyin: "zhōuliu", roles: ["Time", "TimeNotPast"] },
  周日: { pinyin: "zhōu rì", roles: ["Time", "TimeNotPast"] },
  周末: { pinyin: "zhōumò", roles: ["Time", "TimeNotPast"] },

  星期一: { pinyin: "xīngqí yī", roles: ["Time", "TimeNotPast"] },
  星期二: { pinyin: "xīngqí'èr", roles: ["Time", "TimeNotPast"] },
  星期三: { pinyin: "xīngqí sān", roles: ["Time", "TimeNotPast"] },
  星期四: { pinyin: "xīngqí sì", roles: ["Time", "TimeNotPast"] },
  星期五: { pinyin: "xīngqí wu", roles: ["Time", "TimeNotPast"] },
  星期六: { pinyin: "xīngqí liu", roles: ["Time", "TimeNotPast"] },
  星期日: { pinyin: "xīngqí rì", roles: ["Time", "TimeNotPast"] },

  一点钟: { pinyin: "yīdiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  一点半: { pinyin: "yīdiǎn bàn", roles: ["Time", "TimeNotPast"] },
  两点钟: { pinyin: "liǎngdiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  两点半: { pinyin: "liǎngdiǎn bàn", roles: ["Time", "TimeNotPast"] },
  三点钟: { pinyin: "sandiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  三点半: { pinyin: "sandiǎn bàn", roles: ["Time", "TimeNotPast"] },
  四点钟: { pinyin: "sidiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  四点半: { pinyin: "sidiǎn bàn", roles: ["Time", "TimeNotPast"] },
  五点钟: { pinyin: "wudiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  五点半: { pinyin: "wudiǎn bàn", roles: ["Time", "TimeNotPast"] },
  六点钟: { pinyin: "liudiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  六点半: { pinyin: "liudiǎn bàn", roles: ["Time", "TimeNotPast"] },
  七点钟: { pinyin: "qidiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  七点半: { pinyin: "qidiǎn bàn", roles: ["Time", "TimeNotPast"] },
  八点钟: { pinyin: "badiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  八点半: { pinyin: "badiǎn bàn", roles: ["Time", "TimeNotPast"] },
  九点钟: { pinyin: "jiudiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  九点半: { pinyin: "jiudiǎn bàn", roles: ["Time", "TimeNotPast"] },
  十点钟: { pinyin: "shídiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  十点半: { pinyin: "shídiǎn bàn", roles: ["Time", "TimeNotPast"] },
  十一点钟: { pinyin: "shí yīdiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  十一点半: { pinyin: "shí yīdiǎn bàn", roles: ["Time", "TimeNotPast"] },
  十两点钟: { pinyin: "shí liǎngdiǎn zhōng", roles: ["Time", "TimeNotPast"] },
  十两点半: { pinyin: "shí liǎngdiǎn bàn", roles: ["Time", "TimeNotPast"] },

  看到: { pinyin: "kan dào", roles: ["Verb"] },
  有: { pinyin: "you", roles: ["Char", "Verb"] },
  爱: { pinyin: "ai", roles: ["Verb"] },
  听到: { pinyin: "ting dào", roles: ["Verb"] },
  要: { pinyin: "yao", roles: ["Verb"] },
  需要: { pinyin: "xuyao", roles: ["Verb"] },
  喜欢: { pinyin: "xihuan", roles: ["Verb"] },
  放下: { pinyin: "fàngxià", roles: ["Verb"] },
  给: { pinyin: "gei", roles: ["Char", "GiveVerb"] },
  叫: { pinyin: "jiào", roles: ["Char", "GiveVerb"] },
  送: { pinyin: "sòng", roles: ["Char", "GiveVerb"] },
  明白: { pinyin: "míngbái", roles: ["Char", "PvpVerb"] },
  懂: { pinyin: "dǒng", roles: ["Char", "PvpVerb"] },
  来: { pinyin: "lái", roles: ["Char", "PvpVerb"] },
  忘记: { pinyin: "wàngjì", roles: ["Char", "Verb"] },
  // 叫
  找: { pinyin: "zhǎo", roles: ["Verb"] },
  找到: { pinyin: "zhǎodào", roles: ["Verb"] },
  喝: { pinyin: "hē", roles: ["Char"] },

  刷牙: { pinyin: ["shua", "ya"], roles: ["SplitVerb"], split: ["刷", "牙"] },
  跳舞: { pinyin: ["tiao", "wu"], roles: ["SplitVerb"], split: ["跳", "舞"] },
  吃饭: { pinyin: ["chī", "fàn"], roles: ["SplitVerb"], split: ["吃", "饭"] },
  喝水: { pinyin: ["hē", "shuǐ"], roles: ["SplitVerb"], split: ["喝", "水"] },
  喝咖啡: {
    pinyin: ["hē", "kāfēi"],
    roles: ["SplitVerb"],
    split: ["喝", "咖啡"],
  },
  第次: { pinyin: ["di", "ci"], roles: ["SplitConcept"], split: ["第", "次"] },

  因为: { pinyin: "yīnwèi", roles: ["Conjunction"] },
  所以: { pinyin: "suǒyǐ", roles: ["Conjunction"] },
  然后: { pinyin: "ránhòu", roles: ["Conjunction"] },
  而且: { pinyin: "érqiě", roles: ["Conjunction"] },
  但是: { pinyin: "dànshì", roles: ["Conjunction"] },
  当然: { pinyin: "dāngrán", roles: ["Conjunction"] },
};

/**
 * We iterate over all the listed kanji entries, and map them to each role.
 * The map contains, for each role, a list of each kanji entry that matches.
 */
const rolesMap = new Map<string, W[]>();
Object.entries(dMan).forEach(([k, v]) => {
  const w = { kanji: k, ...v };
  v.roles.forEach((role) => {
    if (rolesMap.has(role)) {
      rolesMap.get(role)!.push(w);
    } else {
      rolesMap.set(role, [w]);
    }
  });
});

/**
 *
 * @param  role What roles should this kanji match?
 * @returns List of Words matching the role.
 */
export const getWordsByRole = (role: Role) => {
  return (rolesMap.get(role) || [{ kanji: "X", pinyin: "missing" }]) as W[];
};

/**
 *
 * @param char Literal kanji to look up
 * @returns Word
 */
export const getWordByChar = (char: string): W => ({
  kanji: char,
  pinyin: dMan[char]?.pinyin || char,
  split: dMan[char]?.split,
});
