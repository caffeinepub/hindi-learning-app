import { useEffect } from "react";
import { BookOpen, Layers, PenLine, BarChart2, Flame, Star, BookMarked, Heart } from "lucide-react";
import { useGetProgressSummary, useUpdateStreak } from "../hooks/useQueries";
import { ALL_CHARACTERS } from "../constants/hindi";

interface HomePageProps {
  onNavigate: (tab: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const { data: summary, isLoading } = useGetProgressSummary();
  const updateStreak = useUpdateStreak();

  const mutate = updateStreak.mutate;
  useEffect(() => {
    mutate();
  }, [mutate]);

  const totalChars = ALL_CHARACTERS.length;
  const learned = summary ? Number(summary.totalLettersLearned) : 0;
  const progressPercent = totalChars > 0 ? Math.round((learned / totalChars) * 100) : 0;
  const streak = summary ? Number(summary.streak) : 0;
  const avgScore = summary ? Math.round(summary.averageQuizScore) : 0;

  const quickActions = [
    {
      id: "alphabet",
      label: "Browse Alphabet",
      sub: "Vowels & Consonants",
      icon: BookOpen,
      color: "bg-primary/10 text-primary",
      borderColor: "border-primary/20",
    },
    {
      id: "flashcards",
      label: "Flashcard Quiz",
      sub: "Test your memory",
      icon: Layers,
      color: "bg-accent/10 text-accent",
      borderColor: "border-accent/20",
    },
    {
      id: "writing",
      label: "Writing Practice",
      sub: "Trace characters",
      icon: PenLine,
      color: "bg-secondary/40 text-foreground",
      borderColor: "border-secondary/40",
    },
    {
      id: "progress",
      label: "View Progress",
      sub: "Stats & streaks",
      icon: BarChart2,
      color: "bg-success/10 text-success",
      borderColor: "border-success/20",
    },
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-6 font-devanagari text-7xl opacity-40 select-none">अ</div>
          <div className="absolute top-2 right-10 font-devanagari text-5xl opacity-30 select-none">क</div>
          <div className="absolute bottom-4 left-1/3 font-devanagari text-6xl opacity-25 select-none">ह</div>
          <div className="absolute top-1/2 right-4 font-devanagari text-4xl opacity-35 select-none">ज्ञ</div>
        </div>
        <div className="relative px-5 pt-10 pb-8 animate-fade-in-up">
          <div className="flex items-center gap-2 mb-3">
            <BookMarked className="w-5 h-5 opacity-80" />
            <span className="text-sm font-medium opacity-80 tracking-wide uppercase">Hindi Learning</span>
          </div>
          <h1 className="font-display text-3xl font-normal leading-tight mb-2">
            नमस्ते! <span className="italic">Welcome</span>
          </h1>
          <p className="text-sm opacity-75 leading-relaxed max-w-xs">
            Learn to read and write Devanagari — the script of Hindi, Sanskrit, and more.
          </p>
        </div>
      </div>

      <div className="px-5 -mt-1">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mt-5 mb-6 animate-fade-in-up stagger-1">
          <StatCard
            icon={<BookOpen className="w-4 h-4" />}
            label="Learned"
            value={isLoading ? "—" : `${learned}/${totalChars}`}
            sub={isLoading ? "" : `${progressPercent}%`}
            colorClass="text-primary"
            bgClass="bg-primary/8"
          />
          <StatCard
            icon={<Flame className="w-4 h-4" />}
            label="Streak"
            value={isLoading ? "—" : `${streak}`}
            sub="days"
            colorClass="text-accent"
            bgClass="bg-accent/8"
          />
          <StatCard
            icon={<Star className="w-4 h-4" />}
            label="Avg Score"
            value={isLoading ? "—" : `${avgScore}%`}
            sub="quizzes"
            colorClass="text-success"
            bgClass="bg-success/8"
          />
        </div>

        {/* Progress bar */}
        <div className="mb-6 animate-fade-in-up stagger-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Alphabet Progress
            </span>
            <span className="text-xs font-semibold text-primary">{progressPercent}%</span>
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">
            {totalChars - learned} characters remaining
          </p>
        </div>

        {/* Quick actions */}
        <div className="mb-6 animate-fade-in-up stagger-3">
          <h2 className="font-display text-lg text-foreground mb-3">Start Learning</h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => onNavigate(action.id)}
                  className={`flex flex-col gap-2.5 p-4 rounded-xl border ${action.borderColor} bg-card text-left
                    hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 active:scale-95`}
                >
                  <div className={`w-9 h-9 rounded-lg ${action.color} flex items-center justify-center`}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground leading-tight">
                      {action.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">{action.sub}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Word of the day */}
        <div className="animate-fade-in-up stagger-4 mb-6">
          <h2 className="font-display text-lg text-foreground mb-3">Word of the Day</h2>
          <div className="bg-gradient-to-br from-accent/15 to-secondary/30 border border-accent/20 rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-devanagari text-5xl font-bold text-primary leading-none mb-2">
                  नमस्ते
                </p>
                <p className="text-sm font-medium text-foreground/80">namaste</p>
                <p className="text-xs text-muted-foreground mt-1">
                  hello · greeting · I bow to you
                </p>
              </div>
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-accent" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-4 border-t border-border/50 animate-fade-in-up stagger-5">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            © 2026. Built with
            <Heart className="w-3 h-3 text-accent fill-accent inline-block" />
            using{" "}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  colorClass: string;
  bgClass: string;
}

function StatCard({ icon, label, value, sub, colorClass, bgClass }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-3 border border-border shadow-xs flex flex-col gap-1.5">
      <div className={`w-7 h-7 rounded-md ${bgClass} ${colorClass} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className={`text-lg font-bold ${colorClass} leading-none`}>{value}</p>
        {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
      </div>
      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</p>
    </div>
  );
}
