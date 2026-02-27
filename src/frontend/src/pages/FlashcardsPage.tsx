import { useState, useCallback } from "react";
import { RefreshCw, ThumbsUp, ThumbsDown, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ALL_CHARACTERS, type HindiCharacter } from "../constants/hindi";
import { useRecordQuizScore } from "../hooks/useQueries";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

const QUIZ_SIZE = 10;

type FlashMode = "char-to-roman" | "roman-to-char";

interface QuizCard {
  character: HindiCharacter;
  mode: FlashMode;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(): QuizCard[] {
  const shuffled = shuffle(ALL_CHARACTERS).slice(0, QUIZ_SIZE);
  return shuffled.map((character) => ({
    character,
    mode: Math.random() > 0.5 ? "char-to-roman" : "roman-to-char",
  }));
}

type QuizState = "playing" | "complete";

export function FlashcardsPage() {
  const [deck, setDeck] = useState<QuizCard[]>(() => buildDeck());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [quizState, setQuizState] = useState<QuizState>("playing");
  const recordScore = useRecordQuizScore();

  const currentCard = deck[currentIndex];
  const progressPercent = Math.round((currentIndex / QUIZ_SIZE) * 100);

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const newScore = correct ? score + 1 : score;

      if (currentIndex + 1 >= QUIZ_SIZE) {
        // End of quiz
        setScore(newScore);
        setQuizState("complete");
        recordScore.mutate(
          { correct: BigInt(newScore), total: BigInt(QUIZ_SIZE) },
          {
            onSuccess: () => toast.success("Score saved!"),
            onError: () => toast.error("Could not save score."),
          }
        );
      } else {
        setScore(newScore);
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      }
    },
    [score, currentIndex, recordScore]
  );

  const handleRestart = useCallback(() => {
    setDeck(buildDeck());
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setQuizState("playing");
  }, []);

  if (quizState === "complete") {
    const pct = Math.round((score / QUIZ_SIZE) * 100);
    const grade = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good work!" : "Keep practicing!";
    const gradeColor = pct >= 80 ? "text-success" : pct >= 60 ? "text-accent" : "text-primary";

    return (
      <div className="min-h-screen pb-24 flex flex-col items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card text-center animate-scale-in">
            <div className="w-20 h-20 bg-accent/15 rounded-full flex items-center justify-center mx-auto mb-5">
              <Trophy className="w-10 h-10 text-accent" />
            </div>
            <h2 className="font-display text-2xl text-foreground mb-1">{grade}</h2>
            <p className="text-sm text-muted-foreground mb-6">Quiz Complete</p>

            <div className={`text-6xl font-bold font-display ${gradeColor} mb-2`}>
              {score}/{QUIZ_SIZE}
            </div>
            <p className="text-sm text-muted-foreground mb-6">{pct}% correct</p>

            <Progress value={pct} className="h-3 mb-8" />

            <Button
              onClick={handleRestart}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl h-12"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              New Quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentCard) return null;

  const frontContent =
    currentCard.mode === "char-to-roman"
      ? currentCard.character.char
      : currentCard.character.transliteration;

  const backContent =
    currentCard.mode === "char-to-roman"
      ? currentCard.character.transliteration
      : currentCard.character.char;

  const frontIsDevanagari = currentCard.mode === "char-to-roman";
  const backIsDevanagari = currentCard.mode === "roman-to-char";

  return (
    <div className="min-h-screen pb-24 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl text-foreground">Flashcards</h1>
          <p className="text-sm text-muted-foreground">
            Card {currentIndex + 1} of {QUIZ_SIZE}
          </p>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="w-9 h-9 rounded-lg bg-muted text-muted-foreground flex items-center justify-center
            hover:bg-muted/70 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-6">
        <Progress value={progressPercent} className="h-2" />
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-success font-medium">✓ {score} correct</span>
          <span className="text-xs text-muted-foreground">{QUIZ_SIZE - currentIndex} left</span>
        </div>
      </div>

      {/* Flashcard */}
      <div className="px-5 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-sm">
          {/* Card */}
          <button
            type="button"
            className="flashcard-container w-full cursor-pointer mb-4 bg-transparent p-0 border-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-3xl"
            style={{ height: "280px" }}
            onClick={handleFlip}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleFlip(); }}
            aria-label="Flip flashcard"
          >
            <div className={`flashcard-inner ${isFlipped ? "flipped" : ""}`}>
              {/* Front */}
              <div className="flashcard-front bg-card rounded-3xl border-2 border-border shadow-card
                flex flex-col items-center justify-center p-8 gap-4">
                <div className="w-10 h-1.5 bg-muted rounded-full mb-2 opacity-40" />
                <span
                  className={`
                    ${frontIsDevanagari
                      ? "font-devanagari text-7xl text-primary font-bold"
                      : "text-3xl font-semibold text-foreground font-sans tracking-wide"}
                    select-none leading-none
                  `}
                >
                  {frontContent}
                </span>
                <span className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                  {frontIsDevanagari ? "Hindi character" : "Transliteration"}
                </span>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                  <span className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3" />
                    Tap to reveal
                  </span>
                </div>
              </div>

              {/* Back */}
              <div className="flashcard-back bg-gradient-to-br from-primary/10 to-accent/10
                rounded-3xl border-2 border-accent/30 shadow-card
                flex flex-col items-center justify-center p-8 gap-4">
                <span className="text-xs text-accent/80 tracking-widest uppercase mb-2">Answer</span>
                <span
                  className={`
                    ${backIsDevanagari
                      ? "font-devanagari text-7xl text-primary font-bold"
                      : "text-3xl font-semibold text-foreground font-sans tracking-wide"}
                    select-none leading-none
                  `}
                >
                  {backContent}
                </span>
                <span className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">
                  {backIsDevanagari ? "Hindi character" : "Transliteration"}
                </span>
              </div>
            </div>
          </button>

          {/* Answer buttons — only visible when flipped */}
          <div
            className={`transition-all duration-300 ${isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
          >
            <p className="text-center text-xs text-muted-foreground mb-4">Did you get it right?</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleAnswer(false)}
                className="h-14 rounded-2xl border-2 border-destructive/30 bg-destructive/8
                  text-destructive font-semibold text-sm flex items-center justify-center gap-2
                  hover:bg-destructive/15 hover:border-destructive/50 active:scale-95 transition-all duration-150"
              >
                <ThumbsDown className="w-4 h-4" />
                Missed it
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(true)}
                className="h-14 rounded-2xl border-2 border-success/30 bg-success/8
                  text-success font-semibold text-sm flex items-center justify-center gap-2
                  hover:bg-success/15 hover:border-success/50 active:scale-95 transition-all duration-150"
              >
                <ThumbsUp className="w-4 h-4" />
                Got it!
              </button>
            </div>
          </div>

          {!isFlipped && (
            <p className="text-center text-xs text-muted-foreground mt-4">
              Tap the card to flip and reveal the answer
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
