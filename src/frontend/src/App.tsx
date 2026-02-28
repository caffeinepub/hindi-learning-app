import { Toaster } from "@/components/ui/sonner";
import {
  BarChart2,
  BookOpen,
  BookText,
  GraduationCap,
  Grid2X2,
  Home,
  Layers,
  Mic,
  PenLine,
} from "lucide-react";
import { useState } from "react";
import { AlphabetPage } from "./pages/AlphabetPage";
import { DictationPage } from "./pages/DictationPage";
import { FlashcardsPage } from "./pages/FlashcardsPage";
import { GrammarPage } from "./pages/GrammarPage";
import { HomePage } from "./pages/HomePage";
import { KhadiPage } from "./pages/KhadiPage";
import { ProgressPage } from "./pages/ProgressPage";
import { WordFormationPage } from "./pages/WordFormationPage";
import { WritingPage } from "./pages/WritingPage";

type TabId =
  | "home"
  | "alphabet"
  | "flashcards"
  | "writing"
  | "progress"
  | "khadi"
  | "words"
  | "dictation"
  | "grammar";

const tabs: {
  id: TabId;
  label: string;
  icon: React.FC<{ className?: string }>;
}[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "alphabet", label: "Alphabet", icon: BookOpen },
  { id: "flashcards", label: "Quiz", icon: Layers },
  { id: "words", label: "Words", icon: BookText },
  { id: "khadi", label: "Khadi", icon: Grid2X2 },
  { id: "writing", label: "Write", icon: PenLine },
  { id: "dictation", label: "Dictation", icon: Mic },
  { id: "grammar", label: "Grammar", icon: GraduationCap },
  { id: "progress", label: "Progress", icon: BarChart2 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const renderPage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={(tab) => setActiveTab(tab as TabId)} />;
      case "alphabet":
        return <AlphabetPage />;
      case "flashcards":
        return <FlashcardsPage />;
      case "words":
        return <WordFormationPage />;
      case "khadi":
        return <KhadiPage />;
      case "writing":
        return <WritingPage />;
      case "dictation":
        return <DictationPage />;
      case "grammar":
        return <GrammarPage />;
      case "progress":
        return <ProgressPage />;
      default:
        return <HomePage onNavigate={(tab) => setActiveTab(tab as TabId)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Toaster position="top-center" richColors />

      {/* Main content */}
      <main className="flex-1 max-w-lg mx-auto w-full relative">
        {renderPage()}
      </main>

      {/* Bottom navigation — horizontally scrollable for 7 tabs */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto">
          <div
            className="bg-card/95 backdrop-blur-xl border-t border-border
            px-2 pb-safe-bottom shadow-[0_-4px_24px_-4px_oklch(0.52_0.155_38_/_0.12)]"
          >
            <div
              className="flex items-center py-2 overflow-x-auto no-scrollbar gap-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tabs.map(({ id, label, icon: Icon }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveTab(id)}
                    className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl
                      transition-all duration-200 shrink-0 min-w-[52px]
                      ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    <div
                      className={`relative flex items-center justify-center w-8 h-8 rounded-lg
                      transition-all duration-200
                      ${isActive ? "bg-primary/12 scale-110" : "bg-transparent"}`}
                    >
                      <Icon className="w-4 h-4" />
                      {isActive && (
                        <span
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2
                          w-1 h-1 bg-primary rounded-full"
                        />
                      )}
                    </div>
                    <span
                      className={`text-[9px] font-medium leading-none
                      ${isActive ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
