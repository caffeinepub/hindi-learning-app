export interface GrammarLesson {
  title: string;
  content: string;
  transliteration: string;
  english: string;
  examples?: { hindi: string; transliteration: string; english: string }[];
}

export interface GrammarQuizOption {
  text: string;
  isCorrect: boolean;
}

export interface GrammarQuizQuestion {
  topic: string;
  question: string;
  answer: string;
  questionType: "mcq" | "fill";
  options: GrammarQuizOption[];
  hint?: string;
}

export interface GrammarTopic {
  id: string;
  name: string;
  nameEnglish: string;
  description: string;
  descriptionEnglish: string;
  icon: string;
  color: string;
  lessons: GrammarLesson[];
  quizzes: GrammarQuizQuestion[];
}

export const GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: "sangya",
    name: "संज्ञा",
    nameEnglish: "Nouns",
    description: "व्यक्ति, स्थान, वस्तु या भाव के नाम",
    descriptionEnglish: "Names of persons, places, things, or feelings",
    icon: "🏷️",
    color: "from-orange-400/20 to-amber-300/20",
    lessons: [
      {
        title: "संज्ञा क्या है?",
        content:
          "संज्ञा वह शब्द है जो किसी व्यक्ति, स्थान, वस्तु या भाव के नाम को बताता है।",
        transliteration:
          "Sangya vah shabd hai jo kisi vyakti, sthaan, vastu ya bhaav ke naam ko bataata hai.",
        english:
          "A noun is a word that names a person, place, thing, or feeling.",
        examples: [
          {
            hindi: "राम एक लड़का है।",
            transliteration: "Raam ek ladka hai.",
            english: "Ram is a boy.",
          },
          {
            hindi: "दिल्ली एक शहर है।",
            transliteration: "Dilli ek shahar hai.",
            english: "Delhi is a city.",
          },
          {
            hindi: "किताब मेज़ पर है।",
            transliteration: "Kitaab mez par hai.",
            english: "The book is on the table.",
          },
        ],
      },
      {
        title: "पुल्लिंग संज्ञा (Masculine)",
        content: "पुल्लिंग संज्ञा पुरुष जाति को दर्शाती है। जैसे: राम, घर, बाग़।",
        transliteration:
          "Pulling sangya purush jaati ko darshati hai. Jaise: Raam, ghar, baag.",
        english:
          "Masculine nouns denote the male gender. Examples: Ram, house, garden.",
        examples: [
          {
            hindi: "लड़का — a boy",
            transliteration: "ladka",
            english: "boy (masculine)",
          },
          {
            hindi: "राजा — a king",
            transliteration: "raaja",
            english: "king (masculine)",
          },
          {
            hindi: "घोड़ा — a horse",
            transliteration: "ghoda",
            english: "horse (masculine)",
          },
          {
            hindi: "पानी — water",
            transliteration: "paani",
            english: "water (masculine)",
          },
        ],
      },
      {
        title: "स्त्रीलिंग संज्ञा (Feminine)",
        content: "स्त्रीलिंग संज्ञा स्त्री जाति को दर्शाती है। जैसे: सीता, नदी, किताब।",
        transliteration:
          "Streeling sangya stri jaati ko darshati hai. Jaise: Sita, nadi, kitaab.",
        english:
          "Feminine nouns denote the female gender. Examples: Sita, river, book.",
        examples: [
          {
            hindi: "लड़की — a girl",
            transliteration: "ladki",
            english: "girl (feminine)",
          },
          {
            hindi: "नदी — a river",
            transliteration: "nadi",
            english: "river (feminine)",
          },
          {
            hindi: "किताब — a book",
            transliteration: "kitaab",
            english: "book (feminine)",
          },
          {
            hindi: "माँ — mother",
            transliteration: "maa",
            english: "mother (feminine)",
          },
        ],
      },
      {
        title: "एकवचन और बहुवचन",
        content: "एकवचन — एक वस्तु/व्यक्ति। बहुवचन — एक से अधिक वस्तु/व्यक्ति।",
        transliteration:
          "Ekvachan — ek vastu/vyakti. Bahuvachan — ek se adhik vastu/vyakti.",
        english:
          "Singular — one thing/person. Plural — more than one thing/person.",
        examples: [
          {
            hindi: "लड़का → लड़के",
            transliteration: "ladka → ladke",
            english: "boy → boys",
          },
          {
            hindi: "लड़की → लड़कियाँ",
            transliteration: "ladki → ladkiyan",
            english: "girl → girls",
          },
          {
            hindi: "किताब → किताबें",
            transliteration: "kitaab → kitaabein",
            english: "book → books",
          },
          {
            hindi: "गाय → गाएँ",
            transliteration: "gaay → gaayen",
            english: "cow → cows",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "संज्ञा",
        question: "निम्न में से कौन-सी संज्ञा है? (Which of these is a noun?)",
        answer: "किताब",
        questionType: "mcq",
        options: [
          { text: "किताब", isCorrect: true },
          { text: "अच्छा", isCorrect: false },
          { text: "खाना", isCorrect: false },
          { text: "बड़ा", isCorrect: false },
        ],
      },
      {
        topic: "संज्ञा",
        question: "'राम' किस लिंग की संज्ञा है? (What gender is 'Raam'?)",
        answer: "पुल्लिंग",
        questionType: "mcq",
        options: [
          { text: "पुल्लिंग (Masculine)", isCorrect: true },
          { text: "स्त्रीलिंग (Feminine)", isCorrect: false },
          { text: "उभयलिंग (Both)", isCorrect: false },
          { text: "नपुंसकलिंग (Neuter)", isCorrect: false },
        ],
      },
      {
        topic: "संज्ञा",
        question: "'लड़का' का बहुवचन क्या है? (Plural of 'ladka'?)",
        answer: "लड़के",
        questionType: "mcq",
        options: [
          { text: "लड़के", isCorrect: true },
          { text: "लड़कें", isCorrect: false },
          { text: "लड़कियाँ", isCorrect: false },
          { text: "लड़केएँ", isCorrect: false },
        ],
      },
      {
        topic: "संज्ञा",
        question: "'नदी' किस लिंग की संज्ञा है?",
        answer: "स्त्रीलिंग",
        questionType: "mcq",
        options: [
          { text: "स्त्रीलिंग (Feminine)", isCorrect: true },
          { text: "पुल्लिंग (Masculine)", isCorrect: false },
          { text: "उभयलिंग (Both)", isCorrect: false },
          { text: "कोई नहीं", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "sarvanam",
    name: "सर्वनाम",
    nameEnglish: "Pronouns",
    description: "संज्ञा की जगह प्रयुक्त होने वाले शब्द",
    descriptionEnglish: "Words used in place of nouns",
    icon: "👤",
    color: "from-blue-400/20 to-cyan-300/20",
    lessons: [
      {
        title: "सर्वनाम क्या है?",
        content: "सर्वनाम वह शब्द है जो संज्ञा के स्थान पर प्रयोग किया जाता है।",
        transliteration:
          "Sarvanam vah shabd hai jo sangya ke sthaan par prayog kiya jaata hai.",
        english: "A pronoun is a word used in place of a noun.",
        examples: [
          {
            hindi: "राम स्कूल गया। वह पढ़ता है।",
            transliteration: "Raam skool gaya. Vah padhta hai.",
            english: "Ram went to school. He studies.",
          },
        ],
      },
      {
        title: "पुरुषवाचक सर्वनाम",
        content: "मैं (I), तुम/आप (you), वह/वे (he/she/they) — ये पुरुषवाचक सर्वनाम हैं।",
        transliteration:
          "Main (I), tum/aap (you), vah/ve (he/she/they) — ye purushvaachak sarvanam hain.",
        english:
          "मैं (I), तुम/आप (you), वह/वे (he/she/they) — these are personal pronouns.",
        examples: [
          {
            hindi: "मैं खाना खाता हूँ।",
            transliteration: "Main khaana khaata hun.",
            english: "I eat food.",
          },
          {
            hindi: "तुम कहाँ जाते हो?",
            transliteration: "Tum kahaan jaate ho?",
            english: "Where do you go?",
          },
          {
            hindi: "वह किताब पढ़ती है।",
            transliteration: "Vah kitaab padhti hai.",
            english: "She reads a book.",
          },
          {
            hindi: "हम साथ खेलते हैं।",
            transliteration: "Ham saath khelte hain.",
            english: "We play together.",
          },
          {
            hindi: "आप कैसे हैं?",
            transliteration: "Aap kaise hain?",
            english: "How are you? (formal)",
          },
        ],
      },
      {
        title: "निजवाचक सर्वनाम",
        content: "'स्वयं' और 'खुद' निजवाचक सर्वनाम हैं — अपने आप को दर्शाते हैं।",
        transliteration:
          "'Svayam' aur 'khud' nijvaachak sarvanam hain — apne aap ko darshate hain.",
        english:
          "'Svayam' and 'khud' are reflexive pronouns — they refer to oneself.",
        examples: [
          {
            hindi: "मैं खुद जाऊँगा।",
            transliteration: "Main khud jaunga.",
            english: "I will go myself.",
          },
          {
            hindi: "वह स्वयं काम करती है।",
            transliteration: "Vah svayam kaam karti hai.",
            english: "She does the work herself.",
          },
        ],
      },
      {
        title: "सम्मानजनक संबोधन — आप",
        content:
          "'आप' का प्रयोग बड़ों या अजनबियों से बात करते समय होता है। 'तुम' मित्रों के लिए और 'तू' अत्यंत अंतरंग के लिए।",
        transliteration:
          "'Aap' ka prayog badon ya ajnabiyon se baat karte samay hota hai.",
        english:
          "'Aap' is used when speaking to elders or strangers. 'Tum' is for friends, 'Tu' for very close ones.",
        examples: [
          {
            hindi: "आप कहाँ से आए हैं?",
            transliteration: "Aap kahaan se aaye hain?",
            english: "Where have you come from? (formal)",
          },
          {
            hindi: "तुम कहाँ जा रहे हो?",
            transliteration: "Tum kahaan ja rahe ho?",
            english: "Where are you going? (informal)",
          },
          {
            hindi: "तू ठीक है?",
            transliteration: "Tu theek hai?",
            english: "Are you okay? (intimate)",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "सर्वनाम",
        question: "हिंदी में 'I' को क्या कहते हैं? (What is 'I' in Hindi?)",
        answer: "मैं",
        questionType: "mcq",
        options: [
          { text: "मैं", isCorrect: true },
          { text: "तुम", isCorrect: false },
          { text: "वह", isCorrect: false },
          { text: "हम", isCorrect: false },
        ],
      },
      {
        topic: "सर्वनाम",
        question:
          "औपचारिक 'you' के लिए कौन-सा सर्वनाम प्रयोग होता है? (Formal 'you'?)",
        answer: "आप",
        questionType: "mcq",
        options: [
          { text: "आप", isCorrect: true },
          { text: "तुम", isCorrect: false },
          { text: "तू", isCorrect: false },
          { text: "वह", isCorrect: false },
        ],
      },
      {
        topic: "सर्वनाम",
        question: "'वे' का अर्थ क्या है? (Meaning of 've'?)",
        answer: "they / they (respectful)",
        questionType: "mcq",
        options: [
          { text: "They / वे लोग", isCorrect: true },
          { text: "He alone / वह अकेला", isCorrect: false },
          { text: "We / हम", isCorrect: false },
          { text: "You / तुम", isCorrect: false },
        ],
      },
      {
        topic: "सर्वनाम",
        question: "'हम' किस वचन का सर्वनाम है?",
        answer: "बहुवचन",
        questionType: "mcq",
        options: [
          { text: "बहुवचन (Plural)", isCorrect: true },
          { text: "एकवचन (Singular)", isCorrect: false },
          { text: "द्विवचन (Dual)", isCorrect: false },
          { text: "इनमें से कोई नहीं", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "kriya",
    name: "क्रिया",
    nameEnglish: "Verbs",
    description: "कार्य या अवस्था को दर्शाने वाले शब्द",
    descriptionEnglish: "Words that express action or state",
    icon: "⚡",
    color: "from-green-400/20 to-emerald-300/20",
    lessons: [
      {
        title: "क्रिया क्या है?",
        content: "क्रिया वह शब्द है जो किसी कार्य को करने या होने का बोध कराता है।",
        transliteration:
          "Kriya vah shabd hai jo kisi kaarya ko karne ya hone ka bodh karaata hai.",
        english: "A verb is a word that expresses an action or state of being.",
        examples: [
          {
            hindi: "राम खाता है। (खाना = to eat)",
            transliteration: "Raam khaata hai. (khaana = to eat)",
            english: "Ram eats. (khaana = to eat)",
          },
          {
            hindi: "सीता जाती है। (जाना = to go)",
            transliteration: "Sita jaati hai. (jaana = to go)",
            english: "Sita goes. (jaana = to go)",
          },
          {
            hindi: "बच्चे खेलते हैं। (खेलना = to play)",
            transliteration: "Bachche khelte hain. (khelna = to play)",
            english: "Children play. (khelna = to play)",
          },
        ],
      },
      {
        title: "वर्तमान काल क्रिया",
        content: "वर्तमान काल में क्रिया की रचना: मूल धातु + ता/ती/ते + है/हैं",
        transliteration:
          "Vartamaan kaal mein kriya: mool dhaatu + ta/ti/te + hai/hain",
        english: "Present tense verbs: Root + ta/ti/te + hai/hain",
        examples: [
          {
            hindi: "मैं खाता हूँ।",
            transliteration: "Main khaata hun.",
            english: "I eat.",
          },
          {
            hindi: "वह पीती है।",
            transliteration: "Vah piiti hai.",
            english: "She drinks.",
          },
          {
            hindi: "हम जाते हैं।",
            transliteration: "Ham jaate hain.",
            english: "We go.",
          },
          {
            hindi: "तुम सोते हो।",
            transliteration: "Tum sote ho.",
            english: "You sleep.",
          },
        ],
      },
      {
        title: "भूतकाल क्रिया",
        content: "भूतकाल में क्रिया की रचना: मूल धातु + या/ई/ए (past forms)",
        transliteration:
          "Bhootkaal mein kriya: mool dhaatu + ya/i/e (past forms)",
        english: "Past tense verbs: Root + ya/i/e",
        examples: [
          {
            hindi: "मैंने खाना खाया।",
            transliteration: "Maine khaana khaaya.",
            english: "I ate food.",
          },
          {
            hindi: "वह गई।",
            transliteration: "Vah gayi.",
            english: "She went.",
          },
          {
            hindi: "हम आए।",
            transliteration: "Ham aaye.",
            english: "We came.",
          },
          {
            hindi: "उसने पानी पिया।",
            transliteration: "Usne paani piya.",
            english: "He/she drank water.",
          },
        ],
      },
      {
        title: "भविष्यकाल क्रिया",
        content: "भविष्यकाल में क्रिया की रचना: मूल धातु + एगा/एगी/एंगे",
        transliteration: "Bhavishy kaal mein kriya: mool dhaatu + ega/egi/enge",
        english: "Future tense verbs: Root + ega/egi/enge",
        examples: [
          {
            hindi: "मैं खाऊँगा।",
            transliteration: "Main khaunga.",
            english: "I will eat.",
          },
          {
            hindi: "वह जाएगी।",
            transliteration: "Vah jaayegi.",
            english: "She will go.",
          },
          {
            hindi: "हम आएंगे।",
            transliteration: "Ham aayenge.",
            english: "We will come.",
          },
          {
            hindi: "तुम पढ़ोगे।",
            transliteration: "Tum padhoge.",
            english: "You will study.",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "क्रिया",
        question:
          "'खाना' क्रिया का वर्तमान काल रूप क्या है? (Present tense of 'khaana'?)",
        answer: "खाता है",
        questionType: "mcq",
        options: [
          { text: "खाता है", isCorrect: true },
          { text: "खाया था", isCorrect: false },
          { text: "खाएगा", isCorrect: false },
          { text: "खाना है", isCorrect: false },
        ],
      },
      {
        topic: "क्रिया",
        question: "भूतकाल में 'जाना' क्रिया का स्त्रीलिंग एकवचन रूप क्या है?",
        answer: "गई",
        questionType: "mcq",
        options: [
          { text: "गई", isCorrect: true },
          { text: "गया", isCorrect: false },
          { text: "जाएगी", isCorrect: false },
          { text: "गए", isCorrect: false },
        ],
      },
      {
        topic: "क्रिया",
        question: "'I will study' को हिंदी में क्या कहेंगे?",
        answer: "मैं पढ़ूँगा",
        questionType: "mcq",
        options: [
          { text: "मैं पढ़ूँगा", isCorrect: true },
          { text: "मैं पढ़ता हूँ", isCorrect: false },
          { text: "मैंने पढ़ा", isCorrect: false },
          { text: "मैं पढ़ रहा हूँ", isCorrect: false },
        ],
      },
      {
        topic: "क्रिया",
        question: "हिंदी में 'She drank water' का सही अनुवाद कौन-सा है?",
        answer: "उसने पानी पिया।",
        questionType: "mcq",
        options: [
          { text: "उसने पानी पिया।", isCorrect: true },
          { text: "वह पानी पीती है।", isCorrect: false },
          { text: "वह पानी पिएगी।", isCorrect: false },
          { text: "उसे पानी चाहिए।", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "visheshan",
    name: "विशेषण",
    nameEnglish: "Adjectives",
    description: "संज्ञा की विशेषता बताने वाले शब्द",
    descriptionEnglish: "Words that describe or modify nouns",
    icon: "✨",
    color: "from-purple-400/20 to-violet-300/20",
    lessons: [
      {
        title: "विशेषण क्या है?",
        content: "विशेषण वह शब्द है जो संज्ञा या सर्वनाम की विशेषता बताता है।",
        transliteration:
          "Visheshan vah shabd hai jo sangya ya sarvanam ki visheshta bataata hai.",
        english:
          "An adjective is a word that describes or modifies a noun or pronoun.",
        examples: [
          {
            hindi: "अच्छा लड़का (a good boy)",
            transliteration: "achha ladka",
            english: "good boy",
          },
          {
            hindi: "बड़ी किताब (a big book)",
            transliteration: "badi kitaab",
            english: "big book",
          },
          {
            hindi: "लाल गुलाब (a red rose)",
            transliteration: "laal gulaab",
            english: "red rose",
          },
        ],
      },
      {
        title: "लिंग के अनुसार विशेषण",
        content:
          "हिंदी में विशेषण लिंग के अनुसार बदलते हैं। अकारांत विशेषण पुल्लिंग में 'आ' और स्त्रीलिंग में 'ई' होते हैं।",
        transliteration: "Hindi mein visheshan ling ke anusaar badalte hain.",
        english:
          "In Hindi, adjectives change according to gender. -a ending becomes -i for feminine.",
        examples: [
          {
            hindi: "अच्छा लड़का / अच्छी लड़की",
            transliteration: "achha ladka / achhi ladki",
            english: "good boy / good girl",
          },
          {
            hindi: "बड़ा घर / बड़ी नदी",
            transliteration: "bada ghar / badi nadi",
            english: "big house / big river",
          },
          {
            hindi: "छोटा बच्चा / छोटी बच्ची",
            transliteration: "chhota bachcha / chhoti bachchi",
            english: "small boy / small girl",
          },
          {
            hindi: "मोटा आदमी / मोटी औरत",
            transliteration: "mota aadmi / moti aurat",
            english: "fat man / fat woman",
          },
        ],
      },
      {
        title: "रंग और आकार के विशेषण",
        content:
          "रंग: लाल (red), नीला (blue), पीला (yellow), हरा (green), काला (black), सफ़ेद (white)। आकार: बड़ा (big), छोटा (small), लंबा (tall), मोटा (fat), पतला (thin)।",
        transliteration:
          "Rang: laal, niila, piila, hara, kaala, safed. Aakaar: bada, chhota, lamba, mota, patla.",
        english:
          "Colors: red, blue, yellow, green, black, white. Sizes: big, small, tall, fat, thin.",
        examples: [
          {
            hindi: "लाल गुलाब (red rose)",
            transliteration: "laal gulaab",
            english: "red rose",
          },
          {
            hindi: "नीला आकाश (blue sky)",
            transliteration: "niila aakaash",
            english: "blue sky",
          },
          {
            hindi: "लंबा पेड़ (tall tree)",
            transliteration: "lamba ped",
            english: "tall tree",
          },
        ],
      },
      {
        title: "तुलनात्मक विशेषण",
        content: "तुलना के लिए: X से Y बड़ा/अच्छा है। सबसे + विशेषण = सर्वोच्च",
        transliteration:
          "Tulna ke liye: X se Y bada/achha hai. Sabse + visheshan = superlative.",
        english:
          "For comparison: Y is bigger/better than X. Sabse + adjective = superlative.",
        examples: [
          {
            hindi: "राम सीता से लंबा है।",
            transliteration: "Raam Sita se lamba hai.",
            english: "Ram is taller than Sita.",
          },
          {
            hindi: "यह सबसे अच्छी किताब है।",
            transliteration: "Yah sabse achhi kitaab hai.",
            english: "This is the best book.",
          },
          {
            hindi: "आम सेब से मीठा है।",
            transliteration: "Aam seb se meetha hai.",
            english: "Mango is sweeter than apple.",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "विशेषण",
        question: "'अच्छा' विशेषण का स्त्रीलिंग रूप क्या है?",
        answer: "अच्छी",
        questionType: "mcq",
        options: [
          { text: "अच्छी", isCorrect: true },
          { text: "अच्छे", isCorrect: false },
          { text: "अच्छीय", isCorrect: false },
          { text: "अच्छान", isCorrect: false },
        ],
      },
      {
        topic: "विशेषण",
        question: "'The big river' को हिंदी में क्या कहेंगे?",
        answer: "बड़ी नदी",
        questionType: "mcq",
        options: [
          { text: "बड़ी नदी", isCorrect: true },
          { text: "बड़ा नदी", isCorrect: false },
          { text: "बड़े नदी", isCorrect: false },
          { text: "बड़ीया नदी", isCorrect: false },
        ],
      },
      {
        topic: "विशेषण",
        question: "तुलनात्मक वाक्य में कौन-सा शब्द प्रयुक्त होता है?",
        answer: "से",
        questionType: "mcq",
        options: [
          { text: "से (se - than)", isCorrect: true },
          { text: "में (mein - in)", isCorrect: false },
          { text: "पर (par - on)", isCorrect: false },
          { text: "के लिए (ke liye - for)", isCorrect: false },
        ],
      },
      {
        topic: "विशेषण",
        question: "'सबसे बड़ा' का अर्थ क्या है?",
        answer: "the biggest",
        questionType: "mcq",
        options: [
          { text: "The biggest / सर्वोच्च", isCorrect: true },
          { text: "Very big / बहुत बड़ा", isCorrect: false },
          { text: "Bigger than / से बड़ा", isCorrect: false },
          { text: "Not big / बड़ा नहीं", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "kaal",
    name: "काल",
    nameEnglish: "Tenses",
    description: "समय के अनुसार क्रिया के रूप",
    descriptionEnglish: "Verb forms according to time",
    icon: "⏰",
    color: "from-rose-400/20 to-pink-300/20",
    lessons: [
      {
        title: "काल के प्रकार",
        content:
          "हिंदी में तीन मुख्य काल हैं: वर्तमान काल (Present), भूतकाल (Past), भविष्यकाल (Future)।",
        transliteration:
          "Hindi mein teen mukhya kaal hain: Vartamaan kaal, Bhootkaal, Bhavishy kaal.",
        english: "Hindi has three main tenses: Present, Past, and Future.",
        examples: [
          {
            hindi: "वर्तमान: मैं खाता हूँ।",
            transliteration: "Vartamaan: Main khaata hun.",
            english: "Present: I eat.",
          },
          {
            hindi: "भूत: मैंने खाया।",
            transliteration: "Bhoot: Maine khaaya.",
            english: "Past: I ate.",
          },
          {
            hindi: "भविष्य: मैं खाऊँगा।",
            transliteration: "Bhavishy: Main khaunga.",
            english: "Future: I will eat.",
          },
        ],
      },
      {
        title: "वर्तमान काल — तीन रूप",
        content:
          "सामान्य वर्तमान (Simple), अपूर्ण वर्तमान (Continuous), पूर्ण वर्तमान (Perfect)।",
        transliteration:
          "Saamaanya vartamaan, apuurna vartamaan, puurna vartamaan.",
        english: "Simple present, present continuous, present perfect.",
        examples: [
          {
            hindi: "वह खाता है। (Simple)",
            transliteration: "Vah khaata hai.",
            english: "He eats. (Simple)",
          },
          {
            hindi: "वह खा रहा है। (Continuous)",
            transliteration: "Vah khaa raha hai.",
            english: "He is eating. (Continuous)",
          },
          {
            hindi: "वह खा चुका है। (Perfect)",
            transliteration: "Vah khaa chuka hai.",
            english: "He has eaten. (Perfect)",
          },
        ],
      },
      {
        title: "भूतकाल — तीन रूप",
        content: "सामान्य भूत, अपूर्ण भूत, पूर्ण भूत।",
        transliteration: "Saamaanya bhoot, apuurna bhoot, puurna bhoot.",
        english: "Simple past, past continuous, past perfect.",
        examples: [
          {
            hindi: "वह गया। (Simple Past)",
            transliteration: "Vah gaya.",
            english: "He went.",
          },
          {
            hindi: "वह जा रहा था। (Past Continuous)",
            transliteration: "Vah jaa raha tha.",
            english: "He was going.",
          },
          {
            hindi: "वह जा चुका था। (Past Perfect)",
            transliteration: "Vah jaa chuka tha.",
            english: "He had gone.",
          },
        ],
      },
      {
        title: "भविष्यकाल — रूप",
        content: "भविष्यकाल में एगा/एगी/एंगे का प्रयोग होता है।",
        transliteration: "Bhavishy kaal mein ega/egi/enge ka prayog hota hai.",
        english: "Future tense uses -ega/-egi/-enge suffixes.",
        examples: [
          {
            hindi: "राम आएगा। (He will come)",
            transliteration: "Raam aayega.",
            english: "Ram will come.",
          },
          {
            hindi: "सीता पढ़ेगी। (She will study)",
            transliteration: "Sita padhegi.",
            english: "Sita will study.",
          },
          {
            hindi: "हम जाएंगे। (We will go)",
            transliteration: "Ham jaayenge.",
            english: "We will go.",
          },
          {
            hindi: "क्या तुम आओगे? (Will you come?)",
            transliteration: "Kya tum aaoge?",
            english: "Will you come?",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "काल",
        question: "'वह खा रहा है' किस काल का उदाहरण है?",
        answer: "अपूर्ण वर्तमान",
        questionType: "mcq",
        options: [
          { text: "अपूर्ण वर्तमान (Present Continuous)", isCorrect: true },
          { text: "सामान्य वर्तमान (Simple Present)", isCorrect: false },
          { text: "भूतकाल (Past)", isCorrect: false },
          { text: "भविष्यकाल (Future)", isCorrect: false },
        ],
      },
      {
        topic: "काल",
        question: "'I will eat' को हिंदी में क्या कहेंगे? (masculine speaker)",
        answer: "मैं खाऊँगा",
        questionType: "mcq",
        options: [
          { text: "मैं खाऊँगा", isCorrect: true },
          { text: "मैं खाता हूँ", isCorrect: false },
          { text: "मैंने खाया", isCorrect: false },
          { text: "मैं खा रहा हूँ", isCorrect: false },
        ],
      },
      {
        topic: "काल",
        question: "भूतकाल में 'वह जा रहा था' किस प्रकार का भूत है?",
        answer: "अपूर्ण भूत",
        questionType: "mcq",
        options: [
          { text: "अपूर्ण भूत (Past Continuous)", isCorrect: true },
          { text: "सामान्य भूत (Simple Past)", isCorrect: false },
          { text: "पूर्ण भूत (Past Perfect)", isCorrect: false },
          { text: "वर्तमान काल (Present)", isCorrect: false },
        ],
      },
      {
        topic: "काल",
        question: "निम्न वाक्य किस काल का है? 'राम खाना खा चुका था।'",
        answer: "पूर्ण भूत",
        questionType: "mcq",
        options: [
          { text: "पूर्ण भूत (Past Perfect)", isCorrect: true },
          { text: "सामान्य भूत (Simple Past)", isCorrect: false },
          { text: "पूर्ण वर्तमान (Present Perfect)", isCorrect: false },
          { text: "भविष्यकाल (Future)", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "vakya",
    name: "वाक्य रचना",
    nameEnglish: "Sentence Structure",
    description: "हिंदी वाक्य का निर्माण एवं प्रकार",
    descriptionEnglish: "Building and types of Hindi sentences",
    icon: "📝",
    color: "from-teal-400/20 to-cyan-300/20",
    lessons: [
      {
        title: "हिंदी वाक्य का क्रम",
        content:
          "हिंदी में वाक्य का क्रम: कर्ता (Subject) + कर्म (Object) + क्रिया (Verb) — S-O-V",
        transliteration:
          "Hindi mein vakya ka kram: Karta + Karm + Kriya (SOV order)",
        english:
          "Hindi sentence order: Subject + Object + Verb (SOV), unlike English (SVO).",
        examples: [
          {
            hindi: "राम किताब पढ़ता है।",
            transliteration: "Raam kitaab padhta hai.",
            english: "Ram reads a book. (Ram + book + reads)",
          },
          {
            hindi: "सीता खाना खाती है।",
            transliteration: "Sita khaana khaati hai.",
            english: "Sita eats food. (Sita + food + eats)",
          },
          {
            hindi: "मैं पानी पीता हूँ।",
            transliteration: "Main paani piita hun.",
            english: "I drink water. (I + water + drink)",
          },
        ],
      },
      {
        title: "विधिवाचक वाक्य (Affirmative)",
        content: "विधिवाचक वाक्य में क्रिया सकारात्मक होती है।",
        transliteration: "Vidhivaachak vakya mein kriya sakaraatmak hoti hai.",
        english: "Affirmative sentences have a positive verb.",
        examples: [
          {
            hindi: "वह स्कूल जाता है।",
            transliteration: "Vah skool jaata hai.",
            english: "He goes to school.",
          },
          {
            hindi: "बच्चे खेल रहे हैं।",
            transliteration: "Bachche khel rahe hain.",
            english: "Children are playing.",
          },
          {
            hindi: "हम हिंदी सीख रहे हैं।",
            transliteration: "Ham Hindi seekh rahe hain.",
            english: "We are learning Hindi.",
          },
        ],
      },
      {
        title: "निषेधवाचक वाक्य (Negative)",
        content: "नकारात्मक वाक्य बनाने के लिए 'नहीं' का प्रयोग क्रिया से पहले होता है।",
        transliteration:
          "Nakaraatmak vakya banane ke liye 'nahin' ka prayog kriya se pehle hota hai.",
        english:
          "To form negative sentences, use 'nahin' (not) before the verb.",
        examples: [
          {
            hindi: "वह स्कूल नहीं जाता।",
            transliteration: "Vah skool nahin jaata.",
            english: "He does not go to school.",
          },
          {
            hindi: "मुझे यह पसंद नहीं है।",
            transliteration: "Mujhe yah pasand nahin hai.",
            english: "I don't like this.",
          },
          {
            hindi: "राम यहाँ नहीं है।",
            transliteration: "Raam yahaan nahin hai.",
            english: "Ram is not here.",
          },
        ],
      },
      {
        title: "प्रश्नवाचक वाक्य (Questions)",
        content:
          "प्रश्न बनाने के लिए 'क्या' वाक्य के शुरू में या प्रश्नवाचक शब्द (कौन, कब, कहाँ, क्यों) का प्रयोग होता है।",
        transliteration:
          "Prashn banane ke liye 'kya' vakya ke shuru mein ya prashankaran shabdon ka prayog.",
        english:
          "To form questions, use 'kya' at the beginning or WH-words (who, when, where, why).",
        examples: [
          {
            hindi: "क्या तुम जाओगे?",
            transliteration: "Kya tum jaoge?",
            english: "Will you go?",
          },
          {
            hindi: "वह कहाँ जाता है?",
            transliteration: "Vah kahaan jaata hai?",
            english: "Where does he go?",
          },
          {
            hindi: "तुम क्यों रो रहे हो?",
            transliteration: "Tum kyon ro rahe ho?",
            english: "Why are you crying?",
          },
          {
            hindi: "राम कब आएगा?",
            transliteration: "Raam kab aayega?",
            english: "When will Ram come?",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "वाक्य रचना",
        question: "हिंदी में वाक्य का सही क्रम क्या है?",
        answer: "कर्ता + कर्म + क्रिया",
        questionType: "mcq",
        options: [
          { text: "कर्ता + कर्म + क्रिया (S-O-V)", isCorrect: true },
          { text: "कर्ता + क्रिया + कर्म (S-V-O)", isCorrect: false },
          { text: "क्रिया + कर्ता + कर्म (V-S-O)", isCorrect: false },
          { text: "कर्म + कर्ता + क्रिया (O-S-V)", isCorrect: false },
        ],
      },
      {
        topic: "वाक्य रचना",
        question: "नकारात्मक वाक्य में 'नहीं' किस स्थान पर आता है?",
        answer: "क्रिया से पहले",
        questionType: "mcq",
        options: [
          { text: "क्रिया से पहले (Before verb)", isCorrect: true },
          { text: "वाक्य के शुरू में (Beginning)", isCorrect: false },
          { text: "वाक्य के अंत में (End)", isCorrect: false },
          { text: "कर्ता के बाद (After subject)", isCorrect: false },
        ],
      },
      {
        topic: "वाक्य रचना",
        question: "हाँ/नहीं प्रश्न बनाने के लिए वाक्य के शुरू में कौन-सा शब्द लगाते हैं?",
        answer: "क्या",
        questionType: "mcq",
        options: [
          { text: "क्या (kya)", isCorrect: true },
          { text: "कब (kab - when)", isCorrect: false },
          { text: "कहाँ (kahaan - where)", isCorrect: false },
          { text: "कौन (kaun - who)", isCorrect: false },
        ],
      },
      {
        topic: "वाक्य रचना",
        question: "'वह स्कूल नहीं जाता।' किस प्रकार का वाक्य है?",
        answer: "निषेधवाचक",
        questionType: "mcq",
        options: [
          { text: "निषेधवाचक (Negative)", isCorrect: true },
          { text: "विधिवाचक (Affirmative)", isCorrect: false },
          { text: "प्रश्नवाचक (Question)", isCorrect: false },
          { text: "आज्ञावाचक (Imperative)", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "maatraayen",
    name: "मात्राएं",
    nameEnglish: "Matras (Vowel Signs)",
    description: "व्यंजन के साथ लगने वाले स्वर चिह्न",
    descriptionEnglish: "Vowel signs that attach to consonants",
    icon: "🔤",
    color: "from-yellow-400/20 to-orange-300/20",
    lessons: [
      {
        title: "मात्रा क्या है?",
        content: "मात्रा वह चिह्न है जो स्वर के स्थान पर व्यंजन के साथ लिखा जाता है।",
        transliteration:
          "Maatra vah chihn hai jo svar ke sthaan par vyanjan ke saath likha jaata hai.",
        english:
          "A matra is a vowel sign written with a consonant instead of the full vowel letter.",
        examples: [
          {
            hindi: "क + ा = का (ka + aa = kaa)",
            transliteration: "k + aa = kaa",
            english: "k + long-a = kaa",
          },
          {
            hindi: "क + ि = कि (k + i)",
            transliteration: "k + i = ki",
            english: "k + short-i = ki",
          },
          {
            hindi: "क + ी = की (k + ii)",
            transliteration: "k + ii = kii",
            english: "k + long-i = kii",
          },
        ],
      },
      {
        title: "ह्रस्व स्वर मात्राएं",
        content: "ह्रस्व स्वर: अ (no matra), इ (ि), उ (ु), ऋ (ृ) — short vowels",
        transliteration: "Hrasva svar: a (no matra), i (ि), u (ु), ri (ृ)",
        english:
          "Short vowels: a (no mark), i (ि below), u (ु below), ri (ृ below).",
        examples: [
          {
            hindi: "क (ka) — अ मात्रा नहीं",
            transliteration: "ka — no matra for a",
            english: "ka — no matra mark for 'a'",
          },
          {
            hindi: "कि (ki) — इ की मात्रा",
            transliteration: "ki — matra for i",
            english: "ki — matra mark for 'i'",
          },
          {
            hindi: "कु (ku) — उ की मात्रा",
            transliteration: "ku — matra for u",
            english: "ku — matra mark for 'u'",
          },
          {
            hindi: "कृ (kri) — ऋ की मात्रा",
            transliteration: "kri — matra for ri",
            english: "kri — matra mark for 'ri'",
          },
        ],
      },
      {
        title: "दीर्घ स्वर मात्राएं",
        content:
          "दीर्घ स्वर: आ (ा), ई (ी), ऊ (ू), ए (े), ऐ (ै), ओ (ो), औ (ौ) — long vowels",
        transliteration:
          "Diirgh svar: aa (ा), ii (ी), uu (ू), e (े), ai (ै), o (ो), au (ौ)",
        english: "Long vowels and their matra signs.",
        examples: [
          {
            hindi: "का (kaa) — आ की मात्रा",
            transliteration: "kaa — matra for aa",
            english: "kaa — matra mark for 'aa'",
          },
          {
            hindi: "की (kii) — ई की मात्रा",
            transliteration: "kii — matra for ii",
            english: "kii — matra mark for 'ii'",
          },
          {
            hindi: "कू (kuu) — ऊ की मात्रा",
            transliteration: "kuu — matra for uu",
            english: "kuu — matra mark for 'uu'",
          },
          {
            hindi: "के (ke) — ए की मात्रा",
            transliteration: "ke — matra for e",
            english: "ke — matra mark for 'e'",
          },
          {
            hindi: "को (ko) — ओ की मात्रा",
            transliteration: "ko — matra for o",
            english: "ko — matra mark for 'o'",
          },
        ],
      },
      {
        title: "शब्दों में मात्राओं का प्रयोग",
        content:
          "मात्राएं शब्दों में ध्वनि बदलती हैं। एक ही व्यंजन अलग-अलग मात्रा से अलग-अलग अर्थ देता है।",
        transliteration: "Maatrayein shabdon mein dhvani badalti hain.",
        english:
          "Matras change the sound in words. Same consonant with different matras gives different meanings.",
        examples: [
          {
            hindi: "कल (kal) = tomorrow/yesterday",
            transliteration: "kal",
            english: "yesterday / tomorrow",
          },
          {
            hindi: "काल (kaal) = time/death",
            transliteration: "kaal",
            english: "time / death / era",
          },
          {
            hindi: "कील (kiil) = nail/pin",
            transliteration: "kiil",
            english: "nail / peg",
          },
          {
            hindi: "कूल (kuul) = cool/bank",
            transliteration: "kuul",
            english: "cool / riverbank",
          },
          {
            hindi: "केल (kel) = banana (archaic)",
            transliteration: "kel",
            english: "banana (old Hindi)",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "मात्राएं",
        question: "क + ा = ?",
        answer: "का",
        questionType: "mcq",
        options: [
          { text: "का", isCorrect: true },
          { text: "कि", isCorrect: false },
          { text: "कु", isCorrect: false },
          { text: "के", isCorrect: false },
        ],
      },
      {
        topic: "मात्राएं",
        question: "'पानी' में कौन-सी मात्राएं हैं?",
        answer: "आ और ई",
        questionType: "mcq",
        options: [
          { text: "आ (ा) और ई (ी)", isCorrect: true },
          { text: "इ (ि) और उ (ु)", isCorrect: false },
          { text: "ए (े) और ओ (ो)", isCorrect: false },
          { text: "केवल आ (ा)", isCorrect: false },
        ],
      },
      {
        topic: "मात्राएं",
        question: "इ की मात्रा व्यंजन के किस ओर लगती है?",
        answer: "बाईं ओर (left)",
        questionType: "mcq",
        options: [
          { text: "बाईं ओर (left side)", isCorrect: true },
          { text: "दाईं ओर (right side)", isCorrect: false },
          { text: "नीचे (below)", isCorrect: false },
          { text: "ऊपर (above)", isCorrect: false },
        ],
      },
      {
        topic: "मात्राएं",
        question: "'किताब' में कितनी मात्राएं हैं?",
        answer: "2",
        questionType: "mcq",
        options: [
          { text: "2 (इ और आ)", isCorrect: true },
          { text: "1", isCorrect: false },
          { text: "3", isCorrect: false },
          { text: "0", isCorrect: false },
        ],
      },
    ],
  },

  {
    id: "sandhi",
    name: "संधि",
    nameEnglish: "Sandhi (Word Joining)",
    description: "दो शब्दों के मिलने पर ध्वनि परिवर्तन",
    descriptionEnglish: "Sound change when two words join",
    icon: "🔗",
    color: "from-indigo-400/20 to-blue-300/20",
    lessons: [
      {
        title: "संधि क्या है?",
        content:
          "जब दो शब्द मिलते हैं और उनके बीच ध्वनि परिवर्तन होता है, तो उसे संधि कहते हैं।",
        transliteration:
          "Jab do shabd milte hain aur unke beech dhvani parivartan hota hai, to use sandhi kahte hain.",
        english:
          "Sandhi is the euphonic combination of words where sounds change at the junction.",
        examples: [
          {
            hindi: "देव + आलय = देवालय",
            transliteration: "dev + aalay = devaalay",
            english: "dev + aalay = temple",
          },
          {
            hindi: "राम + अवतार = रामावतार",
            transliteration: "Raam + avataar = Raamavataar",
            english: "Ram + avataar = incarnation of Ram",
          },
        ],
      },
      {
        title: "स्वर संधि",
        content: "जब दो स्वर पास आते हैं तो स्वर संधि होती है। अ/आ + अ/आ = आ",
        transliteration:
          "Jab do svar paas aate hain to svar sandhi hoti hai. a/aa + a/aa = aa",
        english: "When two vowels come together. a/aa + a/aa = aa (long a).",
        examples: [
          {
            hindi: "राम + अवतार = रामावतार",
            transliteration: "Raam + avataar = Raamavataar",
            english: "a + a = aa",
          },
          {
            hindi: "विद्या + आलय = विद्यालय",
            transliteration: "vidya + aalay = vidyaalay",
            english: "a + aa = aa (school)",
          },
          {
            hindi: "हिम + आलय = हिमालय",
            transliteration: "him + aalay = himaalay",
            english: "a + aa = aa (Himalaya)",
          },
          {
            hindi: "महा + आत्मा = महात्मा",
            transliteration: "mahaa + aatmaa = mahaatmaa",
            english: "aa + aa = aa (Mahatma)",
          },
        ],
      },
      {
        title: "व्यंजन संधि",
        content: "जब व्यंजन से व्यंजन या स्वर मिलता है और ध्वनि बदलती है।",
        transliteration:
          "Jab vyanjan se vyanjan ya svar milta hai aur dhvani badalti hai.",
        english:
          "When a consonant meets another consonant or vowel and the sound changes.",
        examples: [
          {
            hindi: "जगत् + ईश = जगदीश",
            transliteration: "jagat + iish = jagadiish",
            english: "t + i = d (Lord of the World)",
          },
          {
            hindi: "सत् + जन = सज्जन",
            transliteration: "sat + jan = sajjan",
            english: "t + j = jj (gentleman)",
          },
          {
            hindi: "दिक् + गज = दिग्गज",
            transliteration: "dik + gaj = diggaj",
            english: "k + g = gg (great elephant)",
          },
        ],
      },
      {
        title: "विसर्ग संधि",
        content: "जब विसर्ग (ः) से कोई वर्ण मिलता है तो विसर्ग संधि होती है।",
        transliteration:
          "Jab visarg (ः) se koi varn milta hai to visarg sandhi hoti hai.",
        english: "When the visarga (ः) combines with the next letter.",
        examples: [
          {
            hindi: "निः + आशा = निराशा",
            transliteration: "niH + aasha = niraasha",
            english: "nih + a = nir (hopelessness)",
          },
          {
            hindi: "दुः + आत्मा = दुरात्मा",
            transliteration: "duH + aatmaa = duraatmaa",
            english: "duh + a = dur (wicked soul)",
          },
          {
            hindi: "निः + कपट = निष्कपट",
            transliteration: "niH + kapat = nishkapat",
            english: "nih + k = nish (innocent)",
          },
        ],
      },
    ],
    quizzes: [
      {
        topic: "संधि",
        question: "'हिम + आलय' की संधि क्या है?",
        answer: "हिमालय",
        questionType: "mcq",
        options: [
          { text: "हिमालय", isCorrect: true },
          { text: "हिमाआलय", isCorrect: false },
          { text: "हिमलय", isCorrect: false },
          { text: "हिमालाय", isCorrect: false },
        ],
      },
      {
        topic: "संधि",
        question: "अ + अ = ?",
        answer: "आ",
        questionType: "mcq",
        options: [
          { text: "आ (long aa)", isCorrect: true },
          { text: "अ (short a)", isCorrect: false },
          { text: "इ (i)", isCorrect: false },
          { text: "ऐ (ai)", isCorrect: false },
        ],
      },
      {
        topic: "संधि",
        question: "'विद्या + आलय = विद्यालय' — यह किस प्रकार की संधि है?",
        answer: "स्वर संधि",
        questionType: "mcq",
        options: [
          { text: "स्वर संधि (Vowel Sandhi)", isCorrect: true },
          { text: "व्यंजन संधि (Consonant Sandhi)", isCorrect: false },
          { text: "विसर्ग संधि (Visarga Sandhi)", isCorrect: false },
          { text: "कोई संधि नहीं", isCorrect: false },
        ],
      },
      {
        topic: "संधि",
        question: "'महात्मा' किन दो शब्दों की संधि है?",
        answer: "महा + आत्मा",
        questionType: "mcq",
        options: [
          { text: "महा + आत्मा", isCorrect: true },
          { text: "महान + आत्मा", isCorrect: false },
          { text: "माह + त्मा", isCorrect: false },
          { text: "महात् + मा", isCorrect: false },
        ],
      },
    ],
  },
];

export function getGrammarTopicById(id: string): GrammarTopic | undefined {
  return GRAMMAR_TOPICS.find((t) => t.id === id);
}
