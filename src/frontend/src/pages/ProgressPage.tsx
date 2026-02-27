import { useState } from "react";
import { Flame, BookOpen, Star, RotateCcw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { useGetProgressSummary, useGetAllLearnedLetters, useResetProgress } from "../hooks/useQueries";
import { ALL_CHARACTERS, VOWELS, CONSONANTS } from "../constants/hindi";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function ProgressPage() {
  const { data: summary, isLoading: summaryLoading } = useGetProgressSummary();
  const { data: learnedLetters = [], isLoading: lettersLoading } = useGetAllLearnedLetters();
  const resetProgress = useResetProgress();
  const [resetOpen, setResetOpen] = useState(false);

  const isLoading = summaryLoading || lettersLoading;

  const totalChars = ALL_CHARACTERS.length;
  const learnedSet = new Set(learnedLetters);
  const learnedCount = learnedSet.size;
  const progressPct = totalChars > 0 ? Math.round((learnedCount / totalChars) * 100) : 0;

  const vowelsLearned = VOWELS.filter((v) => learnedSet.has(v.char)).length;
  const consonantsLearned = CONSONANTS.filter((c) => learnedSet.has(c.char)).length;

  const streak = summary ? Number(summary.streak) : 0;
  const avgScore = summary ? Math.round(summary.averageQuizScore) : 0;

  const handleReset = () => {
    resetProgress.mutate(undefined, {
      onSuccess: () => {
        toast.success("Progress reset successfully.");
        setResetOpen(false);
      },
      onError: () => {
        toast.error("Could not reset. Try again.");
      },
    });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl text-foreground mb-1">Progress</h1>
        <p className="text-sm text-muted-foreground">Your learning journey at a glance</p>
      </div>

      <div className="px-5 space-y-4">
        {/* Overall progress */}
        <section className="bg-card border border-border rounded-2xl p-5 shadow-xs animate-fade-in-up">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Overall Progress
          </h2>
          <div className="flex items-end gap-3 mb-4">
            {isLoading ? (
              <Skeleton className="h-10 w-24" />
            ) : (
              <span className="font-display text-4xl text-primary">{progressPct}%</span>
            )}
            <span className="text-sm text-muted-foreground mb-1.5">
              {isLoading ? "..." : `${learnedCount} of ${totalChars} characters`}
            </span>
          </div>
          <Progress value={progressPct} className="h-3 mb-3" />
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-muted/40 rounded-xl p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Vowels</p>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <p className="text-lg font-bold text-foreground">
                  {vowelsLearned}
                  <span className="text-sm text-muted-foreground font-normal">/{VOWELS.length}</span>
                </p>
              )}
            </div>
            <div className="bg-muted/40 rounded-xl p-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Consonants</p>
              {isLoading ? (
                <Skeleton className="h-6 w-16" />
              ) : (
                <p className="text-lg font-bold text-foreground">
                  {consonantsLearned}
                  <span className="text-sm text-muted-foreground font-normal">/{CONSONANTS.length}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Stats grid */}
        <section className="grid grid-cols-2 gap-3 animate-fade-in-up stagger-1">
          <StatBox
            icon={<Flame className="w-5 h-5" />}
            label="Current Streak"
            value={isLoading ? null : `${streak} days`}
            colorClass="text-accent"
            bgClass="bg-accent/10"
            note={streak >= 7 ? "🔥 On fire!" : streak >= 3 ? "Keep going!" : "Start a streak!"}
          />
          <StatBox
            icon={<Star className="w-5 h-5" />}
            label="Avg Quiz Score"
            value={isLoading ? null : `${avgScore}%`}
            colorClass="text-success"
            bgClass="bg-success/10"
            note={avgScore >= 80 ? "Excellent" : avgScore >= 60 ? "Good work" : "Practice more"}
          />
        </section>

        {/* Learned characters */}
        {learnedCount > 0 && (
          <section className="bg-card border border-border rounded-2xl p-5 shadow-xs animate-fade-in-up stagger-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Learned Characters
            </h2>
            <div className="flex flex-wrap gap-2">
              {learnedLetters.map((char) => (
                <span
                  key={char}
                  className="font-devanagari text-lg font-semibold text-success bg-success/10
                    border border-success/20 rounded-lg px-2.5 py-1 leading-none"
                >
                  {char}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        <section className="bg-card border border-border rounded-2xl p-5 shadow-xs animate-fade-in-up stagger-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Milestones
          </h2>
          <div className="space-y-2.5">
            <MilestoneRow label="First character learned" achieved={learnedCount >= 1} />
            <MilestoneRow label="10 characters learned" achieved={learnedCount >= 10} />
            <MilestoneRow label="All vowels learned" achieved={vowelsLearned >= VOWELS.length} />
            <MilestoneRow label="Half the alphabet" achieved={learnedCount >= Math.floor(totalChars / 2)} />
            <MilestoneRow label="Full alphabet mastered" achieved={learnedCount >= totalChars} />
            <MilestoneRow label="3-day streak" achieved={streak >= 3} />
            <MilestoneRow label="7-day streak" achieved={streak >= 7} />
          </div>
        </section>

        {/* Reset */}
        <section className="animate-fade-in-up stagger-4 pb-2">
          <AlertDialog open={resetOpen} onOpenChange={setResetOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl border-destructive/30 text-destructive hover:bg-destructive/8 hover:text-destructive gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All Progress
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  Reset Progress?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your learned characters, quiz scores, and streaks.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleReset}
                  className="rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={resetProgress.isPending}
                >
                  {resetProgress.isPending ? "Resetting..." : "Yes, Reset"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
}

interface StatBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  colorClass: string;
  bgClass: string;
  note: string;
}

function StatBox({ icon, label, value, colorClass, bgClass, note }: StatBoxProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-xs">
      <div className={`w-9 h-9 rounded-xl ${bgClass} ${colorClass} flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{label}</p>
      {value === null ? (
        <Skeleton className="h-7 w-20 mb-1" />
      ) : (
        <p className={`text-2xl font-bold ${colorClass} leading-none mb-1`}>{value}</p>
      )}
      <p className="text-xs text-muted-foreground">{note}</p>
    </div>
  );
}

interface MilestoneRowProps {
  label: string;
  achieved: boolean;
}

function MilestoneRow({ label, achieved }: MilestoneRowProps) {
  return (
    <div className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors
      ${achieved ? "bg-success/8" : "bg-muted/30"}`}>
      <span className={`text-base ${achieved ? "grayscale-0" : "grayscale opacity-30"}`}>
        {achieved ? "✅" : "⭕"}
      </span>
      <span className={`text-sm ${achieved ? "text-foreground font-medium" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}
