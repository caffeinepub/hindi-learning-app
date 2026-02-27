import { useState } from "react";
import { Volume2, Info, X } from "lucide-react";
import { KHADI_CONSONANTS, MATRAS, SYLLABLE_EXAMPLES } from "../constants/hindi";
import { usePronounce } from "../hooks/usePronounce";

export function KhadiPage() {
  const { speak } = usePronounce();
  const [activeCell, setActiveCell] = useState<string | null>(null);
  const [popoverSyllable, setPopoverSyllable] = useState<string | null>(null);

  const handleSpeakRow = (consonant: string) => {
    const syllables = MATRAS.map((m) => consonant + m.matra);
    let i = 0;
    const speakNext = () => {
      if (i >= syllables.length) {
        setActiveCell(null);
        return;
      }
      const syl = syllables[i];
      setActiveCell(syl);
      speak(syl);
      i++;
      setTimeout(speakNext, 700);
    };
    speakNext();
  };

  const handleCellTap = (syllable: string) => {
    speak(syllable);
    setPopoverSyllable(syllable);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl text-foreground mb-1">
          14 Khadi (बारहखड़ी)
        </h1>
        <p className="text-sm text-muted-foreground">
          Each consonant combined with all vowel sounds
        </p>
      </div>

      {/* Info banner */}
      <div className="mx-5 mb-4 bg-accent/8 border border-accent/20 rounded-xl p-3 flex gap-2.5">
        <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Tap any syllable cell to hear pronunciation and see examples. Scroll horizontally to see all vowel combinations.
        </p>
      </div>

      {/* Vowel header row — fixed reference above table */}
      <div className="mx-5 mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <div className="shrink-0 w-12 h-8 flex items-center justify-center">
          <Volume2 className="w-4 h-4 text-muted-foreground/50" />
        </div>
        {MATRAS.map((m) => (
          <div
            key={m.vowel}
            className="shrink-0 flex flex-col items-center min-w-[48px]"
          >
            <span className="font-devanagari text-sm font-bold text-accent">{m.vowel}</span>
            <span className="text-[9px] text-muted-foreground">{m.transliteration}</span>
          </div>
        ))}
      </div>

      {/* Main scrollable table */}
      <div className="mx-5 border border-border rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-auto max-h-[calc(100vh-280px)] no-scrollbar">
          {/* Header row - sticky top */}
          <div className="flex sticky top-0 z-30 bg-muted shadow-sm">
            {/* Corner cell */}
            <div className="sticky left-0 z-40 bg-muted min-w-[48px] h-10 flex items-center justify-center border-b border-r-2 border-border">
              <span className="font-devanagari text-xs font-bold text-muted-foreground">व्यंजन</span>
            </div>
            {/* Vowel headers */}
            {MATRAS.map((m) => (
              <div
                key={`header-${m.vowel}`}
                className="flex flex-col items-center justify-center min-w-[48px] h-10 bg-primary/8 border-b border-r border-border/60"
              >
                <span className="font-devanagari text-xs font-bold text-primary">{m.vowel}</span>
                <span className="text-[8px] text-muted-foreground">{m.transliteration}</span>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {KHADI_CONSONANTS.map((consonant) => (
            <div key={consonant} className="flex">
              {/* Sticky consonant column */}
              <button
                type="button"
                onClick={() => handleSpeakRow(consonant)}
                className="sticky left-0 z-20 bg-card min-w-[48px] h-10 flex items-center justify-center
                  border-b border-r-2 border-border font-devanagari text-base font-bold text-primary
                  hover:bg-primary/8 active:bg-primary/15 transition-colors"
                title={`Play all ${consonant} syllables`}
              >
                {consonant}
              </button>

              {/* Syllable cells */}
              {MATRAS.map((m) => {
                const syllable = consonant + m.matra;
                const isActive = activeCell === syllable;
                const isSelected = popoverSyllable === syllable;
                return (
                  <SyllableCell
                    key={`${consonant}-${m.transliteration}`}
                    syllable={syllable}
                    isActive={isActive}
                    isSelected={isSelected}
                    onTap={handleCellTap}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mx-5 mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary/20 border border-primary/30 inline-block" />
          Tap cell = speak + examples
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-primary/8 border border-primary/20 inline-block" />
          Tap consonant = speak whole row
        </span>
      </div>

      {/* Syllable examples bottom panel */}
      {popoverSyllable !== null && (
        <SyllablePanel
          syllable={popoverSyllable}
          onClose={() => setPopoverSyllable(null)}
        />
      )}
    </div>
  );
}

function SyllableCell({
  syllable,
  isActive,
  isSelected,
  onTap,
}: {
  syllable: string;
  isActive: boolean;
  isSelected: boolean;
  onTap: (syllable: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onTap(syllable)}
      className={`
        flex items-center justify-center
        font-devanagari text-sm font-medium
        border-b border-r border-border/40
        min-w-[48px] h-10
        transition-all duration-200 select-none
        ${isActive || isSelected
          ? "bg-primary text-primary-foreground scale-95"
          : "text-foreground bg-card hover:bg-primary/8 hover:text-primary"
        }
      `}
      aria-label={`Pronounce ${syllable}`}
    >
      {syllable}
    </button>
  );
}

function SyllablePanel({ syllable, onClose }: { syllable: string; onClose: () => void }) {
  const { speak } = usePronounce();
  const examples = SYLLABLE_EXAMPLES[syllable] ?? [];

  return (
    <div
      className="fixed bottom-[72px] left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl p-4
        animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="font-devanagari text-4xl font-bold text-primary leading-none">
              {syllable}
            </span>
            <button
              type="button"
              onClick={() => speak(syllable)}
              className="w-9 h-9 rounded-full bg-primary/10 text-primary hover:bg-primary/20
                flex items-center justify-center transition-all"
              aria-label={`Speak ${syllable}`}
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center
              text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {examples.length > 0 ? (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Examples
            </p>
            {examples.map((ex) => (
              <div
                key={ex.word}
                className="flex items-center justify-between bg-muted/40 rounded-xl px-3 py-2"
              >
                <div>
                  <span className="font-devanagari text-lg font-bold text-foreground leading-tight block">
                    {ex.word}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {ex.transliteration} · {ex.meaning}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => speak(ex.word)}
                  className="w-8 h-8 rounded-full bg-primary/10 text-primary hover:bg-primary/20
                    flex items-center justify-center transition-all shrink-0"
                  aria-label={`Speak ${ex.word}`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-2">
            Tap the speaker to hear this syllable.
          </p>
        )}
      </div>
    </div>
  );
}
