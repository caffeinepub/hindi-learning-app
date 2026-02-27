import { useState, useEffect, useCallback, useMemo } from "react";
import { Volume2, RotateCcw, ChevronRight, Trophy } from "lucide-react";
import { DICTATION_WORDS, type DictationWord } from "../constants/hindi";
import { usePronounce } from "../hooks/usePronounce";
import { Progress } from "@/components/ui/progress";

type Category = "all" | "simple" | "matra" | "half" | "conjunct";

const CATEGORY_LABELS: Record<Category, string> = {
  all: "All",
  simple: "Simple",
  matra: "मात्रा",
  half: "अर्ध",
  conjunct: "संयुक्त",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildOptions(word: DictationWord): string[] {
  return shuffle([word.word, ...word.distractors]);
}

export function DictationPage() {
  const { speak } = usePronounce();
  const [category, setCategory] = useState<Category>("all");
  const [questions, setQuestions] = useState<DictationWord[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const filteredWords = useMemo(() => {
    return category === "all"
      ? DICTATION_WORDS
      : DICTATION_WORDS.filter((w) => w.category === category);
  }, [category]);

  const startSession = useCallback((words: DictationWord[]) => {
    const shuffled = shuffle(words);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    if (shuffled.length > 0) {
      setOptions(buildOptions(shuffled[0]));
      // Auto-play after a short delay
      setTimeout(() => speak(shuffled[0].word), 400);
    }
  }, [speak]);

  // Initialize / re-initialize when category changes
  useEffect(() => {
    startSession(filteredWords);
  }, [filteredWords, startSession]);

  const currentWord = questions[currentIndex] ?? null;
  const isAnswered = selected !== null;
  const progress = questions.length > 0 ? ((currentIndex + (isAnswered ? 1 : 0)) / questions.length) * 100 : 0;

  const handleSelect = (option: string) => {
    if (isAnswered || !currentWord) return;
    setSelected(option);
    if (option === currentWord.word) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setSelected(null);
      setOptions(buildOptions(questions[nextIdx]));
      setTimeout(() => speak(questions[nextIdx].word), 300);
    }
  };

  const handleSpeak = () => {
    if (currentWord) speak(currentWord.word);
  };

  // Summary screen
  if (finished) {
    const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;
    return (
      <div className="min-h-screen pb-24 flex flex-col">
        <div className="px-5 pt-8 pb-4">
          <h1 className="font-display text-2xl text-foreground mb-1">Dictation</h1>
          <p className="text-sm text-muted-foreground">श्रुतलेख</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-5 gap-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-primary" />
          </div>

          <div className="text-center">
            <p className="text-4xl font-bold text-foreground mb-1">
              {score} <span className="text-muted-foreground text-2xl">/ {questions.length}</span>
            </p>
            <p className="text-lg font-semibold text-primary">{pct}% correct</p>
            <p className="text-sm text-muted-foreground mt-2">
              {pct >= 80 ? "Excellent work! 🎉" : pct >= 50 ? "Good effort! Keep practicing." : "Keep going — practice makes perfect!"}
            </p>
          </div>

          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => startSession(filteredWords)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground
              font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-8 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-0.5">Dictation</h1>
            <p className="text-xs text-muted-foreground">श्रुतलेख</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              {score}
              <span className="text-muted-foreground font-normal text-sm"> / {questions.length}</span>
            </p>
            <p className="text-[10px] text-muted-foreground">correct</p>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="px-5 mb-4">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                ${category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {questions.length > 0 && (
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
            <span>Question {Math.min(currentIndex + 1, questions.length)} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}

      {currentWord === null ? (
        <div className="flex-1 flex items-center justify-center px-5">
          <p className="text-muted-foreground text-sm">No words in this category.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-5 gap-5">
          {/* Pronunciation card */}
          <div className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-3 shadow-xs">
            <button
              type="button"
              onClick={handleSpeak}
              className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20
                flex items-center justify-center hover:bg-primary/20 active:scale-95
                transition-all duration-200 group"
              aria-label="Hear word"
            >
              <Volume2 className="w-9 h-9 text-primary group-hover:scale-110 transition-transform" />
            </button>

            <p className="text-xs text-muted-foreground">Tap to hear again</p>

            <div className="text-center">
              <p className="text-lg font-semibold text-foreground">
                {currentWord.meaning}
              </p>
              <p className="text-sm text-muted-foreground italic mt-0.5">
                ({currentWord.transliteration})
              </p>
            </div>

            {/* Category badge */}
            <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-semibold uppercase tracking-wide">
              {CATEGORY_LABELS[currentWord.category]}
            </span>
          </div>

          {/* Options grid */}
          <div className="grid grid-cols-2 gap-3">
            {options.map((opt) => {
              let variant = "default";
              if (isAnswered) {
                if (opt === currentWord.word) variant = "correct";
                else if (opt === selected) variant = "wrong";
              }
              return (
                <OptionButton
                  key={opt}
                  text={opt}
                  variant={variant as "default" | "correct" | "wrong"}
                  disabled={isAnswered}
                  onClick={() => handleSelect(opt)}
                />
              );
            })}
          </div>

          {/* Feedback + Next */}
          {isAnswered && (
            <div className="flex flex-col gap-3 animate-scale-in">
              <div className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold
                ${selected === currentWord.word
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
                }`}
              >
                {selected === currentWord.word
                  ? "✓ Correct!"
                  : `✗ Wrong — correct was `
                }
                {selected !== currentWord.word && (
                  <span className="font-devanagari font-bold">{currentWord.word}</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl
                  bg-primary text-primary-foreground font-semibold text-sm
                  hover:bg-primary/90 active:scale-95 transition-all"
              >
                {currentIndex + 1 >= questions.length ? "See Results" : "Next"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OptionButton({
  text,
  variant,
  disabled,
  onClick,
}: {
  text: string;
  variant: "default" | "correct" | "wrong";
  disabled: boolean;
  onClick: () => void;
}) {
  const variantClass = {
    default: "bg-card border-border text-foreground hover:bg-primary/8 hover:border-primary/30 hover:text-primary",
    correct: "bg-success/10 border-success/40 text-success",
    wrong: "bg-destructive/10 border-destructive/40 text-destructive",
  }[variant];

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-2xl border-2 px-3 py-4 font-devanagari text-xl font-bold
        flex items-center justify-center
        transition-all duration-200 active:scale-95
        disabled:cursor-not-allowed
        ${variantClass}
        ${variant === "default" && !disabled ? "hover:-translate-y-0.5 shadow-xs" : ""}
      `}
    >
      {text}
    </button>
  );
}
