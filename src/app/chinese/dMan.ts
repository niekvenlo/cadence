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
  | "HenAdjective"
  | "PvpoVerb"
  | "Number"
  | "NumberPlace"
  | "LongColour"
  | "LongPosition"
  | "Occupation"
  | "Percentage"
  | "PersonAdjective"
  | "Place"
  | "Position"
  | "PropertyOfObject"
  | "PvpVerb"
  | "PvoVerb"
  | "PvvVerb"
  | "Relative"
  | "Sometimes"
  | "SplitChar"
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
  零: { pinyin: "líng", roles: ["Number", "Times", "Percentage"] },
  一: { pinyin: "yi", roles: ["Number", "Times", "Percentage"] },
  二: { pinyin: "èr", roles: ["Times", "Percentage"] },
  两: { pinyin: "liǎng", roles: ["Number"] },
  三: { pinyin: "san", roles: ["Number", "Times", "Percentage"] },
  四: { pinyin: "si", roles: ["Number", "Times", "Percentage"] },
  五: { pinyin: "wu", roles: ["Number", "Times", "Percentage"] },
  六: { pinyin: "liu", roles: ["Number", "Times", "Percentage"] },
  七: { pinyin: "qi", roles: ["Number", "Times", "Percentage"] },
  八: { pinyin: "ba", roles: ["Number", "Times", "Percentage"] },
  九: { pinyin: "jiu", roles: ["Number", "Times", "Percentage"] },
  十: { pinyin: "shí", roles: ["Number", "Times", "Percentage"] },
  十一: { pinyin: "shíyi", roles: ["Number", "Times", "Percentage"] },
  十二: { pinyin: "shí'èr", roles: ["Number", "Times", "Percentage"] },
  十三: { pinyin: "shísan", roles: ["Number", "Times", "Percentage"] },
  十四: { pinyin: "shísi", roles: ["Number", "Times", "Percentage"] },
  十五: { pinyin: "shíwu", roles: ["Number", "Times", "Percentage"] },
  十六: { pinyin: "shíliu", roles: ["Number", "Times", "Percentage"] },
  十七: { pinyin: "shíqi", roles: ["Number", "Times", "Percentage"] },
  十八: { pinyin: "shíba", roles: ["Number", "Times", "Percentage"] },
  十九: { pinyin: "shíjiu", roles: ["Number", "Times", "Percentage"] },
  二十: { pinyin: "èrshí", roles: ["Number", "Times", "Percentage"] },
  三十: { pinyin: "sanshí", roles: ["Number", "Times", "Percentage"] },
  四十: { pinyin: "sishí", roles: ["Number", "Times", "Percentage"] },
  五十: { pinyin: "wushí", roles: ["Number", "Times", "Percentage"] },
  六十: { pinyin: "liushí", roles: ["Number", "Times", "Percentage"] },
  七十: { pinyin: "qishí", roles: ["Number", "Times", "Percentage"] },
  八十: { pinyin: "bashí", roles: ["Number", "Times", "Percentage"] },
  九十: { pinyin: "jiushí", roles: ["Number", "Times", "Percentage"] },
  一百: { pinyin: "yibǎi", roles: ["Number", "Times"] },
  一千: { pinyin: "yiqiān", roles: ["Number", "Times"] },
  百: { pinyin: "yibǎi", roles: ["Percentage"] },
  千: { pinyin: "yiqiān", roles: ["Percentage"] },

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
  一起: { pinyin: "yīqǐ", roles: ["Char"] },
  多少: { pinyin: "duōshǎo", roles: ["Char"] },
  百分之: { pinyin: "bǎi fēn zhī", roles: ["Char"] },
  认知: { pinyin: "rèn zhī", roles: ["Char"] },
  怎么样: { pinyin: "zěnme yàng", roles: ["Char"] },
  吃: { pinyin: "chī", roles: ["Char"] },
  的时候: { pinyin: "de shíhòu", roles: ["Char"] },

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
  厨师: { pinyin: "chúshī", roles: ["Anyone", "Acquaintance", "Occupation"] },
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
  家人: { pinyin: "jiaren", roles: ["Anyone", "Relative"] },
  父母: { pinyin: "fumu", roles: ["Anyone", "Relative"] },
  孩子: { pinyin: "háizi", roles: ["Anyone", "Relative"] },
  女儿: { pinyin: "nuer", roles: ["Anyone", "Relative"] },
  儿子: { pinyin: "erzi", roles: ["Anyone", "Relative"] },
  老公: { pinyin: "laogong", roles: ["Anyone", "Relative"] },
  丈夫: { pinyin: "zhàngfū", roles: ["Anyone", "Relative"] },
  妻子: { pinyin: "qīzi", roles: ["Anyone", "Relative"] },

  猫: { pinyin: "mao", roles: ["Thing", "Animal"], measure: "只" },
  狗: { pinyin: "gou", roles: ["Thing", "Animal"], measure: "只" },
  狼: { pinyin: "lang", roles: ["Thing", "Animal"], measure: "只" },
  马: { pinyin: "ma", roles: ["Thing", "Animal"], measure: "只" },
  猪: { pinyin: "zhū", roles: ["Thing", "Animal"], measure: "只" },
  牛: { pinyin: "niú", roles: ["Thing", "Animal"], measure: "只" },
  羊: { pinyin: "yáng", roles: ["Thing", "Animal"], measure: "只" },
  老虎: { pinyin: "lǎohǔ", roles: ["Thing", "Animal"], measure: "只" },

  动物: { pinyin: "dongwu", roles: ["Thing"], measure: "只" },
  东西: { pinyin: "dōngxī", roles: ["Thing"] },
  菜单: { pinyin: "càidān", roles: ["Thing"] },
  筷子: { pinyin: "kuàizi", roles: ["Thing"] },
  钥匙: { pinyin: "yàoshi", roles: ["Thing"] },
  书: { pinyin: "shū", roles: ["Thing", "Container"] },
  地图: { pinyin: "dìtú", roles: ["Thing"] },
  植物: { pinyin: "zhíwù", roles: ["Thing"] },
  地址: { pinyin: "dìzhǐ", roles: ["Thing"] },
  盘子: { pinyin: "pánzi", roles: ["Thing"] },
  勺子: { pinyin: "sháozi", roles: ["Thing"] },
  伞: { pinyin: "sǎn", roles: ["Thing"], measure: "把" },
  雨伞: { pinyin: "yǔsǎn", roles: ["Thing"], measure: "把" },
  面粉: { pinyin: "miànfěn", roles: ["Thing"] },
  奶油: { pinyin: "nǎiyóu", roles: ["Thing"] },
  卫生纸: { pinyin: "wèishēngzhǐ", roles: ["Thing"], measure: "张" },
  电话: { pinyin: "diànhuà", roles: ["Thing"], measure: "部" },
  电视: { pinyin: "diànshì", roles: ["Thing"], measure: "台" },
  电影: { pinyin: "diànyǐng", roles: ["Thing"] },
  垃圾桶: { pinyin: "lèsè tǒng", roles: ["Thing"] },
  电脑: { pinyin: "diànnǎo", roles: ["Thing"] },
  游戏: { pinyin: "yóuxì", roles: ["Thing"] },
  眼镜: { pinyin: "yǎnjìng", roles: ["Thing"] },
  遥控: { pinyin: "yáokòng", roles: ["Thing"] },

  水: { pinyin: "shuǐ", roles: ["Thing", "Drink"] },
  茶: { pinyin: "chá", roles: ["Thing", "Drink"] },
  咖啡: { pinyin: "kāfēi", roles: ["Thing", "Drink"] },
  啤酒: { pinyin: "píjiǔ", roles: ["Thing", "Drink"] },
  牛奶: { pinyin: "niúnai", roles: ["Thing", "Drink"] },
  可乐: { pinyin: "kělè", roles: ["Thing", "Drink"] },
  红酒: { pinyin: "hóngjiǔ", roles: ["Thing", "Drink"] },
  奶昔: { pinyin: "nǎi xī", roles: ["Thing", "Drink"] },

  面包: { pinyin: "mianbao", roles: ["Thing", "Food"] },
  拉面: { pinyin: "lāmiàn", roles: ["Thing", "Food"] },
  冰淇淋: { pinyin: "bīngqílín", roles: ["Thing", "Food"] },
  三明治: { pinyin: "sānmíngzhì", roles: ["Thing", "Food"] },
  煎饼: { pinyin: "jiānbing", roles: ["Thing", "Food"] },
  鸡蛋: { pinyin: "jīdàn", roles: ["Thing", "Food"] },
  蛋糕: { pinyin: "dàngāo", roles: ["Thing", "Food"] },
  汤: { pinyin: "tāng", roles: ["Thing", "Food"] },
  面条: { pinyin: "miàntiáo", roles: ["Thing", "Food"] },
  花生: { pinyin: "huāshēng", roles: ["Thing", "Food"] },
  早餐: { pinyin: "zǎocān", roles: ["Thing", "Food"] },

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
  附近: { pinyin: "fùjìn", roles: ["Place"] },
  银行: { pinyin: "yínháng", roles: ["Place", "NumberPlace"] },

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
  突然: { pinyin: "túrán", roles: ["Sometimes"] },

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

  好: { pinyin: "hǎo", roles: ["Adjective", "FoodAdjective"] },
  冷: { pinyin: "leng", roles: ["Adjective", "FoodAdjective"] },
  热: {
    pinyin: "re",
    roles: ["Adjective", "FoodAdjective", "PersonAdjective"],
  },
  高: { pinyin: "gao", roles: ["Adjective", "PersonAdjective"] },
  矮: { pinyin: "ai", roles: ["Adjective"] },
  重: { pinyin: "zhòng", roles: ["Adjective", "PersonAdjective"] },
  轻: { pinyin: "qīng", roles: ["Adjective"] },
  重的: { pinyin: "zhòng de", roles: ["Adjective"] },
  很轻: { pinyin: "hěn qīng", roles: ["Adjective"] },
  柔软的: { pinyin: "róuruǎn de", roles: ["Adjective"] },
  高兴: { pinyin: "gāoxìng", roles: ["Adjective"] },
  高兴的: { pinyin: "gāoxìng de", roles: ["Adjective"] },

  // 很漂亮: { pinyin: "hěn piàoliang", roles: ["HenAdjective"] },
  // 很好看: { pinyin: "hěn haokan", roles: ["HenAdjective"] },
  // 很累: { pinyin: "hěn lei", roles: ["HenAdjective"] },
  // 很忙: { pinyin: "hěn mang", roles: ["HenAdjective"] },
  // 很不错: { pinyin: "hěn bucao", roles: ["HenAdjective"] },
  // 很困: { pinyin: "hěn shēngqì", roles: ["HenAdjective"] },
  // 很生气: { pinyin: "hěn kùn", roles: ["HenAdjective"] },
  // 饿了: { pinyin: "èle", roles: ["HenAdjective"] },
  // 很开心: { pinyin: "hěn kāixīn", roles: ["HenAdjective"] },

  看到: { pinyin: "kan dào", roles: ["Verb"] },
  有: { pinyin: "you", roles: ["Char", "Verb"] },
  爱: { pinyin: "ai", roles: ["Verb"] },
  听到: { pinyin: "ting dào", roles: ["Verb"] },
  要: { pinyin: "yao", roles: ["Verb"] },
  需要: { pinyin: "xuyao", roles: ["Verb"] },
  喜欢: { pinyin: "xihuan", roles: ["Verb"] },
  放下: { pinyin: "fàngxià", roles: ["Verb"] },
  忘记: { pinyin: "wàngjì", roles: ["Verb"] },
  找: { pinyin: "zhǎo", roles: ["Verb"] },
  找到: { pinyin: "zhǎodào", roles: ["Verb"] },
  给: { pinyin: "sònggei", roles: ["PvpoVerb"] },
  送给: { pinyin: "gei", roles: ["Char", "PvpoVerb"] },
  叫: { pinyin: "jiào", roles: ["Char", "PvpoVerb"] },
  送: { pinyin: "sòng", roles: ["Char", "PvpoVerb"] },
  明白: { pinyin: "míngbái", roles: ["Char", "PvpVerb"] },
  懂: { pinyin: "dǒng", roles: ["Char", "PvpVerb"] },
  回答: { pinyin: "huídá", roles: ["PvpVerb"] },
  来: { pinyin: "lái", roles: ["Char", "PvvVerb"] },
  带: { pinyin: "dài", roles: ["Char", "PvoVerb"] },
  带来: { pinyin: "dài lái", roles: ["Char", "PvoVerb"] },
  // 叫
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
  第次: { pinyin: ["di", "ci"], roles: ["SplitChar"], split: ["第", "次"] },

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
