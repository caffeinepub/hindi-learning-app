export interface HindiCharacter {
  char: string;
  transliteration: string;
  meaning?: string;
  examples?: { word: string; transliteration: string; meaning: string }[];
}

export const VOWELS: HindiCharacter[] = [
  {
    char: "अ",
    transliteration: "a",
    examples: [
      { word: "अब", transliteration: "ab", meaning: "now" },
      { word: "अच्छा", transliteration: "achcha", meaning: "good" },
      { word: "अम्मा", transliteration: "amma", meaning: "mother" },
    ],
  },
  {
    char: "आ",
    transliteration: "aa",
    examples: [
      { word: "आम", transliteration: "aam", meaning: "mango" },
      { word: "आग", transliteration: "aag", meaning: "fire" },
      { word: "आकाश", transliteration: "aakaash", meaning: "sky" },
    ],
  },
  {
    char: "इ",
    transliteration: "i",
    examples: [
      { word: "इमली", transliteration: "imli", meaning: "tamarind" },
      { word: "इनाम", transliteration: "inaam", meaning: "reward" },
    ],
  },
  {
    char: "ई",
    transliteration: "ii",
    examples: [
      { word: "ईख", transliteration: "iikh", meaning: "sugarcane" },
      { word: "ईमान", transliteration: "iimaan", meaning: "honesty" },
    ],
  },
  {
    char: "उ",
    transliteration: "u",
    examples: [
      { word: "उल्लू", transliteration: "ullu", meaning: "owl" },
      { word: "उम्मीद", transliteration: "ummid", meaning: "hope" },
    ],
  },
  {
    char: "ऊ",
    transliteration: "uu",
    examples: [
      { word: "ऊन", transliteration: "uun", meaning: "wool" },
      { word: "ऊँट", transliteration: "uunt", meaning: "camel" },
    ],
  },
  {
    char: "ए",
    transliteration: "e",
    examples: [
      { word: "एक", transliteration: "ek", meaning: "one" },
      { word: "एड़ी", transliteration: "edii", meaning: "heel" },
    ],
  },
  {
    char: "ऐ",
    transliteration: "ai",
    examples: [
      { word: "ऐनक", transliteration: "ainak", meaning: "glasses" },
      { word: "ऐसा", transliteration: "aisa", meaning: "like this" },
    ],
  },
  {
    char: "ओ",
    transliteration: "o",
    examples: [
      { word: "ओस", transliteration: "os", meaning: "dew" },
      { word: "ओखली", transliteration: "okhali", meaning: "mortar" },
    ],
  },
  {
    char: "औ",
    transliteration: "au",
    examples: [
      { word: "औरत", transliteration: "aurat", meaning: "woman" },
      { word: "औजार", transliteration: "aujaar", meaning: "tool" },
    ],
  },
  {
    char: "अं",
    transliteration: "am",
    examples: [
      { word: "अंगूर", transliteration: "anguur", meaning: "grapes" },
      { word: "अंधेरा", transliteration: "andhera", meaning: "darkness" },
    ],
  },
  {
    char: "अः",
    transliteration: "ah",
    examples: [
      { word: "अतः", transliteration: "atah", meaning: "therefore" },
      { word: "प्रातः", transliteration: "praatah", meaning: "morning" },
    ],
  },
];

export const CONSONANTS: HindiCharacter[] = [
  {
    char: "क",
    transliteration: "ka",
    examples: [
      { word: "कमल", transliteration: "kamal", meaning: "lotus" },
      { word: "काम", transliteration: "kaam", meaning: "work" },
      { word: "किताब", transliteration: "kitaab", meaning: "book" },
    ],
  },
  {
    char: "ख",
    transliteration: "kha",
    examples: [
      { word: "खाना", transliteration: "khaana", meaning: "food" },
      { word: "खेत", transliteration: "khet", meaning: "field" },
    ],
  },
  {
    char: "ग",
    transliteration: "ga",
    examples: [
      { word: "गाय", transliteration: "gaay", meaning: "cow" },
      { word: "गाना", transliteration: "gaana", meaning: "song" },
    ],
  },
  {
    char: "घ",
    transliteration: "gha",
    examples: [
      { word: "घर", transliteration: "ghar", meaning: "home" },
      { word: "घोड़ा", transliteration: "ghoda", meaning: "horse" },
    ],
  },
  {
    char: "ङ",
    transliteration: "nga",
    examples: [
      { word: "पंक्ति", transliteration: "pankti", meaning: "row/line" },
    ],
  },
  {
    char: "च",
    transliteration: "cha",
    examples: [
      { word: "चाय", transliteration: "chaay", meaning: "tea" },
      { word: "चाँद", transliteration: "chaand", meaning: "moon" },
    ],
  },
  {
    char: "छ",
    transliteration: "chha",
    examples: [
      { word: "छाता", transliteration: "chhaata", meaning: "umbrella" },
      { word: "छत", transliteration: "chhat", meaning: "roof" },
    ],
  },
  {
    char: "ज",
    transliteration: "ja",
    examples: [
      { word: "जल", transliteration: "jal", meaning: "water" },
      { word: "जनम", transliteration: "janam", meaning: "birth" },
    ],
  },
  {
    char: "झ",
    transliteration: "jha",
    examples: [
      { word: "झील", transliteration: "jhil", meaning: "lake" },
      { word: "झूठ", transliteration: "jhuuth", meaning: "lie" },
    ],
  },
  {
    char: "ञ",
    transliteration: "nya",
    examples: [
      { word: "ज्ञान", transliteration: "gyaan", meaning: "knowledge" },
    ],
  },
  {
    char: "ट",
    transliteration: "ta",
    examples: [
      { word: "टमाटर", transliteration: "tamaatar", meaning: "tomato" },
      { word: "टोपी", transliteration: "topi", meaning: "hat" },
    ],
  },
  {
    char: "ठ",
    transliteration: "tha",
    examples: [
      { word: "ठंडा", transliteration: "thanda", meaning: "cold" },
      { word: "ठीक", transliteration: "thiik", meaning: "correct" },
    ],
  },
  {
    char: "ड",
    transliteration: "da",
    examples: [
      { word: "डाक", transliteration: "daak", meaning: "mail" },
      { word: "डर", transliteration: "dar", meaning: "fear" },
    ],
  },
  {
    char: "ढ",
    transliteration: "dha",
    examples: [
      { word: "ढोल", transliteration: "dhol", meaning: "drum" },
      { word: "ढक्कन", transliteration: "dhakkan", meaning: "lid" },
    ],
  },
  {
    char: "ण",
    transliteration: "na",
    examples: [
      { word: "कण", transliteration: "kan", meaning: "particle" },
      { word: "गणना", transliteration: "ganana", meaning: "counting" },
    ],
  },
  {
    char: "त",
    transliteration: "ta",
    examples: [
      { word: "तारा", transliteration: "taara", meaning: "star" },
      { word: "तोता", transliteration: "tota", meaning: "parrot" },
    ],
  },
  {
    char: "थ",
    transliteration: "tha",
    examples: [
      { word: "थाली", transliteration: "thaali", meaning: "plate" },
      { word: "थकान", transliteration: "thakaan", meaning: "tiredness" },
    ],
  },
  {
    char: "द",
    transliteration: "da",
    examples: [
      { word: "दरवाजा", transliteration: "darvaaza", meaning: "door" },
      { word: "दूध", transliteration: "duudh", meaning: "milk" },
    ],
  },
  {
    char: "ध",
    transliteration: "dha",
    examples: [
      { word: "धरती", transliteration: "dharti", meaning: "earth" },
      { word: "धुआँ", transliteration: "dhuaan", meaning: "smoke" },
    ],
  },
  {
    char: "न",
    transliteration: "na",
    examples: [
      { word: "नमस्ते", transliteration: "namaste", meaning: "hello" },
      { word: "नाम", transliteration: "naam", meaning: "name" },
    ],
  },
  {
    char: "प",
    transliteration: "pa",
    examples: [
      { word: "पानी", transliteration: "paani", meaning: "water" },
      { word: "पत्ता", transliteration: "patta", meaning: "leaf" },
    ],
  },
  {
    char: "फ",
    transliteration: "pha",
    examples: [
      { word: "फूल", transliteration: "phul", meaning: "flower" },
      { word: "फल", transliteration: "phal", meaning: "fruit" },
    ],
  },
  {
    char: "ब",
    transliteration: "ba",
    examples: [
      { word: "बाजार", transliteration: "baazaar", meaning: "market" },
      { word: "बच्चा", transliteration: "bachcha", meaning: "child" },
    ],
  },
  {
    char: "भ",
    transliteration: "bha",
    examples: [
      { word: "भाई", transliteration: "bhaaii", meaning: "brother" },
      { word: "भालू", transliteration: "bhaalu", meaning: "bear" },
    ],
  },
  {
    char: "म",
    transliteration: "ma",
    examples: [
      { word: "माँ", transliteration: "maan", meaning: "mother" },
      { word: "मछली", transliteration: "machhli", meaning: "fish" },
    ],
  },
  {
    char: "य",
    transliteration: "ya",
    examples: [
      { word: "यात्रा", transliteration: "yaatra", meaning: "journey" },
      { word: "युवा", transliteration: "yuva", meaning: "young" },
    ],
  },
  {
    char: "र",
    transliteration: "ra",
    examples: [
      { word: "रात", transliteration: "raat", meaning: "night" },
      { word: "रोटी", transliteration: "roti", meaning: "bread" },
    ],
  },
  {
    char: "ल",
    transliteration: "la",
    examples: [
      { word: "लाल", transliteration: "laal", meaning: "red" },
      { word: "लड़की", transliteration: "ladkii", meaning: "girl" },
    ],
  },
  {
    char: "व",
    transliteration: "va",
    examples: [
      { word: "वर्षा", transliteration: "varsha", meaning: "rain" },
      { word: "विद्यालय", transliteration: "vidyaalay", meaning: "school" },
    ],
  },
  {
    char: "श",
    transliteration: "sha",
    examples: [
      { word: "शेर", transliteration: "sher", meaning: "lion" },
      { word: "शहर", transliteration: "shahar", meaning: "city" },
    ],
  },
  {
    char: "ष",
    transliteration: "sha",
    examples: [
      { word: "षट्कोण", transliteration: "shatkon", meaning: "hexagon" },
    ],
  },
  {
    char: "स",
    transliteration: "sa",
    examples: [
      { word: "सूरज", transliteration: "suuraj", meaning: "sun" },
      { word: "सपना", transliteration: "sapna", meaning: "dream" },
    ],
  },
  {
    char: "ह",
    transliteration: "ha",
    examples: [
      { word: "हाथ", transliteration: "haath", meaning: "hand" },
      { word: "हाथी", transliteration: "haathi", meaning: "elephant" },
    ],
  },
  {
    char: "क्ष",
    transliteration: "ksha",
    examples: [
      { word: "क्षमा", transliteration: "kshama", meaning: "forgiveness" },
      { word: "क्षेत्र", transliteration: "kshetra", meaning: "region" },
    ],
  },
  {
    char: "त्र",
    transliteration: "tra",
    examples: [
      { word: "त्रिशूल", transliteration: "trishul", meaning: "trident" },
      { word: "त्योहार", transliteration: "tyohaar", meaning: "festival" },
    ],
  },
  {
    char: "ज्ञ",
    transliteration: "gya",
    examples: [
      { word: "ज्ञान", transliteration: "gyaan", meaning: "knowledge" },
      { word: "ज्ञानी", transliteration: "gyaani", meaning: "wise" },
    ],
  },
];

export const ALL_CHARACTERS: HindiCharacter[] = [...VOWELS, ...CONSONANTS];

export const COMMON_WORDS: HindiCharacter[] = [
  { char: "नमस्ते", transliteration: "namaste", meaning: "hello" },
  { char: "धन्यवाद", transliteration: "dhanyavaad", meaning: "thank you" },
  { char: "हाँ", transliteration: "haan", meaning: "yes" },
  { char: "नहीं", transliteration: "nahin", meaning: "no" },
  { char: "पानी", transliteration: "paani", meaning: "water" },
  { char: "खाना", transliteration: "khaana", meaning: "food" },
  { char: "घर", transliteration: "ghar", meaning: "home" },
  { char: "स्कूल", transliteration: "school", meaning: "school" },
];

// Matra signs (vowel diacritics) - for khadi table
export interface Matra {
  vowel: string; // standalone vowel (अ, आ, ...)
  matra: string; // matra sign appended to consonant ('' for अ, 'ा' for आ, ...)
  transliteration: string;
}

export const MATRAS: Matra[] = [
  { vowel: "अ", matra: "", transliteration: "a" },
  { vowel: "आ", matra: "ा", transliteration: "aa" },
  { vowel: "इ", matra: "ि", transliteration: "i" },
  { vowel: "ई", matra: "ी", transliteration: "ii" },
  { vowel: "उ", matra: "ु", transliteration: "u" },
  { vowel: "ऊ", matra: "ू", transliteration: "uu" },
  { vowel: "ए", matra: "े", transliteration: "e" },
  { vowel: "ऐ", matra: "ै", transliteration: "ai" },
  { vowel: "ओ", matra: "ो", transliteration: "o" },
  { vowel: "औ", matra: "ौ", transliteration: "au" },
  { vowel: "अं", matra: "ं", transliteration: "am" },
  { vowel: "अः", matra: "ः", transliteration: "ah" },
  { vowel: "ऋ", matra: "ृ", transliteration: "ri" },
  { vowel: "अँ", matra: "ँ", transliteration: "an" },
];

// Half consonants use virama (्)
export interface HalfConsonant {
  full: string;
  half: string;
  transliteration: string;
  example: string;
  exampleMeaning: string;
  examples?: { word: string; transliteration: string; meaning: string }[];
}

export const HALF_CONSONANTS: HalfConsonant[] = [
  {
    full: "क",
    half: "क्",
    transliteration: "k",
    example: "क्त",
    exampleMeaning: "k+ta",
    examples: [
      { word: "क्रम", transliteration: "kram", meaning: "order" },
      { word: "क्षण", transliteration: "kshan", meaning: "moment" },
    ],
  },
  {
    full: "ख",
    half: "ख्",
    transliteration: "kh",
    example: "ख्याल",
    exampleMeaning: "thought",
  },
  {
    full: "ग",
    half: "ग्",
    transliteration: "g",
    example: "ग्राम",
    exampleMeaning: "village",
    examples: [
      { word: "ग्रह", transliteration: "grah", meaning: "planet" },
      { word: "ग्रीष्म", transliteration: "griishm", meaning: "summer" },
    ],
  },
  {
    full: "घ",
    half: "घ्",
    transliteration: "gh",
    example: "घ्राण",
    exampleMeaning: "smell",
  },
  {
    full: "च",
    half: "च्",
    transliteration: "ch",
    example: "च्यवन",
    exampleMeaning: "fall",
  },
  {
    full: "ज",
    half: "ज्",
    transliteration: "j",
    example: "ज्ञान",
    exampleMeaning: "knowledge",
  },
  {
    full: "ट",
    half: "ट्",
    transliteration: "t",
    example: "ट्रक",
    exampleMeaning: "truck",
  },
  {
    full: "ड",
    half: "ड्",
    transliteration: "d",
    example: "ड्रामा",
    exampleMeaning: "drama",
  },
  {
    full: "त",
    half: "त्",
    transliteration: "t",
    example: "त्वचा",
    exampleMeaning: "skin",
    examples: [
      { word: "त्वचा", transliteration: "tvacha", meaning: "skin" },
      { word: "त्रुटि", transliteration: "truti", meaning: "error" },
    ],
  },
  {
    full: "थ",
    half: "थ्",
    transliteration: "th",
    example: "थ्रिलर",
    exampleMeaning: "thriller",
  },
  {
    full: "द",
    half: "द्",
    transliteration: "d",
    example: "द्वार",
    exampleMeaning: "door",
    examples: [
      { word: "द्वार", transliteration: "dvaar", meaning: "door" },
      { word: "द्वीप", transliteration: "dviip", meaning: "island" },
    ],
  },
  {
    full: "ध",
    half: "ध्",
    transliteration: "dh",
    example: "ध्यान",
    exampleMeaning: "attention",
  },
  {
    full: "न",
    half: "न्",
    transliteration: "n",
    example: "न्याय",
    exampleMeaning: "justice",
    examples: [
      { word: "न्याय", transliteration: "nyaay", meaning: "justice" },
      { word: "न्यूनतम", transliteration: "nyuuntam", meaning: "minimum" },
    ],
  },
  {
    full: "प",
    half: "प्",
    transliteration: "p",
    example: "प्रेम",
    exampleMeaning: "love",
    examples: [
      { word: "प्रेम", transliteration: "prem", meaning: "love" },
      { word: "प्रकाश", transliteration: "prakaash", meaning: "light" },
    ],
  },
  {
    full: "फ",
    half: "फ्",
    transliteration: "ph",
    example: "फ्रूट",
    exampleMeaning: "fruit",
  },
  {
    full: "ब",
    half: "ब्",
    transliteration: "b",
    example: "ब्रह्म",
    exampleMeaning: "brahma",
    examples: [
      { word: "ब्रह्म", transliteration: "brahm", meaning: "divine" },
      { word: "ब्राह्मण", transliteration: "brahman", meaning: "brahmin" },
    ],
  },
  {
    full: "भ",
    half: "भ्",
    transliteration: "bh",
    example: "भ्रमण",
    exampleMeaning: "travel",
  },
  {
    full: "म",
    half: "म्",
    transliteration: "m",
    example: "म्यूजिक",
    exampleMeaning: "music",
    examples: [{ word: "म्यूजिक", transliteration: "myuujik", meaning: "music" }],
  },
  {
    full: "य",
    half: "य्",
    transliteration: "y",
    example: "य्वान",
    exampleMeaning: "youth",
  },
  {
    full: "र",
    half: "र्",
    transliteration: "r",
    example: "र्क",
    exampleMeaning: "(suffix)",
  },
  {
    full: "ल",
    half: "ल्",
    transliteration: "l",
    example: "ल्हासा",
    exampleMeaning: "Lhasa",
  },
  {
    full: "व",
    half: "व्",
    transliteration: "v",
    example: "व्यापार",
    exampleMeaning: "business",
    examples: [
      { word: "व्यापार", transliteration: "vyaapaar", meaning: "business" },
      { word: "व्यक्ति", transliteration: "vyakti", meaning: "person" },
    ],
  },
  {
    full: "श",
    half: "श्",
    transliteration: "sh",
    example: "श्रम",
    exampleMeaning: "labor",
    examples: [
      { word: "श्रम", transliteration: "shram", meaning: "labor" },
      { word: "श्रेष्ठ", transliteration: "shresth", meaning: "best" },
    ],
  },
  {
    full: "ष",
    half: "ष्",
    transliteration: "sh",
    example: "ष्टि",
    exampleMeaning: "(suffix)",
  },
  {
    full: "स",
    half: "स्",
    transliteration: "s",
    example: "स्कूल",
    exampleMeaning: "school",
    examples: [
      { word: "स्कूल", transliteration: "skuul", meaning: "school" },
      { word: "स्वास्थ्य", transliteration: "svaasthy", meaning: "health" },
    ],
  },
  {
    full: "ह",
    half: "ह्",
    transliteration: "h",
    example: "ह्रदय",
    exampleMeaning: "heart",
    examples: [{ word: "ह्रदय", transliteration: "hraday", meaning: "heart" }],
  },
];

// Common consonants used for Khadi (14 khadi = the vowel matra table)
export const KHADI_CONSONANTS = [
  "क",
  "ख",
  "ग",
  "घ",
  "ङ",
  "च",
  "छ",
  "ज",
  "झ",
  "ञ",
  "ट",
  "ठ",
  "ड",
  "ढ",
  "ण",
  "त",
  "थ",
  "द",
  "ध",
  "न",
  "प",
  "फ",
  "ब",
  "भ",
  "म",
  "य",
  "र",
  "ल",
  "व",
  "श",
  "ष",
  "स",
  "ह",
];

// Word formation examples
export interface WordExample {
  word: string;
  parts: { char: string; role: "consonant" | "matra" | "vowel" }[];
  transliteration: string;
  meaning: string;
}

export const WORD_EXAMPLES: WordExample[] = [
  {
    word: "काम",
    parts: [
      { char: "क", role: "consonant" },
      { char: "ा", role: "matra" },
      { char: "म", role: "consonant" },
    ],
    transliteration: "kaam",
    meaning: "work",
  },
  {
    word: "पानी",
    parts: [
      { char: "प", role: "consonant" },
      { char: "ा", role: "matra" },
      { char: "न", role: "consonant" },
      { char: "ी", role: "matra" },
    ],
    transliteration: "paani",
    meaning: "water",
  },
  {
    word: "घर",
    parts: [
      { char: "घ", role: "consonant" },
      { char: "र", role: "consonant" },
    ],
    transliteration: "ghar",
    meaning: "home",
  },
  {
    word: "नमस्ते",
    parts: [
      { char: "न", role: "consonant" },
      { char: "म", role: "consonant" },
      { char: "स्", role: "consonant" },
      { char: "त", role: "consonant" },
      { char: "े", role: "matra" },
    ],
    transliteration: "namaste",
    meaning: "hello",
  },
  {
    word: "किताब",
    parts: [
      { char: "क", role: "consonant" },
      { char: "ि", role: "matra" },
      { char: "त", role: "consonant" },
      { char: "ा", role: "matra" },
      { char: "ब", role: "consonant" },
    ],
    transliteration: "kitaab",
    meaning: "book",
  },
  {
    word: "दिल",
    parts: [
      { char: "द", role: "consonant" },
      { char: "ि", role: "matra" },
      { char: "ल", role: "consonant" },
    ],
    transliteration: "dil",
    meaning: "heart",
  },
  {
    word: "सूरज",
    parts: [
      { char: "स", role: "consonant" },
      { char: "ू", role: "matra" },
      { char: "र", role: "consonant" },
      { char: "ज", role: "consonant" },
    ],
    transliteration: "suuraj",
    meaning: "sun",
  },
  {
    word: "खेत",
    parts: [
      { char: "ख", role: "consonant" },
      { char: "े", role: "matra" },
      { char: "त", role: "consonant" },
    ],
    transliteration: "khet",
    meaning: "field",
  },
];

// Syllable examples for Khadi page popover
export const SYLLABLE_EXAMPLES: Record<
  string,
  { word: string; transliteration: string; meaning: string }[]
> = {
  क: [{ word: "कमल", transliteration: "kamal", meaning: "lotus" }],
  का: [{ word: "काम", transliteration: "kaam", meaning: "work" }],
  कि: [{ word: "किताब", transliteration: "kitaab", meaning: "book" }],
  की: [{ word: "चाबी", transliteration: "chaabi", meaning: "key" }],
  कु: [{ word: "कुत्ता", transliteration: "kutta", meaning: "dog" }],
  कू: [{ word: "कूड़ा", transliteration: "kuuda", meaning: "trash" }],
  के: [{ word: "केला", transliteration: "kela", meaning: "banana" }],
  कै: [{ word: "कैमरा", transliteration: "kaimara", meaning: "camera" }],
  को: [{ word: "कोयल", transliteration: "koyal", meaning: "cuckoo" }],
  कौ: [{ word: "कौआ", transliteration: "kaua", meaning: "crow" }],
  ग: [{ word: "गाय", transliteration: "gaay", meaning: "cow" }],
  गा: [{ word: "गाना", transliteration: "gaana", meaning: "song" }],
  गि: [{ word: "गिलास", transliteration: "gilaas", meaning: "glass" }],
  गु: [{ word: "गुलाब", transliteration: "gulaab", meaning: "rose" }],
  गे: [{ word: "गेंद", transliteration: "gend", meaning: "ball" }],
  त: [{ word: "तारा", transliteration: "taara", meaning: "star" }],
  ता: [{ word: "तालाब", transliteration: "taalaab", meaning: "pond" }],
  ति: [{ word: "तितली", transliteration: "titali", meaning: "butterfly" }],
  तु: [{ word: "तुलसी", transliteration: "tulsi", meaning: "basil" }],
  ते: [{ word: "तेल", transliteration: "tel", meaning: "oil" }],
  न: [{ word: "नाम", transliteration: "naam", meaning: "name" }],
  ना: [{ word: "नाव", transliteration: "naav", meaning: "boat" }],
  नि: [{ word: "निशान", transliteration: "nishaan", meaning: "mark" }],
  नु: [{ word: "नुकसान", transliteration: "nuksaan", meaning: "loss" }],
  ने: [{ word: "नेत्र", transliteration: "netr", meaning: "eye" }],
  प: [{ word: "पानी", transliteration: "paani", meaning: "water" }],
  पा: [{ word: "पाठ", transliteration: "paath", meaning: "lesson" }],
  पि: [{ word: "पिता", transliteration: "pita", meaning: "father" }],
  पु: [{ word: "पुस्तक", transliteration: "pustak", meaning: "book" }],
  पे: [{ word: "पेड़", transliteration: "ped", meaning: "tree" }],
  पो: [{ word: "पोता", transliteration: "pota", meaning: "grandson" }],
  र: [{ word: "रात", transliteration: "raat", meaning: "night" }],
  रा: [{ word: "राजा", transliteration: "raaja", meaning: "king" }],
  रि: [{ word: "रिश्ता", transliteration: "rishta", meaning: "relation" }],
  रु: [{ word: "रुपया", transliteration: "rupaya", meaning: "rupee" }],
  रे: [{ word: "रेत", transliteration: "ret", meaning: "sand" }],
  स: [{ word: "सपना", transliteration: "sapna", meaning: "dream" }],
  सा: [{ word: "साँप", transliteration: "saanp", meaning: "snake" }],
  सि: [{ word: "सितारा", transliteration: "sitaara", meaning: "star" }],
  सु: [{ word: "सुबह", transliteration: "subah", meaning: "morning" }],
  से: [{ word: "सेब", transliteration: "seb", meaning: "apple" }],
  म: [{ word: "माँ", transliteration: "maan", meaning: "mother" }],
  मा: [{ word: "माला", transliteration: "maalaa", meaning: "garland" }],
  मि: [{ word: "मिठाई", transliteration: "mithaaii", meaning: "sweets" }],
  मु: [{ word: "मुस्कान", transliteration: "muskaan", meaning: "smile" }],
  मे: [{ word: "मेला", transliteration: "mela", meaning: "fair" }],
  ल: [{ word: "लड़की", transliteration: "ladkii", meaning: "girl" }],
  ला: [{ word: "लाल", transliteration: "laal", meaning: "red" }],
  ली: [{ word: "लीची", transliteration: "liichi", meaning: "lychee" }],
  ह: [{ word: "हाथ", transliteration: "haath", meaning: "hand" }],
  हा: [{ word: "हाथी", transliteration: "haathi", meaning: "elephant" }],
  हि: [{ word: "हिंदी", transliteration: "hindi", meaning: "Hindi" }],
  दा: [{ word: "दादा", transliteration: "daada", meaning: "grandfather" }],
  दि: [{ word: "दिल", transliteration: "dil", meaning: "heart" }],
  दु: [{ word: "दुकान", transliteration: "dukaan", meaning: "shop" }],
  दे: [{ word: "देश", transliteration: "desh", meaning: "country" }],
  बा: [{ word: "बाजार", transliteration: "baazaar", meaning: "market" }],
  बि: [{ word: "बिल्ली", transliteration: "billi", meaning: "cat" }],
  फू: [{ word: "फूल", transliteration: "phul", meaning: "flower" }],
  फल: [{ word: "फल", transliteration: "phal", meaning: "fruit" }],
  चा: [{ word: "चाय", transliteration: "chaay", meaning: "tea" }],
  चि: [{ word: "चित्र", transliteration: "chitr", meaning: "picture" }],
  जा: [{ word: "जानवर", transliteration: "jaanvar", meaning: "animal" }],
  जि: [{ word: "जिंदगी", transliteration: "zindagi", meaning: "life" }],
  शे: [{ word: "शेर", transliteration: "sher", meaning: "lion" }],
  शा: [{ word: "शाला", transliteration: "shaala", meaning: "school" }],
  घर: [{ word: "घर", transliteration: "ghar", meaning: "home" }],
  घो: [{ word: "घोड़ा", transliteration: "ghoda", meaning: "horse" }],
};

// ─── Dictation App data ───────────────────────────────────────────────
export type DictationDifficulty = "easy" | "medium" | "hard";
export type DictationMode = "word" | "sentence";

export interface DictationItem {
  id: string;
  text: string; // Devanagari text to type
  transliteration: string;
  meaning: string;
  difficulty: DictationDifficulty;
  mode: DictationMode;
}

export const DICTATION_ITEMS: DictationItem[] = [
  // ── Easy words ──
  {
    id: "w1",
    text: "घर",
    transliteration: "ghar",
    meaning: "home",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w2",
    text: "रात",
    transliteration: "raat",
    meaning: "night",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w3",
    text: "दिन",
    transliteration: "din",
    meaning: "day",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w4",
    text: "माँ",
    transliteration: "maa",
    meaning: "mother",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w5",
    text: "भाई",
    transliteration: "bhaai",
    meaning: "brother",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w6",
    text: "गाय",
    transliteration: "gaay",
    meaning: "cow",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w7",
    text: "आम",
    transliteration: "aam",
    meaning: "mango",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w8",
    text: "रोटी",
    transliteration: "roti",
    meaning: "bread",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w9",
    text: "बकरी",
    transliteration: "bakri",
    meaning: "goat",
    difficulty: "easy",
    mode: "word",
  },
  {
    id: "w10",
    text: "नाम",
    transliteration: "naam",
    meaning: "name",
    difficulty: "easy",
    mode: "word",
  },

  // ── Medium words (matra) ──
  {
    id: "w11",
    text: "पानी",
    transliteration: "paani",
    meaning: "water",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w12",
    text: "किताब",
    transliteration: "kitaab",
    meaning: "book",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w13",
    text: "फूल",
    transliteration: "phool",
    meaning: "flower",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w14",
    text: "दूध",
    transliteration: "doodh",
    meaning: "milk",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w15",
    text: "केला",
    transliteration: "kela",
    meaning: "banana",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w16",
    text: "गाना",
    transliteration: "gaana",
    meaning: "song",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w17",
    text: "सेब",
    transliteration: "seb",
    meaning: "apple",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w18",
    text: "नमस्ते",
    transliteration: "namaste",
    meaning: "hello",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w19",
    text: "बाजार",
    transliteration: "baazaar",
    meaning: "market",
    difficulty: "medium",
    mode: "word",
  },
  {
    id: "w20",
    text: "जानवर",
    transliteration: "jaanvar",
    meaning: "animal",
    difficulty: "medium",
    mode: "word",
  },

  // ── Hard words (half/conjunct) ──
  {
    id: "w21",
    text: "स्कूल",
    transliteration: "skool",
    meaning: "school",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w22",
    text: "प्रेम",
    transliteration: "prem",
    meaning: "love",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w23",
    text: "ज्ञान",
    transliteration: "gyaan",
    meaning: "knowledge",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w24",
    text: "व्यापार",
    transliteration: "vyaapaar",
    meaning: "business",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w25",
    text: "ध्यान",
    transliteration: "dhyaan",
    meaning: "attention",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w26",
    text: "क्षमा",
    transliteration: "kshama",
    meaning: "forgiveness",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w27",
    text: "श्रम",
    transliteration: "shram",
    meaning: "effort",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w28",
    text: "भ्रमण",
    transliteration: "bhraman",
    meaning: "travel",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w29",
    text: "स्वास्थ्य",
    transliteration: "svaasthy",
    meaning: "health",
    difficulty: "hard",
    mode: "word",
  },
  {
    id: "w30",
    text: "प्रकाश",
    transliteration: "prakaash",
    meaning: "light",
    difficulty: "hard",
    mode: "word",
  },

  // ── Easy sentences ──
  {
    id: "s1",
    text: "मेरा नाम राम है।",
    transliteration: "Mera naam Ram hai.",
    meaning: "My name is Ram.",
    difficulty: "easy",
    mode: "sentence",
  },
  {
    id: "s2",
    text: "यह मेरा घर है।",
    transliteration: "Yeh mera ghar hai.",
    meaning: "This is my home.",
    difficulty: "easy",
    mode: "sentence",
  },
  {
    id: "s3",
    text: "माँ खाना बना रही है।",
    transliteration: "Maa khaana bana rahi hai.",
    meaning: "Mom is cooking food.",
    difficulty: "easy",
    mode: "sentence",
  },
  {
    id: "s4",
    text: "बच्चे खेल रहे हैं।",
    transliteration: "Bachche khel rahe hain.",
    meaning: "Children are playing.",
    difficulty: "easy",
    mode: "sentence",
  },

  // ── Medium sentences ──
  {
    id: "s5",
    text: "आज मौसम बहुत अच्छा है।",
    transliteration: "Aaj mausam bahut achha hai.",
    meaning: "Today the weather is very good.",
    difficulty: "medium",
    mode: "sentence",
  },
  {
    id: "s6",
    text: "मुझे हिंदी पढ़ना पसंद है।",
    transliteration: "Mujhe Hindi padhna pasand hai.",
    meaning: "I like reading Hindi.",
    difficulty: "medium",
    mode: "sentence",
  },
  {
    id: "s7",
    text: "बाजार में बहुत भीड़ है।",
    transliteration: "Baazaar mein bahut bheed hai.",
    meaning: "There are many people in the market.",
    difficulty: "medium",
    mode: "sentence",
  },
  {
    id: "s8",
    text: "पानी पीना सेहत के लिए अच्छा है।",
    transliteration: "Paani peena sehat ke liye achha hai.",
    meaning: "Drinking water is good for health.",
    difficulty: "medium",
    mode: "sentence",
  },

  // ── Hard sentences ──
  {
    id: "s9",
    text: "ज्ञान ही सबसे बड़ी शक्ति है।",
    transliteration: "Gyaan hi sabse badi shakti hai.",
    meaning: "Knowledge is the greatest power.",
    difficulty: "hard",
    mode: "sentence",
  },
  {
    id: "s10",
    text: "व्यायाम से स्वास्थ्य अच्छा रहता है।",
    transliteration: "Vyaayaam se svaasthy achha rahta hai.",
    meaning: "Exercise keeps health good.",
    difficulty: "hard",
    mode: "sentence",
  },
  {
    id: "s11",
    text: "प्रत्येक व्यक्ति को श्रम करना चाहिए।",
    transliteration: "Pratyek vyakti ko shram karna chahiye.",
    meaning: "Every person should work hard.",
    difficulty: "hard",
    mode: "sentence",
  },
];

// Dictation quiz words
export interface DictationWord {
  word: string;
  transliteration: string;
  meaning: string;
  category: "simple" | "matra" | "half" | "conjunct";
  distractors: string[]; // 3 wrong Hindi spellings
}

export const DICTATION_WORDS: DictationWord[] = [
  // Simple words
  {
    word: "नमस्ते",
    transliteration: "namaste",
    meaning: "hello",
    category: "simple",
    distractors: ["नमसते", "नामस्ते", "नमस्ती"],
  },
  {
    word: "घर",
    transliteration: "ghar",
    meaning: "home",
    category: "simple",
    distractors: ["गर", "खर", "हर"],
  },
  {
    word: "रात",
    transliteration: "raat",
    meaning: "night",
    category: "simple",
    distractors: ["रट", "रात्र", "रैत"],
  },
  {
    word: "दिन",
    transliteration: "din",
    meaning: "day",
    category: "simple",
    distractors: ["दीन", "दन", "दिण"],
  },
  // Matra words
  {
    word: "पानी",
    transliteration: "paani",
    meaning: "water",
    category: "matra",
    distractors: ["पनी", "पाणी", "पानि"],
  },
  {
    word: "किताब",
    transliteration: "kitaab",
    meaning: "book",
    category: "matra",
    distractors: ["कीताब", "किताव", "कताब"],
  },
  {
    word: "फूल",
    transliteration: "phul",
    meaning: "flower",
    category: "matra",
    distractors: ["फुल", "फल", "फूले"],
  },
  {
    word: "दूध",
    transliteration: "duudh",
    meaning: "milk",
    category: "matra",
    distractors: ["दुध", "दूद", "दूढ"],
  },
  {
    word: "सेब",
    transliteration: "seb",
    meaning: "apple",
    category: "matra",
    distractors: ["सब", "सेव", "शेब"],
  },
  {
    word: "केला",
    transliteration: "kela",
    meaning: "banana",
    category: "matra",
    distractors: ["कला", "कैला", "केल"],
  },
  {
    word: "गाना",
    transliteration: "gaana",
    meaning: "song",
    category: "matra",
    distractors: ["गना", "गाण", "गाने"],
  },
  {
    word: "नाम",
    transliteration: "naam",
    meaning: "name",
    category: "matra",
    distractors: ["नम", "नाव", "नाण"],
  },
  // Half letter words
  {
    word: "स्कूल",
    transliteration: "skuul",
    meaning: "school",
    category: "half",
    distractors: ["सकूल", "स्कुल", "स्कूले"],
  },
  {
    word: "प्रेम",
    transliteration: "prem",
    meaning: "love",
    category: "half",
    distractors: ["परेम", "प्रेव", "प्रेन"],
  },
  {
    word: "ज्ञान",
    transliteration: "gyaan",
    meaning: "knowledge",
    category: "half",
    distractors: ["जान", "ज्यान", "गयान"],
  },
  {
    word: "द्वार",
    transliteration: "dvaar",
    meaning: "door",
    category: "half",
    distractors: ["दवार", "द्वर", "दुवार"],
  },
  {
    word: "व्यापार",
    transliteration: "vyaapaar",
    meaning: "business",
    category: "half",
    distractors: ["व्यापर", "वयापार", "व्यापाल"],
  },
  {
    word: "ध्यान",
    transliteration: "dhyaan",
    meaning: "attention",
    category: "half",
    distractors: ["धयान", "ध्यन", "दयान"],
  },
  // Conjunct/complex
  {
    word: "क्षमा",
    transliteration: "kshama",
    meaning: "forgiveness",
    category: "conjunct",
    distractors: ["क्षम", "खमा", "क्शमा"],
  },
  {
    word: "त्वचा",
    transliteration: "tvacha",
    meaning: "skin",
    category: "conjunct",
    distractors: ["तवचा", "त्वचे", "त्बचा"],
  },
  {
    word: "श्रम",
    transliteration: "shram",
    meaning: "labor/effort",
    category: "conjunct",
    distractors: ["शरम", "श्रन", "शर्म"],
  },
  {
    word: "ग्रह",
    transliteration: "grah",
    meaning: "planet/house",
    category: "conjunct",
    distractors: ["गरह", "ग्रहम", "ग्राह"],
  },
  {
    word: "भ्रमण",
    transliteration: "bhraman",
    meaning: "travel",
    category: "conjunct",
    distractors: ["भरमण", "भ्रमन", "भरमन"],
  },
];
