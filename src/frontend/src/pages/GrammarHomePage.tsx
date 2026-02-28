import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Search,
  Star,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { GRAMMAR_TOPICS } from "../constants/grammar";
import { useGetGrammarProgress } from "../hooks/useGrammarQueries";

interface GrammarHomePageProps {
  onSelectTopic: (topicId: string) => void;
}

export function GrammarHomePage({ onSelectTopic }: GrammarHomePageProps) {
  const [search, setSearch] = useState("");
  const { data: progress } = useGetGrammarProgress();

  // completedLessons: Map<topicName, completedCount (number)>
  const completedLessonsMap =
    progress?.completedLessons ?? new Map<string, number>();
  const quizScoresMap = progress?.quizScores ?? new Map<string, number[]>();

  const filteredTopics = GRAMMAR_TOPICS.filter(
    (t) =>
      t.name.includes(search) ||
      t.nameEnglish.toLowerCase().includes(search.toLowerCase()) ||
      t.description.includes(search) ||
      t.descriptionEnglish.toLowerCase().includes(search.toLowerCase()),
  );

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

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/80 text-primary-foreground">
        {/* Decorative Devanagari chars */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
          <span className="absolute top-3 left-4 font-devanagari text-6xl opacity-10">
            व्
          </span>
          <span className="absolute top-8 right-6 font-devanagari text-4xl opacity-10">
            क्रि
          </span>
          <span className="absolute bottom-2 left-1/4 font-devanagari text-5xl opacity-10">
            ज्ञ
          </span>
          <span className="absolute bottom-4 right-8 font-devanagari text-3xl opacity-10">
            सं
          </span>
        </div>
        <div className="relative px-5 pt-10 pb-7 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 opacity-80" />
            <span className="text-xs font-semibold opacity-80 tracking-widest uppercase">
              Hindi Grammar
            </span>
          </div>
          <h1 className="font-display text-3xl leading-tight mb-1.5">
            हिंदी व्याकरण
          </h1>
          <p className="text-sm opacity-75 leading-relaxed max-w-xs">
            Master Hindi grammar — nouns, verbs, tenses, sentence structure and
            more.
          </p>

          {/* Mini stats */}
          <div className="flex gap-4 mt-5">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 opacity-70" />
              <span className="text-sm font-medium">
                {completedCount}/{totalLessons} lessons
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 opacity-70" />
              <span className="text-sm font-medium">
                {avgScore > 0 ? `${avgScore}% avg` : "No quizzes yet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 py-5">
        {/* Overall progress */}
        <div className="bg-card border border-border rounded-xl p-4 mb-5 shadow-xs animate-fade-in-up stagger-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-foreground">
                Overall Progress
              </span>
            </div>
            <span className="text-sm font-bold text-primary">
              {overallPercent}%
            </span>
          </div>
          <Progress value={overallPercent} className="h-2.5" />
          <p className="text-xs text-muted-foreground mt-1.5">
            {completedCount} of {totalLessons} lessons completed across{" "}
            {GRAMMAR_TOPICS.length} topics
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-5 animate-fade-in-up stagger-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9 bg-card border-border"
            placeholder="Search topics... (e.g. verb, noun)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Topics grid */}
        <h2 className="font-display text-lg text-foreground mb-3 animate-fade-in-up stagger-2">
          Grammar Topics
        </h2>

        {filteredTopics.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground animate-fade-in-up">
            <p className="font-devanagari text-3xl mb-2">?</p>
            <p className="text-sm">No topics found for "{search}"</p>
          </div>
        ) : (
          <div className="grid gap-3 animate-fade-in-up stagger-3">
            {filteredTopics.map((topic, idx) => {
              const doneCount = completedLessonsMap.get(topic.name) ?? 0;
              const scores = quizScoresMap.get(topic.name) ?? [];
              const lessonPercent =
                topic.lessons.length > 0
                  ? Math.round((doneCount / topic.lessons.length) * 100)
                  : 0;
              const latestScore =
                scores.length > 0 ? scores[scores.length - 1] : null;

              return (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => onSelectTopic(topic.id)}
                  className="w-full text-left bg-card border border-border rounded-xl p-4
                    hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200
                    active:scale-[0.99] group"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${topic.color} 
                      flex items-center justify-center text-2xl shrink-0 border border-border/50`}
                    >
                      {topic.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-devanagari font-semibold text-base text-foreground leading-tight">
                          {topic.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-[9px] px-1.5 py-0 h-4 font-normal"
                        >
                          {topic.nameEnglish}
                        </Badge>
                      </div>

                      <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                        {topic.descriptionEnglish}
                      </p>

                      {/* Progress bar */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                            style={{ width: `${lessonPercent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">
                          {doneCount}/{topic.lessons.length}
                        </span>
                      </div>
                    </div>

                    {/* Right side: score + arrow */}
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      {latestScore !== null && (
                        <Badge
                          className={`text-[10px] px-1.5 py-0 h-4 font-semibold ${
                            latestScore >= 75
                              ? "bg-success/15 text-success border-success/20"
                              : latestScore >= 50
                                ? "bg-accent/15 text-accent border-accent/20"
                                : "bg-destructive/15 text-destructive border-destructive/20"
                          } border`}
                          variant="outline"
                        >
                          {latestScore}%
                        </Badge>
                      )}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
