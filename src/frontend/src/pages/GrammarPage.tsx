import { BarChart2, BookOpen, Dumbbell, Home, Search } from "lucide-react";
import { useState } from "react";
import { GrammarHomePage } from "./GrammarHomePage";
import { GrammarIdentifyPage } from "./GrammarIdentifyPage";
import { GrammarPracticePage } from "./GrammarPracticePage";
import { GrammarProgressPage } from "./GrammarProgressPage";
import { GrammarQuizPage } from "./GrammarQuizPage";
import { GrammarTopicPage } from "./GrammarTopicPage";

type GrammarView =
  | { type: "home" }
  | { type: "topic"; topicId: string }
  | { type: "quiz"; topicId: string }
  | { type: "progress" }
  | { type: "identify" }
  | { type: "practice" };

type GrammarTab = "home" | "progress" | "identify" | "practice";

export function GrammarPage() {
  const [view, setView] = useState<GrammarView>({ type: "home" });
  const [activeTab, setActiveTab] = useState<GrammarTab>("home");

  function navigateToTopic(topicId: string) {
    setView({ type: "topic", topicId });
  }

  function navigateToQuiz(topicId: string) {
    setView({ type: "quiz", topicId });
  }

  function navigateHome() {
    setView({ type: "home" });
    setActiveTab("home");
  }

  function navigateProgress() {
    setView({ type: "progress" });
    setActiveTab("progress");
  }

  function navigateToIdentify() {
    setView({ type: "identify" });
    setActiveTab("identify");
  }

  function navigateToPractice() {
    setView({ type: "practice" });
    setActiveTab("practice");
  }

  function renderView() {
    switch (view.type) {
      case "home":
        return <GrammarHomePage onSelectTopic={navigateToTopic} />;
      case "topic":
        return (
          <GrammarTopicPage
            topicId={view.topicId}
            onBack={navigateHome}
            onQuiz={navigateToQuiz}
          />
        );
      case "quiz":
        return (
          <GrammarQuizPage
            topicId={view.topicId}
            onBack={() => setView({ type: "topic", topicId: view.topicId })}
            onDone={() => setView({ type: "topic", topicId: view.topicId })}
          />
        );
      case "progress":
        return <GrammarProgressPage onSelectTopic={navigateToTopic} />;
      case "identify":
        return <GrammarIdentifyPage onBack={navigateHome} />;
      case "practice":
        return <GrammarPracticePage onBack={navigateHome} />;
    }
  }

  // Hide inner tab bar when inside topic/quiz views
  const showInnerTabs =
    view.type === "home" ||
    view.type === "progress" ||
    view.type === "identify" ||
    view.type === "practice";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">{renderView()}</div>

      {/* Inner sub-nav (only on home/progress views) */}
      {showInnerTabs && (
        <div className="fixed bottom-[60px] left-0 right-0 z-40">
          <div className="max-w-lg mx-auto px-4">
            <div
              className="bg-card/95 backdrop-blur-xl border border-border rounded-2xl
              shadow-card px-2 py-1.5 flex gap-1"
            >
              <GrammarTabButton
                icon={<Home className="w-4 h-4" />}
                label="Topics"
                isActive={activeTab === "home"}
                onClick={navigateHome}
              />
              <GrammarTabButton
                icon={<BookOpen className="w-4 h-4" />}
                label="Lessons"
                isActive={false}
                onClick={navigateHome}
              />
              <GrammarTabButton
                icon={<BarChart2 className="w-4 h-4" />}
                label="Progress"
                isActive={activeTab === "progress"}
                onClick={navigateProgress}
              />
              <GrammarTabButton
                icon={<Search className="w-4 h-4" />}
                label="Identify"
                isActive={activeTab === "identify" || view.type === "identify"}
                onClick={navigateToIdentify}
              />
              <GrammarTabButton
                icon={<Dumbbell className="w-4 h-4" />}
                label="Practice"
                isActive={activeTab === "practice" || view.type === "practice"}
                onClick={navigateToPractice}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface GrammarTabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function GrammarTabButton({
  icon,
  label,
  isActive,
  onClick,
}: GrammarTabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 px-2 rounded-xl transition-all duration-200 ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-[9px] font-medium leading-none">{label}</span>
    </button>
  );
}
