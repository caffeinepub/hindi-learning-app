import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trophy,
  Volume2,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useRef, useState } from "react";

// ─── Speech helper ────────────────────────────────────────────────────────────

function speak(text: string, rate = 0.9) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "hi-IN";
  utt.rate = rate;
  window.speechSynthesis.speak(utt);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = "easy" | "medium" | "hard";
type PracticeTab = "fillblank" | "builder" | "translation" | "conjugation";

// ─── Diff helper (for translation mode) ──────────────────────────────────────

type DiffChar = {
  char: string;
  status: "correct" | "wrong" | "missing" | "extra";
};

function computeDiff(expected: string, actual: string): DiffChar[] {
  const result: DiffChar[] = [];
  const maxLen = Math.max(expected.length, actual.length);
  for (let i = 0; i < maxLen; i++) {
    const e = expected[i];
    const a = actual[i];
    if (e === undefined) result.push({ char: a, status: "extra" });
    else if (a === undefined) result.push({ char: e, status: "missing" });
    else if (e === a) result.push({ char: e, status: "correct" });
    else result.push({ char: a, status: "wrong" });
  }
  return result;
}

// ─── Dataset: Fill in the Blank ───────────────────────────────────────────────

interface FillBlankItem {
  sentence: string; // contains _____
  blank: string;
  hint: string;
  translation: string;
  difficulty: Difficulty;
}

const FILL_BLANK: FillBlankItem[] = [
  {
    sentence: "राम _____ खाता है।",
    blank: "खाना",
    hint: "food",
    translation: "Ram eats food.",
    difficulty: "easy",
  },
  {
    sentence: "वह _____ से आती है।",
    blank: "स्कूल",
    hint: "school",
    translation: "She comes from school.",
    difficulty: "easy",
  },
  {
    sentence: "मेरी माँ _____ बनाती है।",
    blank: "रोटी",
    hint: "flatbread",
    translation: "My mother makes roti.",
    difficulty: "easy",
  },
  {
    sentence: "बच्चे बगीचे में _____।",
    blank: "खेलते हैं",
    hint: "play",
    translation: "Children play in the garden.",
    difficulty: "easy",
  },
  {
    sentence: "आसमान _____ है।",
    blank: "नीला",
    hint: "color of sky",
    translation: "The sky is blue.",
    difficulty: "easy",
  },
  {
    sentence: "गाय _____ देती है।",
    blank: "दूध",
    hint: "white liquid",
    translation: "The cow gives milk.",
    difficulty: "easy",
  },
  {
    sentence: "_____ हमेशा सच बोलता है।",
    blank: "वह",
    hint: "pronoun for he",
    translation: "He always speaks the truth.",
    difficulty: "medium",
  },
  {
    sentence: "अध्यापक _____ पढ़ाते हैं।",
    blank: "छात्रों को",
    hint: "to students",
    translation: "The teacher teaches students.",
    difficulty: "medium",
  },
  {
    sentence: "नदी _____ बहती है।",
    blank: "तेज़ी से",
    hint: "quickly",
    translation: "The river flows quickly.",
    difficulty: "medium",
  },
  {
    sentence: "मुझे _____ पसंद है।",
    blank: "संगीत",
    hint: "music",
    translation: "I like music.",
    difficulty: "medium",
  },
  {
    sentence: "वह _____ जाता है।",
    blank: "रोज़ स्कूल",
    hint: "daily to school",
    translation: "He goes to school daily.",
    difficulty: "medium",
  },
  {
    sentence: "हमारे देश की _____ तिरंगा है।",
    blank: "राष्ट्रीय ध्वज",
    hint: "national flag",
    translation: "Our country's national flag is the tricolor.",
    difficulty: "medium",
  },
  {
    sentence: "पुस्तकालय में _____ होती हैं।",
    blank: "किताबें",
    hint: "books",
    translation: "There are books in the library.",
    difficulty: "medium",
  },
  {
    sentence: "बुद्धिमान व्यक्ति _____ सोचता है।",
    blank: "समझदारी से",
    hint: "wisely",
    translation: "A wise person thinks wisely.",
    difficulty: "hard",
  },
  {
    sentence: "परिश्रम _____ की कुंजी है।",
    blank: "सफलता",
    hint: "success",
    translation: "Hard work is the key to success.",
    difficulty: "hard",
  },
  {
    sentence: "उसने _____ में प्रथम स्थान पाया।",
    blank: "परीक्षा",
    hint: "exam",
    translation: "He got first place in the exam.",
    difficulty: "hard",
  },
  {
    sentence: "_____ की वजह से वह रो रहा था।",
    blank: "दुःख",
    hint: "sadness",
    translation: "He was crying because of sadness.",
    difficulty: "hard",
  },
  {
    sentence: "इस _____ में बहुत पानी है।",
    blank: "नदी",
    hint: "river",
    translation: "There is a lot of water in this river.",
    difficulty: "hard",
  },
  {
    sentence: "शिक्षक ने _____ को समझाया।",
    blank: "विद्यार्थियों",
    hint: "students (oblique)",
    translation: "The teacher explained to the students.",
    difficulty: "hard",
  },
  {
    sentence: "वे _____ के साथ बाज़ार गए।",
    blank: "दोस्तों",
    hint: "friends",
    translation: "They went to the market with friends.",
    difficulty: "hard",
  },
];

// ─── Dataset: Sentence Builder ────────────────────────────────────────────────

interface BuilderItem {
  words: string[];
  answer: string;
  translation: string;
  difficulty: Difficulty;
}

const SENTENCE_BUILDER: BuilderItem[] = [
  {
    words: ["राम", "खाना", "खाता", "है"],
    answer: "राम खाना खाता है",
    translation: "Ram eats food.",
    difficulty: "easy",
  },
  {
    words: ["वह", "सुंदर", "लड़की", "है"],
    answer: "वह सुंदर लड़की है",
    translation: "She is a beautiful girl.",
    difficulty: "easy",
  },
  {
    words: ["मैं", "घर", "जाता", "हूँ"],
    answer: "मैं घर जाता हूँ",
    translation: "I go home.",
    difficulty: "easy",
  },
  {
    words: ["कुत्ता", "काला", "है"],
    answer: "कुत्ता काला है",
    translation: "The dog is black.",
    difficulty: "easy",
  },
  {
    words: ["बच्चे", "खेल", "रहे", "हैं"],
    answer: "बच्चे खेल रहे हैं",
    translation: "Children are playing.",
    difficulty: "easy",
  },
  {
    words: ["आम", "मीठा", "है"],
    answer: "आम मीठा है",
    translation: "The mango is sweet.",
    difficulty: "easy",
  },
  {
    words: ["हम", "मिलकर", "काम", "करते", "हैं"],
    answer: "हम मिलकर काम करते हैं",
    translation: "We work together.",
    difficulty: "easy",
  },
  {
    words: ["मेरी", "माँ", "बाज़ार", "से", "सब्ज़ी", "लाती", "है"],
    answer: "मेरी माँ बाज़ार से सब्ज़ी लाती है",
    translation: "My mother brings vegetables from the market.",
    difficulty: "medium",
  },
  {
    words: ["वे", "धीरे-धीरे", "चलते", "हैं"],
    answer: "वे धीरे-धीरे चलते हैं",
    translation: "They walk slowly.",
    difficulty: "medium",
  },
  {
    words: ["छोटी", "चिड़िया", "मधुर", "गाती", "है"],
    answer: "छोटी चिड़िया मधुर गाती है",
    translation: "The little bird sings sweetly.",
    difficulty: "medium",
  },
  {
    words: ["मेरा", "दोस्त", "दूर", "रहता", "है"],
    answer: "मेरा दोस्त दूर रहता है",
    translation: "My friend lives far away.",
    difficulty: "medium",
  },
  {
    words: ["बच्चा", "बगीचे", "में", "खेल", "रहा", "है"],
    answer: "बच्चा बगीचे में खेल रहा है",
    translation: "The child is playing in the garden.",
    difficulty: "medium",
  },
  {
    words: ["वह", "हमेशा", "सच", "बोलता", "है"],
    answer: "वह हमेशा सच बोलता है",
    translation: "He always speaks the truth.",
    difficulty: "medium",
  },
  {
    words: ["सूरज", "पूर्व", "में", "उगता", "है"],
    answer: "सूरज पूर्व में उगता है",
    translation: "The sun rises in the east.",
    difficulty: "medium",
  },
  {
    words: ["अध्यापक", "कक्षा", "में", "छात्रों", "को", "पढ़ाते", "हैं"],
    answer: "अध्यापक कक्षा में छात्रों को पढ़ाते हैं",
    translation: "The teacher teaches students in the classroom.",
    difficulty: "hard",
  },
  {
    words: ["बुद्धिमान", "बूढ़े", "आदमी", "ने", "एक", "रोचक", "कहानी", "सुनाई"],
    answer: "बुद्धिमान बूढ़े आदमी ने एक रोचक कहानी सुनाई",
    translation: "The wise old man told an interesting story.",
    difficulty: "hard",
  },
  {
    words: ["वह", "हिंदी", "किताबें", "बहुत", "ध्यान", "से", "पढ़ती", "है"],
    answer: "वह हिंदी किताबें बहुत ध्यान से पढ़ती है",
    translation: "She reads Hindi books very carefully.",
    difficulty: "hard",
  },
  {
    words: ["बच्चे", "विद्यालय", "में", "जल्दी", "नई", "बातें", "सीखते", "हैं"],
    answer: "बच्चे विद्यालय में जल्दी नई बातें सीखते हैं",
    translation: "Children learn new things quickly in school.",
    difficulty: "hard",
  },
  {
    words: ["नदी", "घाटी", "से", "होकर", "सुंदर", "रूप", "में", "बहती", "है"],
    answer: "नदी घाटी से होकर सुंदर रूप में बहती है",
    translation: "The river flows beautifully through the valley.",
    difficulty: "hard",
  },
  {
    words: ["कुशल", "डॉक्टर", "ने", "मरीज़", "का", "अच्छी", "तरह", "इलाज", "किया"],
    answer: "कुशल डॉक्टर ने मरीज़ का अच्छी तरह इलाज किया",
    translation: "The skilled doctor treated the patient well.",
    difficulty: "hard",
  },
];

// ─── Dataset: Translation ─────────────────────────────────────────────────────

interface TranslationItem {
  english: string;
  hindi: string;
  difficulty: Difficulty;
}

const TRANSLATION_ITEMS: TranslationItem[] = [
  { english: "Ram eats food.", hindi: "राम खाना खाता है।", difficulty: "easy" },
  { english: "She is beautiful.", hindi: "वह सुंदर है।", difficulty: "easy" },
  { english: "I am going home.", hindi: "मैं घर जा रहा हूँ।", difficulty: "easy" },
  { english: "The dog is black.", hindi: "कुत्ता काला है।", difficulty: "easy" },
  { english: "The mango is sweet.", hindi: "आम मीठा है।", difficulty: "easy" },
  {
    english: "Children are playing.",
    hindi: "बच्चे खेल रहे हैं।",
    difficulty: "easy",
  },
  { english: "The sky is blue.", hindi: "आसमान नीला है।", difficulty: "easy" },
  {
    english: "My mother makes roti.",
    hindi: "मेरी माँ रोटी बनाती है।",
    difficulty: "medium",
  },
  {
    english: "He always speaks the truth.",
    hindi: "वह हमेशा सच बोलता है।",
    difficulty: "medium",
  },
  {
    english: "The child is playing in the garden.",
    hindi: "बच्चा बगीचे में खेल रहा है।",
    difficulty: "medium",
  },
  {
    english: "My friend lives far away.",
    hindi: "मेरा दोस्त दूर रहता है।",
    difficulty: "medium",
  },
  {
    english: "The little bird sings sweetly.",
    hindi: "छोटी चिड़िया मधुर गाती है।",
    difficulty: "medium",
  },
  {
    english: "They walk slowly.",
    hindi: "वे धीरे-धीरे चलते हैं।",
    difficulty: "medium",
  },
  {
    english: "The sun rises in the east.",
    hindi: "सूरज पूर्व में उगता है।",
    difficulty: "medium",
  },
  {
    english: "The teacher teaches students in the classroom.",
    hindi: "अध्यापक कक्षा में छात्रों को पढ़ाते हैं।",
    difficulty: "hard",
  },
  {
    english: "She reads Hindi books very carefully.",
    hindi: "वह हिंदी किताबें बहुत ध्यान से पढ़ती है।",
    difficulty: "hard",
  },
  {
    english: "The wise old man told an interesting story.",
    hindi: "बुद्धिमान बूढ़े आदमी ने एक रोचक कहानी सुनाई।",
    difficulty: "hard",
  },
  {
    english: "Children learn new things quickly in school.",
    hindi: "बच्चे विद्यालय में जल्दी नई बातें सीखते हैं।",
    difficulty: "hard",
  },
  {
    english: "The skilled doctor treated the patient well.",
    hindi: "कुशल डॉक्टर ने मरीज़ का अच्छी तरह इलाज किया।",
    difficulty: "hard",
  },
  {
    english: "Hard work is the key to success.",
    hindi: "परिश्रम सफलता की कुंजी है।",
    difficulty: "hard",
  },
];

// ─── Dataset: Verb Conjugation ────────────────────────────────────────────────

interface ConjugationItem {
  verb: string;
  subject: string;
  tense: string;
  correct: string;
  options: string[];
}

const CONJUGATION_ITEMS: ConjugationItem[] = [
  {
    verb: "खाना (to eat)",
    subject: "मैं",
    tense: "Present",
    correct: "खाता/खाती हूँ",
    options: ["खाता/खाती हूँ", "खाता/खाती था/थी", "खाऊँगा/खाऊँगी", "खाते/खाती हैं"],
  },
  {
    verb: "जाना (to go)",
    subject: "वह",
    tense: "Present",
    correct: "जाता/जाती है",
    options: ["जाता/जाती है", "जाता/जाती था/थी", "जाएगा/जाएगी", "जाते/जाती हैं"],
  },
  {
    verb: "पढ़ना (to read)",
    subject: "हम",
    tense: "Present",
    correct: "पढ़ते/पढ़ती हैं",
    options: ["पढ़ता/पढ़ती हूँ", "पढ़ते/पढ़ती हैं", "पढ़ेंगे/पढ़ेंगी", "पढ़ता/पढ़ती था/थी"],
  },
  {
    verb: "बोलना (to speak)",
    subject: "तुम",
    tense: "Present",
    correct: "बोलते/बोलती हो",
    options: [
      "बोलते/बोलती हो",
      "बोलता/बोलती हूँ",
      "बोलेगा/बोलेगी",
      "बोलते/बोलती थे/थीं",
    ],
  },
  {
    verb: "आना (to come)",
    subject: "वे",
    tense: "Present",
    correct: "आते/आती हैं",
    options: ["आता/आती हूँ", "आते/आती हैं", "आएंगे/आएंगी", "आता/आती था/थी"],
  },
  {
    verb: "सोना (to sleep)",
    subject: "मैं",
    tense: "Past",
    correct: "सोया/सोई",
    options: ["सोया/सोई", "सोता/सोती हूँ", "सोऊँगा/सोऊँगी", "सो रहा/रही हूँ"],
  },
  {
    verb: "खाना (to eat)",
    subject: "वह",
    tense: "Past",
    correct: "खाया/खाई",
    options: ["खाया/खाई", "खाता/खाती है", "खाएगा/खाएगी", "खाता/खाती था/थी"],
  },
  {
    verb: "जाना (to go)",
    subject: "हम",
    tense: "Past",
    correct: "गए/गईं",
    options: ["जाते/जाती हैं", "गए/गईं", "जाएंगे/जाएंगी", "जा रहे/रही हैं"],
  },
  {
    verb: "पढ़ना (to read)",
    subject: "वे",
    tense: "Past",
    correct: "पढ़े/पढ़ीं",
    options: ["पढ़ते/पढ़ती हैं", "पढ़ेंगे/पढ़ेंगी", "पढ़े/पढ़ीं", "पढ़ रहे/रही हैं"],
  },
  {
    verb: "लिखना (to write)",
    subject: "तुम",
    tense: "Past",
    correct: "लिखा/लिखी",
    options: ["लिखते/लिखती हो", "लिखा/लिखी", "लिखोगे/लिखोगी", "लिख रहे/रही हो"],
  },
  {
    verb: "आना (to come)",
    subject: "मैं",
    tense: "Future",
    correct: "आऊँगा/आऊँगी",
    options: ["आता/आती हूँ", "आया/आई", "आऊँगा/आऊँगी", "आ रहा/रही हूँ"],
  },
  {
    verb: "खाना (to eat)",
    subject: "हम",
    tense: "Future",
    correct: "खाएंगे/खाएंगी",
    options: ["खाते/खाती हैं", "खाया/खाई", "खाएंगे/खाएंगी", "खा रहे/रही हैं"],
  },
  {
    verb: "बोलना (to speak)",
    subject: "वह",
    tense: "Future",
    correct: "बोलेगा/बोलेगी",
    options: ["बोलता/बोलती है", "बोला/बोली", "बोलेगा/बोलेगी", "बोल रहा/रही है"],
  },
  {
    verb: "जाना (to go)",
    subject: "वे",
    tense: "Future",
    correct: "जाएंगे/जाएंगी",
    options: ["जाते/जाती हैं", "गए/गईं", "जाएंगे/जाएंगी", "जा रहे/रही हैं"],
  },
  {
    verb: "पढ़ना (to read)",
    subject: "मैं",
    tense: "Future",
    correct: "पढ़ूँगा/पढ़ूँगी",
    options: ["पढ़ता/पढ़ती हूँ", "पढ़ा/पढ़ी", "पढ़ूँगा/पढ़ूँगी", "पढ़ रहा/रही हूँ"],
  },
];

// ─── Shared sub-components ────────────────────────────────────────────────────

interface DifficultyFilterProps {
  value: Difficulty | "all";
  onChange: (d: Difficulty | "all") => void;
}

function DifficultyFilter({ value, onChange }: DifficultyFilterProps) {
  const options: (Difficulty | "all")[] = ["all", "easy", "medium", "hard"];
  const labels: Record<Difficulty | "all", string> = {
    all: "सभी",
    easy: "आसान",
    medium: "मध्यम",
    hard: "कठिन",
  };
  return (
    <div className="flex gap-1.5">
      {options.map((d) => (
        <button
          key={d}
          type="button"
          onClick={() => onChange(d)}
          className={`flex-1 py-1.5 rounded-xl text-[11px] font-semibold border transition-all duration-200
            ${
              value === d
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
            }`}
        >
          {labels[d]}
          {d !== "all" && (
            <span className="block text-[9px] opacity-60 capitalize">{d}</span>
          )}
        </button>
      ))}
    </div>
  );
}

interface ScoreDisplayProps {
  correct: number;
  total: number;
}

function ScoreDisplay({ correct, total }: ScoreDisplayProps) {
  if (total === 0) return null;
  return (
    <div className="flex items-center gap-1.5 bg-primary/10 rounded-xl px-3 py-1.5">
      <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
      <span className="text-xs font-semibold text-primary">
        {correct}/{total}
      </span>
    </div>
  );
}

interface SummaryScreenProps {
  correct: number;
  total: number;
  onRetry: () => void;
  label: string;
}

function SummaryScreen({ correct, total, onRetry, label }: SummaryScreenProps) {
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center gap-6 py-12 px-5"
    >
      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
        <Trophy className="w-12 h-12 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold text-foreground mb-1">
          {correct}{" "}
          <span className="text-muted-foreground text-2xl">/ {total}</span>
        </p>
        <p className="text-lg font-semibold text-primary">{pct}% सही</p>
        <p className="text-sm text-muted-foreground mt-2">
          {pct >= 80
            ? "शाबाश! बहुत अच्छा!"
            : pct >= 50
              ? "अच्छा प्रयास! और अभ्यास करें।"
              : "अभ्यास जारी रखें!"}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{label}</p>
      </div>
      <div className="w-full max-w-xs bg-muted rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <Button onClick={onRetry} className="gap-2">
        <RotateCcw className="w-4 h-4" />
        फिर से करें (Try Again)
      </Button>
    </motion.div>
  );
}

// ─── Tab A: Fill in the Blank ─────────────────────────────────────────────────

function FillBlankMode() {
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const pool = useMemo(
    () =>
      shuffle(
        FILL_BLANK.filter(
          (x) => difficulty === "all" || x.difficulty === difficulty,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [difficulty],
  );
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const item = pool[index] ?? null;
  const isCorrect = checked ? input.trim() === item?.blank.trim() : null;

  function handleDifficultyChange(d: Difficulty | "all") {
    setDifficulty(d);
    setIndex(0);
    setInput("");
    setChecked(false);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  function handleCheck() {
    if (!item || checked) return;
    const correct = input.trim() === item.blank.trim();
    setChecked(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    speak(item.sentence.replace("_____", item.blank));
  }

  function handleNext() {
    if (index + 1 >= pool.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setInput("");
      setChecked(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleRetry() {
    setIndex(0);
    setInput("");
    setChecked(false);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  if (pool.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8 text-sm">
        इस श्रेणी में कोई प्रश्न नहीं।
      </p>
    );
  }

  if (finished) {
    return (
      <SummaryScreen
        correct={score.correct}
        total={score.total}
        onRetry={handleRetry}
        label="Fill in the Blank"
      />
    );
  }

  const progress =
    pool.length > 0 ? ((index + (checked ? 1 : 0)) / pool.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <DifficultyFilter value={difficulty} onChange={handleDifficultyChange} />

      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          प्रश्न {index + 1} / {pool.length}
        </span>
        <ScoreDisplay correct={score.correct} total={score.total} />
      </div>
      <Progress value={progress} className="h-1.5" />

      <AnimatePresence mode="wait">
        {item && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4"
          >
            {/* Sentence with blank */}
            <div className="flex items-start justify-between gap-3">
              <p className="devanagari text-2xl font-semibold text-foreground leading-relaxed flex-1">
                {item.sentence}
              </p>
              <button
                type="button"
                onClick={() =>
                  speak(item.sentence.replace("_____", item.blank))
                }
                className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0 mt-1"
                aria-label="Play sentence"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-muted-foreground italic">
              संकेत (Hint): {item.hint} ·{" "}
              <span className="text-muted-foreground/70">
                {item.translation}
              </span>
            </p>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="fill-input"
                className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide"
              >
                रिक्त स्थान भरें (Fill the blank)
              </label>
              <input
                id="fill-input"
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!checked) handleCheck();
                    else handleNext();
                  }
                }}
                disabled={checked}
                placeholder="यहाँ लिखें..."
                className={`w-full rounded-xl border-2 px-4 py-3 devanagari text-xl leading-relaxed
                  bg-card outline-none transition-all duration-200 placeholder:text-muted-foreground/40
                  ${checked ? "cursor-not-allowed opacity-80" : "focus:border-primary/60"}
                  ${isCorrect === true ? "border-green-500/60 bg-green-50 dark:bg-green-950/20" : isCorrect === false ? "border-destructive/50 bg-destructive/5" : "border-border"}`}
              />
            </div>

            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl px-4 py-3 text-center border ${isCorrect ? "bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-700" : "bg-destructive/5 border-destructive/30"}`}
              >
                {isCorrect ? (
                  <p className="text-green-700 dark:text-green-300 font-semibold text-sm">
                    ✓ शाबाश! सही उत्तर!
                  </p>
                ) : (
                  <p className="text-destructive text-sm">
                    ✗ सही उत्तर:{" "}
                    <span className="devanagari font-bold text-lg">
                      {item.blank}
                    </span>
                  </p>
                )}
              </motion.div>
            )}

            <div className="flex gap-2">
              {!checked ? (
                <Button
                  onClick={handleCheck}
                  disabled={input.trim().length === 0}
                  className="flex-1"
                >
                  जाँचें (Check)
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1 gap-2">
                  {index + 1 >= pool.length ? "परिणाम देखें" : "अगला"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab B: Sentence Builder ──────────────────────────────────────────────────

function SentenceBuilderMode() {
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const pool = useMemo(
    () =>
      shuffle(
        SENTENCE_BUILDER.filter(
          (x) => difficulty === "all" || x.difficulty === difficulty,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [difficulty],
  );
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>(() =>
    pool[0] ? shuffle([...pool[0].words]) : [],
  );
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const item = pool[index] ?? null;
  const isCorrect = checked && item ? selected.join(" ") === item.answer : null;

  function handleDifficultyChange(d: Difficulty | "all") {
    setDifficulty(d);
    setIndex(0);
    setSelected([]);
    setChecked(false);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  function loadItem(idx: number, p: BuilderItem[]) {
    if (p[idx]) {
      setShuffledWords(shuffle([...p[idx].words]));
    }
    setSelected([]);
    setChecked(false);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset
  useMemo(() => {
    if (pool[0]) setShuffledWords(shuffle([...pool[0].words]));
  }, [difficulty]);

  function handleSelectWord(wordId: number) {
    if (checked) return;
    const word = shuffledWords[wordId];
    setSelected((prev) => [...prev, word]);
  }

  function handleRemoveSelected(idx: number) {
    if (checked) return;
    setSelected((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleCheck() {
    if (!item || checked) return;
    const correct = selected.join(" ") === item.answer;
    setChecked(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    speak(item.answer);
  }

  function handleReset() {
    setSelected([]);
    setChecked(false);
  }

  function handleNext() {
    if (index + 1 >= pool.length) {
      setFinished(true);
    } else {
      const next = index + 1;
      setIndex(next);
      loadItem(next, pool);
    }
  }

  function handleRetry() {
    setIndex(0);
    setSelected([]);
    setChecked(false);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
    if (pool[0]) setShuffledWords(shuffle([...pool[0].words]));
  }

  if (pool.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8 text-sm">
        इस श्रेणी में कोई प्रश्न नहीं।
      </p>
    );
  }

  if (finished) {
    return (
      <SummaryScreen
        correct={score.correct}
        total={score.total}
        onRetry={handleRetry}
        label="Sentence Builder"
      />
    );
  }

  const progress =
    pool.length > 0 ? ((index + (checked ? 1 : 0)) / pool.length) * 100 : 0;

  // Track which shuffledWords indices have been used in selected
  const usedIdx = new Set<number>();
  const orderedSelected: { word: string; srcIdx: number }[] = selected.map(
    (w) => {
      const si = shuffledWords.findIndex(
        (sw, i) => sw === w && !usedIdx.has(i),
      );
      if (si !== -1) usedIdx.add(si);
      return { word: w, srcIdx: si };
    },
  );
  const usedIdxForChips = new Set(orderedSelected.map((x) => x.srcIdx));

  return (
    <div className="space-y-4">
      <DifficultyFilter value={difficulty} onChange={handleDifficultyChange} />

      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          प्रश्न {index + 1} / {pool.length}
        </span>
        <ScoreDisplay correct={score.correct} total={score.total} />
      </div>
      <Progress value={progress} className="h-1.5" />

      <AnimatePresence mode="wait">
        {item && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4"
          >
            {/* Translation hint */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                  अंग्रेज़ी (English)
                </p>
                <p className="text-base text-foreground font-medium italic">
                  {item.translation}
                </p>
              </div>
              <button
                type="button"
                onClick={() => speak(item.answer)}
                className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
                aria-label="Play sentence"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Selected words area */}
            <div className="min-h-14 bg-muted/50 rounded-xl border-2 border-dashed border-border p-3 flex flex-wrap gap-2 items-center">
              {orderedSelected.length === 0 ? (
                <span className="text-xs text-muted-foreground">
                  शब्दों को क्रम में चुनें...
                </span>
              ) : (
                orderedSelected.map(({ word }, si) => (
                  <motion.button
                    key={`sel-${si}-${word}`}
                    type="button"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.85, opacity: 0 }}
                    onClick={() => !checked && handleRemoveSelected(si)}
                    className={`devanagari text-base font-semibold px-3 py-1.5 rounded-xl border-2 transition-all
                      ${
                        checked
                          ? isCorrect
                            ? "bg-green-100 dark:bg-green-900/40 border-green-400 text-green-700 dark:text-green-300"
                            : "bg-destructive/10 border-destructive/40 text-destructive"
                          : "bg-primary/10 border-primary text-primary hover:bg-destructive/10 hover:border-destructive hover:text-destructive cursor-pointer"
                      }`}
                  >
                    {word}
                  </motion.button>
                ))
              )}
            </div>

            {/* Available word chips */}
            <div className="flex flex-wrap gap-2">
              {shuffledWords.map((word, wi) => {
                const isUsed = usedIdxForChips.has(wi);
                return (
                  <motion.button
                    key={`chip-${wi}-${word}`}
                    type="button"
                    whileTap={{ scale: 0.9 }}
                    onClick={() => !checked && !isUsed && handleSelectWord(wi)}
                    disabled={checked || isUsed}
                    className={`devanagari text-base font-semibold px-3 py-1.5 rounded-xl border-2 transition-all
                      ${
                        isUsed
                          ? "opacity-30 cursor-not-allowed bg-muted border-border text-muted-foreground"
                          : checked
                            ? "opacity-40 cursor-not-allowed bg-muted border-border text-muted-foreground"
                            : "bg-card border-border text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer active:scale-95"
                      }`}
                  >
                    {word}
                  </motion.button>
                );
              })}
            </div>

            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl px-4 py-3 border ${isCorrect ? "bg-green-50 dark:bg-green-950/30 border-green-300" : "bg-destructive/5 border-destructive/30"}`}
              >
                {isCorrect ? (
                  <p className="text-green-700 dark:text-green-300 font-semibold text-sm text-center">
                    ✓ शाबाश! वाक्य सही है!
                  </p>
                ) : (
                  <div className="text-center">
                    <p className="text-destructive text-xs mb-1">✗ सही वाक्य:</p>
                    <p className="devanagari font-bold text-lg text-foreground">
                      {item.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            <div className="flex gap-2">
              {!checked ? (
                <>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="flex-1"
                    disabled={selected.length === 0}
                  >
                    <RotateCcw className="w-4 h-4 mr-1.5" />
                    रीसेट
                  </Button>
                  <Button
                    onClick={handleCheck}
                    className="flex-1"
                    disabled={selected.length === 0}
                  >
                    जाँचें
                  </Button>
                </>
              ) : (
                <Button onClick={handleNext} className="flex-1 gap-2">
                  {index + 1 >= pool.length ? "परिणाम देखें" : "अगला"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab C: Translation ───────────────────────────────────────────────────────

function TranslationMode() {
  const [difficulty, setDifficulty] = useState<Difficulty | "all">("all");
  const pool = useMemo(
    () =>
      shuffle(
        TRANSLATION_ITEMS.filter(
          (x) => difficulty === "all" || x.difficulty === difficulty,
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [difficulty],
  );
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [diff, setDiff] = useState<DiffChar[]>([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const item = pool[index] ?? null;
  const isCorrect = checked && item ? input.trim() === item.hindi.trim() : null;

  function handleDifficultyChange(d: Difficulty | "all") {
    setDifficulty(d);
    setIndex(0);
    setInput("");
    setChecked(false);
    setDiff([]);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  function handleCheck() {
    if (!item || checked) return;
    const correct = input.trim() === item.hindi.trim();
    const d = computeDiff(item.hindi, input);
    setDiff(d);
    setChecked(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    speak(item.hindi);
  }

  function handleNext() {
    if (index + 1 >= pool.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setInput("");
      setChecked(false);
      setDiff([]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleRetry() {
    setIndex(0);
    setInput("");
    setChecked(false);
    setDiff([]);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  if (pool.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8 text-sm">
        इस श्रेणी में कोई प्रश्न नहीं।
      </p>
    );
  }

  if (finished) {
    return (
      <SummaryScreen
        correct={score.correct}
        total={score.total}
        onRetry={handleRetry}
        label="Translation"
      />
    );
  }

  const progress =
    pool.length > 0 ? ((index + (checked ? 1 : 0)) / pool.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <DifficultyFilter value={difficulty} onChange={handleDifficultyChange} />

      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          प्रश्न {index + 1} / {pool.length}
        </span>
        <ScoreDisplay correct={score.correct} total={score.total} />
      </div>
      <Progress value={progress} className="h-1.5" />

      <AnimatePresence mode="wait">
        {item && (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                  English
                </p>
                <p className="text-xl font-semibold text-foreground">
                  {item.english}
                </p>
              </div>
              {checked && (
                <button
                  type="button"
                  onClick={() => speak(item.hindi)}
                  className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
                  aria-label="Play Hindi"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="trans-input"
                className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide"
              >
                हिंदी में अनुवाद करें
              </label>
              <textarea
                id="trans-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (!checked) handleCheck();
                    else handleNext();
                  }
                }}
                disabled={checked}
                rows={3}
                placeholder="हिंदी में लिखें..."
                className={`w-full rounded-xl border-2 px-4 py-3 devanagari text-xl leading-relaxed resize-none
                  bg-card outline-none transition-all duration-200 placeholder:text-muted-foreground/40
                  ${checked ? "cursor-not-allowed opacity-80" : "focus:border-primary/60"}
                  ${isCorrect === true ? "border-green-500/60 bg-green-50 dark:bg-green-950/20" : isCorrect === false ? "border-destructive/50 bg-destructive/5" : "border-border"}`}
              />
            </div>

            {checked && diff.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl px-4 py-3"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  समीक्षा (Review)
                </p>
                <div className="flex flex-wrap gap-0.5 devanagari text-xl leading-relaxed">
                  {diff.map((d, i) => (
                    <span
                      key={`${d.char}-${d.status}-${i}`}
                      className={
                        d.status === "correct"
                          ? "text-green-600 dark:text-green-400"
                          : d.status === "wrong"
                            ? "text-destructive font-bold underline decoration-destructive/60"
                            : d.status === "missing"
                              ? "text-amber-600 bg-amber-50 dark:bg-amber-950/40 rounded px-0.5"
                              : "text-muted-foreground line-through"
                      }
                    >
                      {d.char}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-2 text-[10px]">
                  <span className="text-green-600 dark:text-green-400">
                    ● सही
                  </span>
                  <span className="text-destructive">● गलत</span>
                  <span className="text-amber-600">● कमी</span>
                </div>
              </motion.div>
            )}

            <div className="flex gap-2">
              {!checked ? (
                <Button
                  onClick={handleCheck}
                  disabled={input.trim().length === 0}
                  className="flex-1"
                >
                  जाँचें (Check)
                </Button>
              ) : (
                <Button onClick={handleNext} className="flex-1 gap-2">
                  {index + 1 >= pool.length ? "परिणाम देखें" : "अगला"}
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Tab D: Verb Conjugation ──────────────────────────────────────────────────

function ConjugationMode() {
  const pool = useMemo(() => shuffle([...CONJUGATION_ITEMS]), []);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [finished, setFinished] = useState(false);

  const item = pool[index] ?? null;
  // biome-ignore lint/correctness/useExhaustiveDependencies: item changes with index
  const shuffledOptions = useMemo(
    () => (item ? shuffle([...item.options]) : []),
    [index], // eslint-disable-line react-hooks/exhaustive-deps
  );

  function handleSelect(option: string) {
    if (checked) return;
    setSelected(option);
    const correct = option === item?.correct;
    setChecked(true);
    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));
    speak(option);
  }

  function handleNext() {
    if (index + 1 >= pool.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setChecked(false);
    }
  }

  function handleRetry() {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore({ correct: 0, total: 0 });
    setFinished(false);
  }

  if (finished) {
    return (
      <SummaryScreen
        correct={score.correct}
        total={score.total}
        onRetry={handleRetry}
        label="Verb Conjugation"
      />
    );
  }

  const progress =
    pool.length > 0 ? ((index + (checked ? 1 : 0)) / pool.length) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-[10px] text-muted-foreground">
        <span>
          प्रश्न {index + 1} / {pool.length}
        </span>
        <ScoreDisplay correct={score.correct} total={score.total} />
      </div>
      <Progress value={progress} className="h-1.5" />

      <AnimatePresence mode="wait">
        {item && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="bg-card border border-border rounded-2xl p-5 shadow-sm space-y-5"
          >
            {/* Question prompt */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide font-semibold mb-1">
                    क्रिया (Verb)
                  </p>
                  <p className="devanagari text-xl font-bold text-foreground">
                    {item.verb}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => speak(item.correct)}
                  className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors flex-shrink-0"
                  aria-label="Play answer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    कर्ता (Subject)
                  </p>
                  <p className="devanagari text-lg font-semibold text-primary">
                    {item.subject}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    काल (Tense)
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {item.tense}
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              सही क्रिया रूप चुनें (Choose the correct conjugated form):
            </p>

            {/* MCQ options */}
            <div className="grid grid-cols-1 gap-2">
              {shuffledOptions.map((option) => {
                const isSelected = selected === option;
                const isCorrectOption = option === item.correct;
                return (
                  <motion.button
                    key={option}
                    type="button"
                    whileTap={!checked ? { scale: 0.97 } : {}}
                    onClick={() => handleSelect(option)}
                    className={`w-full devanagari text-base font-semibold px-4 py-3 rounded-xl border-2
                      text-left transition-all duration-200
                      ${
                        checked
                          ? isCorrectOption
                            ? "bg-green-100 dark:bg-green-900/40 border-green-500 text-green-700 dark:text-green-300"
                            : isSelected && !isCorrectOption
                              ? "bg-destructive/10 border-destructive text-destructive"
                              : "bg-muted/60 border-border/60 text-muted-foreground opacity-60"
                          : "bg-card border-border text-foreground hover:border-primary hover:bg-primary/5 cursor-pointer"
                      }`}
                  >
                    <span>{option}</span>
                    {checked && isCorrectOption && (
                      <span className="float-right text-green-600">✓</span>
                    )}
                    {checked && isSelected && !isCorrectOption && (
                      <span className="float-right text-destructive">✗</span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl px-4 py-3 text-center border ${selected === item.correct ? "bg-green-50 dark:bg-green-950/30 border-green-300" : "bg-destructive/5 border-destructive/30"}`}
              >
                {selected === item.correct ? (
                  <p className="text-green-700 dark:text-green-300 font-semibold text-sm">
                    ✓ शाबाश! सही उत्तर!
                  </p>
                ) : (
                  <p className="text-destructive text-sm">
                    ✗ सही उत्तर:{" "}
                    <span className="devanagari font-bold">{item.correct}</span>
                  </p>
                )}
              </motion.div>
            )}

            {checked && (
              <Button onClick={handleNext} className="w-full gap-2">
                {index + 1 >= pool.length ? "परिणाम देखें" : "अगला प्रश्न"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface GrammarPracticePageProps {
  onBack: () => void;
}

const TAB_CONFIG: { id: PracticeTab; label: string; hindi: string }[] = [
  { id: "fillblank", label: "Fill Blank", hindi: "रिक्त स्थान" },
  { id: "builder", label: "Builder", hindi: "वाक्य बनाओ" },
  { id: "translation", label: "Translate", hindi: "अनुवाद" },
  { id: "conjugation", label: "Conjugate", hindi: "क्रिया रूप" },
];

export function GrammarPracticePage({ onBack }: GrammarPracticePageProps) {
  const [activeTab, setActiveTab] = useState<PracticeTab>("fillblank");

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-display text-lg font-semibold text-foreground leading-none">
              Practice — अभ्यास
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              4 modes to master Hindi grammar
            </p>
          </div>
        </div>

        {/* Segmented tab control */}
        <div className="max-w-lg mx-auto px-4 pb-3">
          <div className="flex gap-1 p-1 bg-muted rounded-xl">
            {TAB_CONFIG.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-200 leading-tight text-center
                  ${
                    activeTab === tab.id
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                <span className="block">{tab.label}</span>
                <span className="block devanagari opacity-70 text-[9px]">
                  {tab.hindi}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "fillblank" && <FillBlankMode />}
            {activeTab === "builder" && <SentenceBuilderMode />}
            {activeTab === "translation" && <TranslationMode />}
            {activeTab === "conjugation" && <ConjugationMode />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
