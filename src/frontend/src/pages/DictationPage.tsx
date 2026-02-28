import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Volume2, RotateCcw, ChevronRight, Trophy } from "lucide-react";
import { DICTATION_ITEMS, type DictationItem, type DictationDifficulty, type DictationMode } from "../constants/hindi";
import { usePronounce } from "../hooks/usePronounce";
import { Progress } from "@/components/ui/progress";

type Diff = { char: string; status: "correct" | "wrong" | "missing" | "extra" }[];

function computeDiff(expected: string, actual: string): Diff {
  // Simple character-level diff
  const result: Diff = [];
  const maxLen = Math.max(expected.length, actual.length);
  for (let i = 0; i < maxLen; i++) {
    const e = expected[i];
    const a = actual[i];
    if (e === undefined) {
      result.push({ char: a, status: "extra" });
    } else if (a === undefined) {
      result.push({ char: e, status: "missing" });
    } else if (e === a) {
      result.push({ char: e, status: "correct" });
    } else {
      result.push({ char: a, status: "wrong" });
    }
  }
  return result;
}

function isCorrect(expected: string, actual: string) {
  return expected.trim() === actual.trim();
}

const SPEED_OPTIONS = [
  { label: "0.5×", value: 0.5 },
  { label: "0.75×", value: 0.75 },
  { label: "1×", value: 1.0 },
  { label: "1.25×", value: 1.25 },
  { label: "1.5×", value: 1.5 },
];

const DIFFICULTY_LABELS: Record<DictationDifficulty | "all", string> = {
  all: "All",
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const MODE_LABELS: Record<DictationMode, string> = {
  word: "Words",
  sentence: "Sentences",
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function DictationPage() {
  const { speak } = usePronounce();
  const [mode, setMode] = useState<DictationMode>("word");
  const [difficulty, setDifficulty] = useState<DictationDifficulty | "all">("all");
  const [speed, setSpeed] = useState(0.75);
  const [questions, setQuestions] = useState<DictationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [diff, setDiff] = useState<Diff>([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const filteredItems = useMemo(() => {
    return DICTATION_ITEMS.filter((item) => {
      const modeMatch = item.mode === mode;
      const diffMatch = difficulty === "all" || item.difficulty === difficulty;
      return modeMatch && diffMatch;
    });
  }, [mode, difficulty]);

  const playWord = useCallback((text: string, rate: number) => {
    setIsPlaying(true);
    speak(text, rate);
    setTimeout(() => setIsPlaying(false), Math.max(1500, text.length * 200));
  }, [speak]);

  const startSession = useCallback((items: DictationItem[]) => {
    const shuffled = shuffle(items);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setUserInput("");
    setChecked(false);
    setDiff([]);
    setScore(0);
    setFinished(false);
    if (shuffled.length > 0) {
      setTimeout(() => playWord(shuffled[0].text, speed), 400);
    }
  }, [playWord, speed]);

  useEffect(() => {
    startSession(filteredItems);
  }, [filteredItems]); // startSession is stable within the session lifecycle

  const currentItem = questions[currentIndex] ?? null;
  const progress = questions.length > 0 ? ((currentIndex + (checked ? 1 : 0)) / questions.length) * 100 : 0;

  const handleSpeak = () => {
    if (currentItem) playWord(currentItem.text, speed);
  };

  const handleCheck = () => {
    if (!currentItem || checked) return;
    const d = computeDiff(currentItem.text, userInput);
    setDiff(d);
    setChecked(true);
    if (isCorrect(currentItem.text, userInput)) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setUserInput("");
      setChecked(false);
      setDiff([]);
      setTimeout(() => {
        playWord(questions[nextIdx].text, speed);
        inputRef.current?.focus();
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!checked) handleCheck();
      else handleNext();
    }
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
              {pct >= 80 ? "Excellent! Keep it up." : pct >= 50 ? "Good effort! Practice more." : "Keep going — practice makes perfect!"}
            </p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
          </div>
          <button
            type="button"
            onClick={() => startSession(filteredItems)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const correct = checked && currentItem ? isCorrect(currentItem.text, userInput) : null;

  return (
    <div className="min-h-screen pb-28 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-8 pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-foreground mb-0.5">Dictation</h1>
            <p className="text-xs text-muted-foreground">श्रुतलेख</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-foreground">
              {score}<span className="text-muted-foreground font-normal text-sm"> / {questions.length}</span>
            </p>
            <p className="text-[10px] text-muted-foreground">correct</p>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="px-5 mb-3">
        <div className="flex gap-1.5 p-1 bg-muted rounded-xl">
          {(Object.keys(MODE_LABELS) as DictationMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all
                ${mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty filter */}
      <div className="px-5 mb-3">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {(Object.keys(DIFFICULTY_LABELS) as (DictationDifficulty | "all")[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all
                ${difficulty === d
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
                }`}
            >
              {DIFFICULTY_LABELS[d]}
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      {questions.length > 0 && (
        <div className="px-5 mb-4">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1.5">
            <span>Question {Math.min(currentIndex + 1, questions.length)} of {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>
      )}

      {currentItem === null ? (
        <div className="flex-1 flex items-center justify-center px-5">
          <p className="text-muted-foreground text-sm text-center">No items in this category.</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col px-5 gap-4">
          {/* Speaker card */}
          <div className="bg-card border border-border rounded-2xl p-5 flex flex-col items-center gap-3 shadow-xs">
            <button
              type="button"
              onClick={handleSpeak}
              className={`w-20 h-20 rounded-full flex items-center justify-center
                transition-all duration-200 active:scale-95
                ${isPlaying
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                  : "bg-primary/10 border-2 border-primary/20 hover:bg-primary/20"
                }`}
              aria-label="Hear word"
            >
              <Volume2 className={`w-9 h-9 ${isPlaying ? "text-primary-foreground" : "text-primary"} transition-transform ${isPlaying ? "scale-110" : ""}`} />
            </button>
            <p className="text-xs text-muted-foreground">Tap to hear {mode === "sentence" ? "sentence" : "word"}</p>

            {/* Difficulty badge */}
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide
              ${currentItem.difficulty === "easy" ? "bg-success/10 text-success" :
                currentItem.difficulty === "medium" ? "bg-accent/10 text-accent" :
                "bg-destructive/10 text-destructive"}`}>
              {currentItem.difficulty}
            </span>

            {/* Meaning hint (shown after checking) */}
            {checked && (
              <p className="text-sm text-muted-foreground italic text-center animate-fade-in-up">
                {currentItem.meaning} · {currentItem.transliteration}
              </p>
            )}
          </div>

          {/* Speed control */}
          <div className="bg-card border border-border rounded-xl px-4 py-3">
            <p className="text-[10px] text-muted-foreground mb-2 font-medium uppercase tracking-wide">Playback Speed</p>
            <div className="flex gap-1.5 justify-between">
              {SPEED_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setSpeed(opt.value)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all
                    ${speed === opt.value ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="flex flex-col gap-2">
            <label htmlFor="dictation-input" className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Type what you hear
            </label>
            <textarea
              id="dictation-input"
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={checked}
              rows={mode === "sentence" ? 3 : 2}
              placeholder="यहाँ लिखें..."
              className={`w-full rounded-xl border-2 px-4 py-3 text-xl font-devanagari leading-relaxed resize-none
                transition-all duration-200 bg-card outline-none
                placeholder:text-muted-foreground/40
                ${checked ? "cursor-not-allowed opacity-80" : "focus:border-primary/60"}
                ${correct === true ? "border-success/60 bg-success/5" :
                  correct === false ? "border-destructive/40 bg-destructive/5" :
                  "border-border"}`}
            />
          </div>

          {/* Diff view */}
          {checked && diff.length > 0 && (
            <div className="animate-scale-in bg-card border border-border rounded-xl px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">Review</p>
              <div className="flex flex-wrap gap-0.5 font-devanagari text-xl leading-relaxed">
                {diff.map((d, i) => (
                  <span
                    key={`${d.char}-${d.status}-${i}`}
                    className={
                      d.status === "correct" ? "text-success" :
                      d.status === "wrong" ? "text-destructive font-bold underline decoration-destructive/60" :
                      d.status === "missing" ? "text-amber-600 bg-amber-50 rounded px-0.5" :
                      "text-muted-foreground line-through"
                    }
                  >
                    {d.char}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 mt-2 text-[10px]">
                <span className="text-success flex items-center gap-1">● Correct</span>
                <span className="text-destructive flex items-center gap-1">● Wrong</span>
                <span className="text-amber-600 flex items-center gap-1">● Missing</span>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {!checked ? (
            <button
              type="button"
              onClick={handleCheck}
              disabled={userInput.trim().length === 0}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm
                hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <div className="flex flex-col gap-2 animate-scale-in">
              <div className={`rounded-xl px-4 py-2.5 text-center text-sm font-semibold
                ${correct ? "bg-success/10 text-success border border-success/20" : "bg-destructive/10 text-destructive border border-destructive/20"}`}>
                {correct ? "✓ Correct!" : `✗ Expected: `}
                {!correct && <span className="font-devanagari font-bold">{currentItem.text}</span>}
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-95 transition-all"
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
