import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, RefreshCw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Tag =
  | "noun"
  | "verb"
  | "adjective"
  | "pronoun"
  | "adverb"
  | "postposition"
  | "other";

interface WordToken {
  word: string;
  correctTag: Tag;
}

interface Sentence {
  id: number;
  words: WordToken[];
  translation: string;
  difficulty: "easy" | "medium" | "hard";
}

// ─── Dataset ─────────────────────────────────────────────────────────────────

const SENTENCES: Sentence[] = [
  // Easy
  {
    id: 1,
    difficulty: "easy",
    translation: "Ram eats food.",
    words: [
      { word: "राम", correctTag: "noun" },
      { word: "खाना", correctTag: "noun" },
      { word: "खाता", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 2,
    difficulty: "easy",
    translation: "She is a beautiful girl.",
    words: [
      { word: "वह", correctTag: "pronoun" },
      { word: "सुंदर", correctTag: "adjective" },
      { word: "लड़की", correctTag: "noun" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 3,
    difficulty: "easy",
    translation: "The dog is black.",
    words: [
      { word: "कुत्ता", correctTag: "noun" },
      { word: "काला", correctTag: "adjective" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 4,
    difficulty: "easy",
    translation: "I am going.",
    words: [
      { word: "मैं", correctTag: "pronoun" },
      { word: "जाता", correctTag: "verb" },
      { word: "हूँ", correctTag: "verb" },
    ],
  },
  {
    id: 5,
    difficulty: "easy",
    translation: "This mango is sweet.",
    words: [
      { word: "यह", correctTag: "pronoun" },
      { word: "आम", correctTag: "noun" },
      { word: "मीठा", correctTag: "adjective" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 6,
    difficulty: "easy",
    translation: "The child is sleeping.",
    words: [
      { word: "बच्चा", correctTag: "noun" },
      { word: "सो", correctTag: "verb" },
      { word: "रहा", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  // Medium
  {
    id: 7,
    difficulty: "medium",
    translation: "My mother brings vegetables from the market.",
    words: [
      { word: "मेरी", correctTag: "adjective" },
      { word: "माँ", correctTag: "noun" },
      { word: "बाज़ार", correctTag: "noun" },
      { word: "से", correctTag: "postposition" },
      { word: "सब्ज़ी", correctTag: "noun" },
      { word: "लाती", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 8,
    difficulty: "medium",
    translation: "They walk slowly.",
    words: [
      { word: "वे", correctTag: "pronoun" },
      { word: "धीरे-धीरे", correctTag: "adverb" },
      { word: "चलते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 9,
    difficulty: "medium",
    translation: "The little bird sings sweetly.",
    words: [
      { word: "छोटी", correctTag: "adjective" },
      { word: "चिड़िया", correctTag: "noun" },
      { word: "मधुर", correctTag: "adverb" },
      { word: "गाती", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 10,
    difficulty: "medium",
    translation: "He always speaks the truth.",
    words: [
      { word: "वह", correctTag: "pronoun" },
      { word: "हमेशा", correctTag: "adverb" },
      { word: "सच", correctTag: "noun" },
      { word: "बोलता", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 11,
    difficulty: "medium",
    translation: "The child is playing in the garden.",
    words: [
      { word: "बच्चा", correctTag: "noun" },
      { word: "बगीचे", correctTag: "noun" },
      { word: "में", correctTag: "postposition" },
      { word: "खेल", correctTag: "verb" },
      { word: "रहा", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 12,
    difficulty: "medium",
    translation: "My friend lives far away.",
    words: [
      { word: "मेरा", correctTag: "adjective" },
      { word: "दोस्त", correctTag: "noun" },
      { word: "दूर", correctTag: "adverb" },
      { word: "रहता", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  // Hard
  {
    id: 13,
    difficulty: "hard",
    translation: "The teacher teaches students in the classroom.",
    words: [
      { word: "अध्यापक", correctTag: "noun" },
      { word: "कक्षा", correctTag: "noun" },
      { word: "में", correctTag: "postposition" },
      { word: "छात्रों", correctTag: "noun" },
      { word: "को", correctTag: "postposition" },
      { word: "पढ़ाते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 14,
    difficulty: "hard",
    translation: "The wise old man told an interesting story.",
    words: [
      { word: "बुद्धिमान", correctTag: "adjective" },
      { word: "बूढ़े", correctTag: "adjective" },
      { word: "आदमी", correctTag: "noun" },
      { word: "ने", correctTag: "postposition" },
      { word: "एक", correctTag: "adjective" },
      { word: "रोचक", correctTag: "adjective" },
      { word: "कहानी", correctTag: "noun" },
      { word: "सुनाई", correctTag: "verb" },
    ],
  },
  {
    id: 15,
    difficulty: "hard",
    translation: "She reads Hindi books very carefully.",
    words: [
      { word: "वह", correctTag: "pronoun" },
      { word: "हिंदी", correctTag: "adjective" },
      { word: "किताबें", correctTag: "noun" },
      { word: "बहुत", correctTag: "adverb" },
      { word: "ध्यान", correctTag: "noun" },
      { word: "से", correctTag: "postposition" },
      { word: "पढ़ती", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 16,
    difficulty: "hard",
    translation: "The skilled doctor treated the patient well.",
    words: [
      { word: "कुशल", correctTag: "adjective" },
      { word: "डॉक्टर", correctTag: "noun" },
      { word: "ने", correctTag: "postposition" },
      { word: "मरीज़", correctTag: "noun" },
      { word: "का", correctTag: "postposition" },
      { word: "अच्छी", correctTag: "adverb" },
      { word: "तरह", correctTag: "noun" },
      { word: "इलाज", correctTag: "noun" },
      { word: "किया", correctTag: "verb" },
    ],
  },
  {
    id: 17,
    difficulty: "hard",
    translation: "Children learn new things quickly in school.",
    words: [
      { word: "बच्चे", correctTag: "noun" },
      { word: "विद्यालय", correctTag: "noun" },
      { word: "में", correctTag: "postposition" },
      { word: "जल्दी", correctTag: "adverb" },
      { word: "नई", correctTag: "adjective" },
      { word: "बातें", correctTag: "noun" },
      { word: "सीखते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 18,
    difficulty: "hard",
    translation: "The river flows beautifully through the valley.",
    words: [
      { word: "नदी", correctTag: "noun" },
      { word: "घाटी", correctTag: "noun" },
      { word: "से", correctTag: "postposition" },
      { word: "होकर", correctTag: "verb" },
      { word: "सुंदर", correctTag: "adverb" },
      { word: "रूप", correctTag: "noun" },
      { word: "में", correctTag: "postposition" },
      { word: "बहती", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 19,
    difficulty: "easy",
    translation: "The sun is bright.",
    words: [
      { word: "सूरज", correctTag: "noun" },
      { word: "चमकीला", correctTag: "adjective" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 20,
    difficulty: "easy",
    translation: "The cow is white.",
    words: [
      { word: "गाय", correctTag: "noun" },
      { word: "सफ़ेद", correctTag: "adjective" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 21,
    difficulty: "easy",
    translation: "We drink water.",
    words: [
      { word: "हम", correctTag: "pronoun" },
      { word: "पानी", correctTag: "noun" },
      { word: "पीते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 22,
    difficulty: "medium",
    translation: "The teacher writes on the board.",
    words: [
      { word: "शिक्षक", correctTag: "noun" },
      { word: "बोर्ड", correctTag: "noun" },
      { word: "पर", correctTag: "postposition" },
      { word: "लिखते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 23,
    difficulty: "medium",
    translation: "I write good Hindi.",
    words: [
      { word: "मैं", correctTag: "pronoun" },
      { word: "अच्छी", correctTag: "adjective" },
      { word: "हिंदी", correctTag: "noun" },
      { word: "लिखता", correctTag: "verb" },
      { word: "हूँ", correctTag: "verb" },
    ],
  },
  {
    id: 24,
    difficulty: "medium",
    translation: "The flowers bloom in spring.",
    words: [
      { word: "वसंत", correctTag: "noun" },
      { word: "में", correctTag: "postposition" },
      { word: "फूल", correctTag: "noun" },
      { word: "खिलते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 25,
    difficulty: "medium",
    translation: "She sings very well.",
    words: [
      { word: "वह", correctTag: "pronoun" },
      { word: "बहुत", correctTag: "adverb" },
      { word: "अच्छा", correctTag: "adverb" },
      { word: "गाती", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 26,
    difficulty: "hard",
    translation: "The honest person is respected everywhere.",
    words: [
      { word: "ईमानदार", correctTag: "adjective" },
      { word: "व्यक्ति", correctTag: "noun" },
      { word: "हर", correctTag: "adjective" },
      { word: "जगह", correctTag: "noun" },
      { word: "सम्मानित", correctTag: "adjective" },
      { word: "होता", correctTag: "verb" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 27,
    difficulty: "hard",
    translation: "My grandfather tells interesting stories.",
    words: [
      { word: "मेरे", correctTag: "adjective" },
      { word: "दादाजी", correctTag: "noun" },
      { word: "रोचक", correctTag: "adjective" },
      { word: "कहानियाँ", correctTag: "noun" },
      { word: "सुनाते", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 28,
    difficulty: "hard",
    translation: "The girls are dancing joyfully in the celebration.",
    words: [
      { word: "लड़कियाँ", correctTag: "noun" },
      { word: "उत्सव", correctTag: "noun" },
      { word: "में", correctTag: "postposition" },
      { word: "खुशी", correctTag: "noun" },
      { word: "से", correctTag: "postposition" },
      { word: "नाचती", correctTag: "verb" },
      { word: "हैं", correctTag: "verb" },
    ],
  },
  {
    id: 29,
    difficulty: "easy",
    translation: "This book is interesting.",
    words: [
      { word: "यह", correctTag: "pronoun" },
      { word: "किताब", correctTag: "noun" },
      { word: "रोचक", correctTag: "adjective" },
      { word: "है", correctTag: "verb" },
    ],
  },
  {
    id: 30,
    difficulty: "hard",
    translation: "The hardworking student got first rank.",
    words: [
      { word: "मेहनती", correctTag: "adjective" },
      { word: "छात्र", correctTag: "noun" },
      { word: "ने", correctTag: "postposition" },
      { word: "प्रथम", correctTag: "adjective" },
      { word: "स्थान", correctTag: "noun" },
      { word: "पाया", correctTag: "verb" },
    ],
  },
];

// ─── Tag config ───────────────────────────────────────────────────────────────

interface TagConfig {
  label: string;
  hindi: string;
  bg: string;
  text: string;
  border: string;
  dot: string;
}

const TAG_CONFIG: Record<Exclude<Tag, "other">, TagConfig> = {
  noun: {
    label: "Noun",
    hindi: "संज्ञा",
    bg: "bg-blue-100 dark:bg-blue-900/40",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-300 dark:border-blue-600",
    dot: "bg-blue-500",
  },
  verb: {
    label: "Verb",
    hindi: "क्रिया",
    bg: "bg-green-100 dark:bg-green-900/40",
    text: "text-green-700 dark:text-green-300",
    border: "border-green-300 dark:border-green-600",
    dot: "bg-green-500",
  },
  adjective: {
    label: "Adj",
    hindi: "विशेषण",
    bg: "bg-purple-100 dark:bg-purple-900/40",
    text: "text-purple-700 dark:text-purple-300",
    border: "border-purple-300 dark:border-purple-600",
    dot: "bg-purple-500",
  },
  pronoun: {
    label: "Pronoun",
    hindi: "सर्वनाम",
    bg: "bg-orange-100 dark:bg-orange-900/40",
    text: "text-orange-700 dark:text-orange-300",
    border: "border-orange-300 dark:border-orange-600",
    dot: "bg-orange-500",
  },
  adverb: {
    label: "Adverb",
    hindi: "क्रियाविशेषण",
    bg: "bg-amber-100 dark:bg-amber-900/40",
    text: "text-amber-700 dark:text-amber-300",
    border: "border-amber-300 dark:border-amber-600",
    dot: "bg-amber-500",
  },
  postposition: {
    label: "Postpos.",
    hindi: "परसर्ग",
    bg: "bg-rose-100 dark:bg-rose-900/40",
    text: "text-rose-700 dark:text-rose-300",
    border: "border-rose-300 dark:border-rose-600",
    dot: "bg-rose-500",
  },
};

const ALL_TAGS = Object.keys(TAG_CONFIG) as Array<Exclude<Tag, "other">>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getRandomSentence(
  difficulty: "easy" | "medium" | "hard",
  excludeId?: number,
): Sentence {
  const pool = SENTENCES.filter(
    (s) => s.difficulty === difficulty && s.id !== excludeId,
  );
  if (pool.length === 0)
    return SENTENCES.find((s) => s.difficulty === difficulty)!;
  return pool[Math.floor(Math.random() * pool.length)];
}

function isScorable(token: WordToken) {
  return token.correctTag !== "other";
}

// ─── Components ──────────────────────────────────────────────────────────────

interface TagPickerProps {
  onSelect: (tag: Exclude<Tag, "other">) => void;
  selected: Exclude<Tag, "other"> | null;
}

function TagPicker({ onSelect, selected }: TagPickerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: -4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -4 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50
        bg-card border border-border rounded-xl shadow-card p-1.5
        flex flex-wrap gap-1 w-52"
    >
      {ALL_TAGS.map((tag) => {
        const cfg = TAG_CONFIG[tag];
        const isSelected = selected === tag;
        return (
          <button
            key={tag}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(tag);
            }}
            className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-xs font-medium
              border transition-all duration-150 cursor-pointer
              ${cfg.bg} ${cfg.text} ${cfg.border}
              ${isSelected ? "ring-2 ring-offset-1 ring-current scale-105" : "hover:brightness-95 active:scale-95"}
            `}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${cfg.dot}`}
            />
            <span className="devanagari">{cfg.hindi}</span>
            <span className="opacity-70">({cfg.label})</span>
          </button>
        );
      })}
    </motion.div>
  );
}

interface WordChipProps {
  token: WordToken;
  index: number;
  userTag: Exclude<Tag, "other"> | null;
  isSubmitted: boolean;
  isActive: boolean;
  onActivate: () => void;
  onTag: (tag: Exclude<Tag, "other">) => void;
  onDeactivate: () => void;
}

function WordChip({
  token,
  userTag,
  isSubmitted,
  isActive,
  onActivate,
  onTag,
  onDeactivate,
}: WordChipProps) {
  const cfg = userTag ? TAG_CONFIG[userTag] : null;
  const isCorrect = isSubmitted && userTag === token.correctTag;
  const isWrong = isSubmitted && userTag !== token.correctTag;
  const correctCfg = TAG_CONFIG[token.correctTag as Exclude<Tag, "other">];

  return (
    <div className="relative flex flex-col items-center gap-0.5">
      <motion.button
        type="button"
        whileHover={!isSubmitted ? { scale: 1.05 } : {}}
        whileTap={!isSubmitted ? { scale: 0.96 } : {}}
        onClick={() => {
          if (isSubmitted) return;
          isActive ? onDeactivate() : onActivate();
        }}
        className={`
          relative devanagari text-lg font-semibold px-3 py-1.5 rounded-xl border-2 transition-all duration-200
          ${
            isSubmitted
              ? isCorrect
                ? "bg-green-100 dark:bg-green-900/50 border-green-500 text-green-700 dark:text-green-300"
                : isWrong
                  ? "bg-red-100 dark:bg-red-900/50 border-red-500 text-red-700 dark:text-red-300"
                  : "bg-muted border-border text-muted-foreground"
              : isActive
                ? "bg-primary/10 border-primary text-primary shadow-md"
                : cfg
                  ? `${cfg.bg} ${cfg.border} ${cfg.text}`
                  : "bg-muted/60 border-border/60 text-foreground hover:border-primary/50 hover:bg-primary/5 cursor-pointer"
          }
        `}
      >
        {token.word}
      </motion.button>

      {/* User's selected tag label */}
      {cfg && !isSubmitted && (
        <span
          className={`text-[9px] font-medium px-1.5 py-0.5 rounded-md ${cfg.bg} ${cfg.text} devanagari`}
        >
          {cfg.hindi}
        </span>
      )}

      {/* Submitted: show result labels */}
      {isSubmitted && (
        <div className="flex flex-col items-center gap-0.5">
          {isCorrect && (
            <span className="text-[9px] font-medium text-green-600 dark:text-green-400 devanagari">
              ✓ {correctCfg?.hindi}
            </span>
          )}
          {isWrong && correctCfg && (
            <span className="text-[9px] font-medium text-red-600 dark:text-red-400 devanagari">
              → {correctCfg.hindi}
            </span>
          )}
        </div>
      )}

      {/* Tag picker popover */}
      <AnimatePresence>
        {isActive && !isSubmitted && (
          <TagPicker selected={userTag} onSelect={onTag} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

interface GrammarIdentifyPageProps {
  onBack: () => void;
}

export function GrammarIdentifyPage({ onBack }: GrammarIdentifyPageProps) {
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy",
  );
  const [sentence, setSentence] = useState<Sentence>(() =>
    getRandomSentence("easy"),
  );
  const [userTags, setUserTags] = useState<
    Record<number, Exclude<Tag, "other"> | null>
  >({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sessionScore, setSessionScore] = useState({ correct: 0, total: 0 });

  const scorableWords = sentence.words.filter(isScorable);
  const allTagged = scorableWords.every((_, idx) => {
    const absIdx = sentence.words.indexOf(scorableWords[idx]);
    return userTags[absIdx] !== undefined && userTags[absIdx] !== null;
  });

  const handleDifficulty = useCallback((d: "easy" | "medium" | "hard") => {
    setDifficulty(d);
    const newSentence = getRandomSentence(d);
    setSentence(newSentence);
    setUserTags({});
    setActiveIndex(null);
    setIsSubmitted(false);
  }, []);

  const handleTag = useCallback(
    (wordIndex: number, tag: Exclude<Tag, "other">) => {
      setUserTags((prev) => ({ ...prev, [wordIndex]: tag }));
      setActiveIndex(null);
    },
    [],
  );

  const handleSubmit = useCallback(() => {
    if (!allTagged) return;
    let correct = 0;
    sentence.words.forEach((token, idx) => {
      if (!isScorable(token)) return;
      if (userTags[idx] === token.correctTag) correct++;
    });
    setSessionScore((prev) => ({
      correct: prev.correct + correct,
      total: prev.total + scorableWords.length,
    }));
    setIsSubmitted(true);
    setActiveIndex(null);
  }, [allTagged, sentence.words, userTags, scorableWords.length]);

  const handleNext = useCallback(() => {
    const newSentence = getRandomSentence(difficulty, sentence.id);
    setSentence(newSentence);
    setUserTags({});
    setActiveIndex(null);
    setIsSubmitted(false);
  }, [difficulty, sentence.id]);

  // Calculate current round score
  const currentScore = isSubmitted
    ? sentence.words.filter(
        (t, idx) => isScorable(t) && userTags[idx] === t.correctTag,
      ).length
    : null;

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: dismissal overlay for tag picker
    <div
      className="min-h-screen bg-background pb-40"
      onClick={() => setActiveIndex(null)}
    >
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
              Identify Words
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              शब्द पहचानो — Tag each word with its grammar role
            </p>
          </div>
          {sessionScore.total > 0 && (
            <div className="flex items-center gap-1.5 bg-primary/10 rounded-xl px-3 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary">
                {sessionScore.correct}/{sessionScore.total}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-5">
        {/* Difficulty selector */}
        <div className="flex gap-2">
          {(["easy", "medium", "hard"] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleDifficulty(d);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 capitalize
                ${
                  difficulty === d
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
            >
              {d === "easy" ? "आसान" : d === "medium" ? "मध्यम" : "कठिन"}
              <span className="block text-[9px] opacity-70 mt-0.5 capitalize">
                {d}
              </span>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="bg-card rounded-2xl border border-border p-3">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
            रंग चाबी — Color Key
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_TAGS.map((tag) => {
              const cfg = TAG_CONFIG[tag];
              return (
                <span
                  key={tag}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-medium border ${cfg.bg} ${cfg.text} ${cfg.border}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                  <span className="devanagari">{cfg.hindi}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Sentence card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={sentence.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="bg-card rounded-2xl border border-border p-5 shadow-card space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Instructions */}
            <p className="text-xs text-muted-foreground">
              Tap a word, then select its grammar category.
            </p>

            {/* Word chips */}
            <div className="flex flex-wrap gap-3 items-start min-h-[80px]">
              {sentence.words.map((token, idx) => {
                const stableKey = `${sentence.id}-${idx}-${token.word}`;
                if (!isScorable(token)) {
                  return (
                    <span
                      key={stableKey}
                      className="devanagari text-muted-foreground text-xl self-center"
                    >
                      {token.word}
                    </span>
                  );
                }
                return (
                  <WordChip
                    key={stableKey}
                    index={idx}
                    token={token}
                    userTag={userTags[idx] ?? null}
                    isSubmitted={isSubmitted}
                    isActive={activeIndex === idx}
                    onActivate={() => setActiveIndex(idx)}
                    onDeactivate={() => setActiveIndex(null)}
                    onTag={(tag) => handleTag(idx, tag)}
                  />
                );
              })}
            </div>

            {/* Translation */}
            <p className="text-sm text-muted-foreground/70 italic border-t border-border pt-3">
              "{sentence.translation}"
            </p>

            {/* Score result */}
            <AnimatePresence>
              {isSubmitted && currentScore !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-xl p-3 text-center border ${
                    currentScore === scorableWords.length
                      ? "bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-600"
                      : "bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-600"
                  }`}
                >
                  <span
                    className={`text-xl font-bold devanagari ${
                      currentScore === scorableWords.length
                        ? "text-green-700 dark:text-green-300"
                        : "text-amber-700 dark:text-amber-300"
                    }`}
                  >
                    {currentScore} / {scorableWords.length} सही
                  </span>
                  <p className="text-xs mt-0.5 text-muted-foreground">
                    {currentScore === scorableWords.length
                      ? "🎉 Perfect! सब सही!"
                      : currentScore >= scorableWords.length / 2
                        ? "👍 Good try! फिर से कोशिश करो।"
                        : "💪 Keep practicing! अभ्यास जारी रखो।"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex gap-3">
              {!isSubmitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!allTagged}
                  className="flex-1"
                >
                  जाँचें (Check)
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleNext}
                    className="flex-1 gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    अगला (Next)
                  </Button>
                </>
              )}
            </div>

            {/* Progress hint */}
            {!isSubmitted && (
              <p className="text-[10px] text-muted-foreground text-center">
                {
                  scorableWords.filter((_, i) => {
                    const absIdx = sentence.words.indexOf(scorableWords[i]);
                    return userTags[absIdx] != null;
                  }).length
                }{" "}
                / {scorableWords.length} words tagged
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Tips card */}
        <div className="bg-secondary/30 rounded-2xl border border-border p-4 space-y-2">
          <p className="text-xs font-semibold text-foreground">
            💡 Grammar Tips — याद रखें
          </p>
          <ul className="text-xs text-muted-foreground space-y-1 list-none">
            <li>
              <span className="font-medium text-blue-600 dark:text-blue-400">
                संज्ञा
              </span>{" "}
              — names of people, places, things (राम, घर, पानी)
            </li>
            <li>
              <span className="font-medium text-green-600 dark:text-green-400">
                क्रिया
              </span>{" "}
              — action or state words (खाना, है, जाता)
            </li>
            <li>
              <span className="font-medium text-purple-600 dark:text-purple-400">
                विशेषण
              </span>{" "}
              — describing words (सुंदर, बड़ा, अच्छा)
            </li>
            <li>
              <span className="font-medium text-orange-600 dark:text-orange-400">
                सर्वनाम
              </span>{" "}
              — replace nouns (मैं, वह, हम, वे)
            </li>
            <li>
              <span className="font-medium text-amber-600 dark:text-amber-400">
                क्रियाविशेषण
              </span>{" "}
              — modify verbs (धीरे, जल्दी, हमेशा)
            </li>
            <li>
              <span className="font-medium text-rose-600 dark:text-rose-400">
                परसर्ग
              </span>{" "}
              — postpositions after nouns (में, से, को, का)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
