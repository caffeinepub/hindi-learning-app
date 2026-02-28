import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart2,
  BookOpen,
  ChevronRight,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { GRAMMAR_TOPICS } from "../constants/grammar";
import { useGetGrammarProgress } from "../hooks/useGrammarQueries";

interface GrammarProgressPageProps {
  onSelectTopic: (topicId: string) => void;
}

export function GrammarProgressPage({
  onSelectTopic,
}: GrammarProgressPageProps) {
  const { data: progress, isLoading } = useGetGrammarProgress();

  const completedLessonsMap =
    progress?.completedLessons ?? new Map<string, number>();
  const quizScoresMap = progress?.quizScores ?? new Map<string, number[]>();

  const totalLessons = GRAMMAR_TOPICS.reduce(
    (sum, t) => sum + t.lessons.length,
    0,
  );
  const completedCount = [...completedLessonsMap.values()].reduce(
    (sum, n) => sum + n,
    0,
  );
  const overallPercent =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const allScores = [...quizScoresMap.values()].flat();
  const avgScore =
    allScores.length > 0
      ? Math.round(allScores.reduce((a, b) => a + b, 0) / allScores.length)
      : 0;

  const topicsCompleted = GRAMMAR_TOPICS.filter((t) => {
    const done = completedLessonsMap.get(t.name) ?? 0;
    return done >= t.lessons.length;
  }).length;

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/90 to-accent/80 text-primary-foreground px-5 pt-10 pb-8">
        <div className="flex items-center gap-2 mb-3">
          <BarChart2 className="w-5 h-5 opacity-80" />
          <span className="text-xs font-semibold opacity-80 tracking-widest uppercase">
            Your Progress
          </span>
        </div>
        <h1 className="font-display text-2xl leading-tight mb-4">
          Grammar Progress
        </h1>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xl font-bold">
              {isLoading ? "—" : `${overallPercent}%`}
            </p>
            <p className="text-[10px] opacity-75 mt-0.5">Overall</p>
          </div>
          <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xl font-bold">
              {isLoading ? "—" : `${completedCount}`}
            </p>
            <p className="text-[10px] opacity-75 mt-0.5">Lessons Done</p>
          </div>
          <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-xl p-3 text-center">
            <p className="text-xl font-bold">
              {isLoading ? "—" : `${avgScore > 0 ? `${avgScore}%` : "—"}`}
            </p>
            <p className="text-[10px] opacity-75 mt-0.5">Avg Quiz</p>
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        {/* Achievement cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <AchievementCard
            icon={<Trophy className="w-5 h-5 text-accent" />}
            label="Topics Finished"
            value={`${topicsCompleted}/${GRAMMAR_TOPICS.length}`}
            bgClass="bg-accent/10"
          />
          <AchievementCard
            icon={<Star className="w-5 h-5 text-primary" />}
            label="Quiz Attempts"
            value={`${allScores.length}`}
            bgClass="bg-primary/10"
          />
          <AchievementCard
            icon={<BookOpen className="w-5 h-5 text-success" />}
            label="Total Lessons"
            value={`${totalLessons}`}
            bgClass="bg-success/10"
          />
          <AchievementCard
            icon={<Target className="w-5 h-5 text-destructive" />}
            label="Best Quiz Score"
            value={allScores.length > 0 ? `${Math.max(...allScores)}%` : "—"}
            bgClass="bg-destructive/10"
          />
        </div>

        {/* Per-topic breakdown */}
        <h2 className="font-display text-lg text-foreground mb-3">
          Topic Breakdown
        </h2>
        <div className="space-y-3">
          {GRAMMAR_TOPICS.map((topic) => {
            const doneCount = completedLessonsMap.get(topic.name) ?? 0;
            const scores = quizScoresMap.get(topic.name) ?? [];
            const lessonPercent =
              topic.lessons.length > 0
                ? Math.round((doneCount / topic.lessons.length) * 100)
                : 0;
            const latestScore =
              scores.length > 0 ? scores[scores.length - 1] : null;
            const isFullyDone = doneCount >= topic.lessons.length;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(topic.id)}
                className="w-full text-left bg-card border border-border rounded-xl p-4
                  hover:shadow-card-hover transition-all duration-200 active:scale-[0.99] group"
              >
                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-2xl">{topic.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-devanagari font-semibold text-sm text-foreground">
                        {topic.name}
                      </h3>
                      {isFullyDone && (
                        <Badge className="text-[9px] px-1.5 h-4 bg-success/15 text-success border-success/25">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {topic.nameEnglish}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {latestScore !== null && (
                      <Badge
                        variant="outline"
                        className={`text-[10px] px-1.5 py-0 h-4 font-semibold border ${
                          latestScore >= 75
                            ? "bg-success/15 text-success border-success/20"
                            : latestScore >= 50
                              ? "bg-accent/15 text-accent border-accent/20"
                              : "bg-destructive/15 text-destructive border-destructive/20"
                        }`}
                      >
                        {latestScore}%
                      </Badge>
                    )}
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="flex items-center gap-2">
                  <Progress value={lessonPercent} className="h-1.5 flex-1" />
                  <span className="text-[10px] text-muted-foreground shrink-0">
                    {doneCount}/{topic.lessons.length} lessons
                  </span>
                </div>

                {/* Quiz history */}
                {scores.length > 0 && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="text-[10px] text-muted-foreground">
                      Quiz scores:
                    </span>
                    <div className="flex gap-1 flex-wrap">
                      {scores.slice(-5).map((s, scoreIdx) => (
                        <span
                          key={`${topic.id}-score-${scoreIdx}`}
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${
                            s >= 75
                              ? "bg-success/15 text-success"
                              : s >= 50
                                ? "bg-accent/15 text-accent"
                                : "bg-destructive/15 text-destructive"
                          }`}
                        >
                          {s}%
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface AchievementCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgClass: string;
}

function AchievementCard({
  icon,
  label,
  value,
  bgClass,
}: AchievementCardProps) {
  return (
    <div
      className={`${bgClass} border border-border/50 rounded-xl p-3.5 flex flex-col gap-2`}
    >
      <div className="w-8 h-8 bg-background/60 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold text-foreground leading-none">
          {value}
        </p>
        <p className="text-[10px] text-muted-foreground mt-1 font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
    </div>
  );
}
