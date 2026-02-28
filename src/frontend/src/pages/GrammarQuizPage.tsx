import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  RotateCcw,
  Trophy,
  Volume2,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import {
  type GrammarQuizQuestion,
  getGrammarTopicById,
} from "../constants/grammar";
import { useSubmitGrammarQuiz } from "../hooks/useGrammarQueries";

interface GrammarQuizPageProps {
  topicId: string;
  onBack: () => void;
  onDone: () => void;
}

type QuizState = "playing" | "answered" | "finished";

export function GrammarQuizPage({
  topicId,
  onBack,
  onDone,
}: GrammarQuizPageProps) {
  const topic = getGrammarTopicById(topicId);
  const submitQuiz = useSubmitGrammarQuiz();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setQuizState] = useState<QuizState>("playing");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [fillAnswer, setFillAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);
  const [showHint, setShowHint] = useState(false);

  const speak = useCallback((text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "hi-IN";
    utt.rate = 0.9;
    window.speechSynthesis.speak(utt);
  }, []);

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-muted-foreground">Topic not found.</p>
        <Button variant="outline" onClick={onBack}>
          Go Back
        </Button>
      </div>
    );
  }

  const quizzes = topic.quizzes;
  if (quizzes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 px-5">
        <p className="text-4xl">📝</p>
        <p className="text-foreground font-semibold">No quiz questions yet</p>
        <p className="text-muted-foreground text-sm text-center">
          Quiz questions for this topic are coming soon!
        </p>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const current: GrammarQuizQuestion = quizzes[currentIndex];
  const progressPercent = Math.round((currentIndex / quizzes.length) * 100);

  function handleOptionSelect(optionIndex: number) {
    if (state !== "playing") return;
    setSelectedOption(optionIndex);
    const isCorrect = current.options[optionIndex].isCorrect;
    const newResults = [...results, isCorrect];
    setResults(newResults);
    if (isCorrect) {
      setScore((s) => s + 1);
      speak(current.answer);
    }
    setQuizState("answered");
  }

  function handleFillSubmit() {
    if (state !== "playing") return;
    const normalized = fillAnswer.trim();
    const correct = current.answer.trim();
    const isCorrect =
      normalized === correct ||
      normalized.toLowerCase() === correct.toLowerCase();
    const newResults = [...results, isCorrect];
    setResults(newResults);
    if (isCorrect) {
      setScore((s) => s + 1);
      toast.success("Correct! 🎉");
    } else {
      toast.error(`Correct answer: ${correct}`);
    }
    speak(correct);
    setQuizState("answered");
  }

  function handleNext() {
    if (currentIndex + 1 >= quizzes.length) {
      submitQuiz.mutate({
        topicName: topic!.name,
        correctAnswers: BigInt(score),
        totalQuestions: BigInt(quizzes.length),
      });
      setQuizState("finished");
    } else {
      setCurrentIndex((i) => i + 1);
      setQuizState("playing");
      setSelectedOption(null);
      setFillAnswer("");
      setShowHint(false);
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setQuizState("playing");
    setSelectedOption(null);
    setFillAnswer("");
    setScore(0);
    setResults([]);
    setShowHint(false);
  }

  // ── Finished screen ──
  if (state === "finished") {
    const percent = Math.round((score / quizzes.length) * 100);
    const grade =
      percent >= 90
        ? "Excellent!"
        : percent >= 75
          ? "Great job!"
          : percent >= 50
            ? "Good effort!"
            : "Keep practicing!";

    return (
      <div className="min-h-screen pb-24 flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 px-5 pt-10 pb-8 text-center">
          <div
            className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full
            flex items-center justify-center shadow-glow"
          >
            <Trophy className="w-9 h-9 text-primary-foreground" />
          </div>
          <h2 className="font-display text-2xl text-foreground mb-1">
            {grade}
          </h2>
          <p className="text-muted-foreground text-sm">
            {topic.name} — {topic.nameEnglish}
          </p>

          <div className="mt-5 grid grid-cols-3 gap-3 mx-auto max-w-xs">
            <div className="bg-card border border-border rounded-xl p-3 text-center shadow-xs">
              <p className="text-2xl font-bold text-primary">{percent}%</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Score</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center shadow-xs">
              <p className="text-2xl font-bold text-success">{score}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                Correct
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center shadow-xs">
              <p className="text-2xl font-bold text-destructive">
                {quizzes.length - score}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Wrong</p>
            </div>
          </div>
        </div>

        {/* Results breakdown */}
        <div className="flex-1 px-5 pt-5">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
            Question Breakdown
          </h3>
          <div className="space-y-2 mb-6">
            {quizzes.map((q, i) => (
              <div
                key={q.question}
                className={`flex items-start gap-2.5 p-2.5 rounded-lg border text-sm ${
                  results[i]
                    ? "bg-success/8 border-success/25"
                    : "bg-destructive/8 border-destructive/25"
                }`}
              >
                {results[i] ? (
                  <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="text-xs text-foreground leading-snug">
                    {q.question}
                  </p>
                  {!results[i] && (
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      Answer:{" "}
                      <span className="font-devanagari font-medium text-foreground">
                        {q.answer}
                      </span>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleRestart}
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retry
            </Button>
            <Button className="flex-1" onClick={onDone}>
              Done
              <ChevronRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Playing / Answered ──
  return (
    <div className="min-h-screen pb-24 flex flex-col">
      {/* Top bar */}
      <div className="px-4 pt-4 pb-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-2">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">
              {topic.name} Quiz — Q{currentIndex + 1}/{quizzes.length}
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            {score} ✓
          </Badge>
        </div>
        <Progress value={progressPercent} className="h-1.5" />
      </div>

      <div className="flex-1 px-4 py-5">
        {/* Question */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4 shadow-xs">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-foreground font-medium leading-relaxed flex-1">
              {current.question}
            </p>
            <button
              type="button"
              onClick={() => speak(current.question)}
              className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center
                hover:bg-primary/20 transition-colors shrink-0"
            >
              <Volume2 className="w-4 h-4 text-primary" />
            </button>
          </div>

          {/* Hint */}
          {current.hint && (
            <div className="mt-3">
              {showHint ? (
                <div className="bg-accent/10 border border-accent/20 rounded-lg p-2.5 text-xs text-muted-foreground">
                  💡 {current.hint}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowHint(true)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  Show hint
                </button>
              )}
            </div>
          )}
        </div>

        {/* MCQ Options */}
        {current.questionType === "mcq" && (
          <div className="space-y-2.5">
            {current.options.map((opt, i) => {
              let optClass = "border-border bg-card hover:bg-muted/40";
              if (state === "answered") {
                if (opt.isCorrect) {
                  optClass = "border-success/50 bg-success/10";
                } else if (selectedOption === i && !opt.isCorrect) {
                  optClass = "border-destructive/50 bg-destructive/10";
                } else {
                  optClass = "border-border/50 bg-muted/30 opacity-60";
                }
              } else if (selectedOption === i) {
                optClass = "border-primary/50 bg-primary/10";
              }

              return (
                <button
                  key={opt.text}
                  type="button"
                  onClick={() => handleOptionSelect(i)}
                  disabled={state === "answered"}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border 
                    transition-all duration-200 ${optClass} disabled:cursor-default`}
                >
                  {/* Letter badge */}
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                      state === "answered" && opt.isCorrect
                        ? "bg-success text-success-foreground"
                        : state === "answered" &&
                            selectedOption === i &&
                            !opt.isCorrect
                          ? "bg-destructive text-destructive-foreground"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {state === "answered" && opt.isCorrect ? (
                      <CheckCircle className="w-3.5 h-3.5" />
                    ) : state === "answered" &&
                      selectedOption === i &&
                      !opt.isCorrect ? (
                      <XCircle className="w-3.5 h-3.5" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </div>

                  <span className="font-devanagari text-sm text-foreground leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Fill-in-the-blank */}
        {current.questionType === "fill" && (
          <div className="space-y-3">
            <div className="bg-muted/40 rounded-xl p-3 border border-border">
              <p className="text-xs text-muted-foreground mb-1.5">
                Expected answer:
              </p>
              <p className="font-devanagari text-sm text-muted-foreground">
                {state === "answered" ? current.answer : "___"}
              </p>
            </div>
            <input
              type="text"
              value={fillAnswer}
              onChange={(e) => setFillAnswer(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && state === "playing" && handleFillSubmit()
              }
              disabled={state === "answered"}
              placeholder="Type your answer in Devanagari..."
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground
                font-devanagari text-base placeholder:text-muted-foreground focus:outline-none
                focus:ring-2 focus:ring-primary/30 disabled:opacity-60"
            />
            {state === "playing" && (
              <Button
                className="w-full"
                onClick={handleFillSubmit}
                disabled={!fillAnswer.trim()}
              >
                Submit Answer
              </Button>
            )}
          </div>
        )}

        {/* Result feedback */}
        {state === "answered" && (
          <div
            className={`mt-4 p-3.5 rounded-xl border flex items-start gap-2.5 animate-scale-in ${
              results[results.length - 1]
                ? "bg-success/10 border-success/30"
                : "bg-destructive/10 border-destructive/30"
            }`}
          >
            {results[results.length - 1] ? (
              <>
                <CheckCircle className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-success">
                    Correct! 🎉
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-devanagari">{current.answer}</span>
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive">
                    Not quite
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Correct:{" "}
                    <span className="font-devanagari font-medium text-foreground">
                      {current.answer}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Next button */}
      {state === "answered" && (
        <div className="px-4 pb-6 pt-2">
          <Button className="w-full" size="lg" onClick={handleNext}>
            {currentIndex + 1 >= quizzes.length ? (
              <>
                <Trophy className="w-4 h-4 mr-2" />
                Finish Quiz
              </>
            ) : (
              <>
                Next Question
                <ChevronRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
