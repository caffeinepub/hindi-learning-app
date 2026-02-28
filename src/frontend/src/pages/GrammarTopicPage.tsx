import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Volume2,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { type GrammarLesson, getGrammarTopicById } from "../constants/grammar";
import {
  useGetGrammarProgress,
  useMarkGrammarLessonCompleted,
} from "../hooks/useGrammarQueries";
// GrammarProgress type is available via the hook return value

interface GrammarTopicPageProps {
  topicId: string;
  onBack: () => void;
  onQuiz: (topicId: string) => void;
}

export function GrammarTopicPage({
  topicId,
  onBack,
  onQuiz,
}: GrammarTopicPageProps) {
  const topic = getGrammarTopicById(topicId);
  const [expandedLesson, setExpandedLesson] = useState<number | null>(0);
  const [speechRate, setSpeechRate] = useState(1.0);
  const { data: progress } = useGetGrammarProgress();
  const markDone = useMarkGrammarLessonCompleted();

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

  // The backend tracks completedLessons as [topicName, count] pairs.
  // We simulate a set of lesson indices from 0..count-1 for UI purposes.
  const rawCount = progress?.completedLessons.get(topic.name) ?? 0;
  const completedSet = new Set<number>(
    Array.from({ length: rawCount }, (_, i) => i),
  );

  const completedCount = completedSet.size;
  const progressPercent =
    topic.lessons.length > 0
      ? Math.round((completedCount / topic.lessons.length) * 100)
      : 0;

  function speak(text: string) {
    if (!window.speechSynthesis) {
      toast.error("Speech not supported in this browser");
      return;
    }
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "hi-IN";
    utt.rate = speechRate;
    window.speechSynthesis.speak(utt);
  }

  function handleMarkDone(lessonIndex: number) {
    if (completedSet.has(lessonIndex)) return;
    markDone.mutate(
      { topicName: topic!.name, lessonIndex: BigInt(lessonIndex) },
      {
        onSuccess: () => {
          toast.success("Lesson marked as completed! ✓");
        },
      },
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${topic.color} border-b border-border`}
      >
        <div className="px-4 pt-4 pb-5">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Topics
          </button>

          <div className="flex items-start gap-3">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.color} 
              flex items-center justify-center text-3xl border border-border shadow-xs`}
            >
              {topic.icon}
            </div>
            <div className="flex-1">
              <h1 className="font-devanagari font-bold text-2xl text-foreground leading-tight">
                {topic.name}
              </h1>
              <p className="text-sm text-muted-foreground">
                {topic.nameEnglish}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {topic.descriptionEnglish}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                {completedCount}/{topic.lessons.length} lessons done
              </span>
              <span className="text-xs font-bold text-primary">
                {progressPercent}%
              </span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Speed control */}
        <div className="bg-card border border-border rounded-xl p-3 mb-4 shadow-xs">
          <div className="flex items-center gap-3">
            <Volume2 className="w-4 h-4 text-muted-foreground shrink-0" />
            <span className="text-xs text-muted-foreground flex-shrink-0">
              Speed: {speechRate.toFixed(1)}x
            </span>
            <Slider
              min={0.5}
              max={2}
              step={0.25}
              value={[speechRate]}
              onValueChange={([v]) => setSpeechRate(v)}
              className="flex-1"
            />
            <div className="flex gap-1">
              {[0.5, 1.0, 1.5].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setSpeechRate(rate)}
                  className={`text-[10px] px-1.5 py-0.5 rounded font-medium transition-colors ${
                    speechRate === rate
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lessons */}
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <h2 className="font-display text-base font-semibold text-foreground">
            Lessons
          </h2>
          <Badge variant="outline" className="text-[10px] ml-auto">
            {topic.lessons.length} lessons
          </Badge>
        </div>

        <div className="space-y-3 mb-5">
          {topic.lessons.map((lesson, idx) => (
            <LessonCard
              key={lesson.title}
              lesson={lesson}
              lessonIndex={idx}
              isExpanded={expandedLesson === idx}
              isCompleted={completedSet.has(idx)}
              onToggle={() =>
                setExpandedLesson(expandedLesson === idx ? null : idx)
              }
              onSpeak={speak}
              onMarkDone={() => handleMarkDone(idx)}
              isMarkingDone={markDone.isPending}
            />
          ))}
        </div>

        {/* Quiz CTA */}
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/15 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">
                Ready to test yourself?
              </p>
              <p className="text-xs text-muted-foreground">
                {topic.quizzes.length} questions waiting
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => onQuiz(topicId)}
              className="shrink-0"
            >
              Start Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface LessonCardProps {
  lesson: GrammarLesson;
  lessonIndex: number;
  isExpanded: boolean;
  isCompleted: boolean;
  onToggle: () => void;
  onSpeak: (text: string) => void;
  onMarkDone: () => void;
  isMarkingDone: boolean;
}

function LessonCard({
  lesson,
  lessonIndex,
  isExpanded,
  isCompleted,
  onToggle,
  onSpeak,
  onMarkDone,
  isMarkingDone,
}: LessonCardProps) {
  return (
    <div
      className={`border rounded-xl overflow-hidden shadow-xs transition-all duration-200 ${
        isCompleted ? "border-success/30 bg-success/5" : "border-border bg-card"
      }`}
    >
      {/* Header row */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-muted/30 transition-colors"
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            isCompleted
              ? "bg-success text-success-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {isCompleted ? <CheckCircle className="w-4 h-4" /> : lessonIndex + 1}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight truncate">
            {lesson.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {lesson.english}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSpeak(lesson.content);
            }}
            className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center
              hover:bg-primary/20 transition-colors"
            title="Listen"
          >
            <Volume2 className="w-3.5 h-3.5 text-primary" />
          </button>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-1 border-t border-border/50">
          {/* Main content */}
          <div className="bg-muted/40 rounded-lg p-3 mb-3">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-devanagari text-base text-foreground leading-relaxed flex-1">
                {lesson.content}
              </p>
              <button
                type="button"
                onClick={() => onSpeak(lesson.content)}
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center
                  hover:bg-primary/20 transition-colors shrink-0"
              >
                <PlayCircle className="w-4 h-4 text-primary" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground italic mb-1">
              {lesson.transliteration}
            </p>
            <p className="text-xs text-foreground/70">{lesson.english}</p>
          </div>

          {/* Examples */}
          {lesson.examples && lesson.examples.length > 0 && (
            <div className="space-y-2 mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Examples
              </p>
              {lesson.examples.map((ex) => (
                <div
                  key={ex.hindi}
                  className="flex items-start gap-2 bg-accent/5 border border-accent/15 rounded-lg p-2.5"
                >
                  <button
                    type="button"
                    onClick={() => onSpeak(ex.hindi)}
                    className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center
                      hover:bg-accent/25 transition-colors shrink-0 mt-0.5"
                  >
                    <Volume2 className="w-3 h-3 text-accent" />
                  </button>
                  <div>
                    <p className="font-devanagari text-sm font-medium text-foreground leading-snug">
                      {ex.hindi}
                    </p>
                    <p className="text-[10px] text-muted-foreground italic">
                      {ex.transliteration}
                    </p>
                    <p className="text-[10px] text-foreground/60">
                      {ex.english}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Mark done */}
          <Button
            size="sm"
            variant={isCompleted ? "outline" : "default"}
            onClick={onMarkDone}
            disabled={isCompleted || isMarkingDone}
            className="w-full"
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                Completed
              </>
            ) : (
              <>
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                Mark as Done
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
