import { ArrowRight, BookOpen, Volume2 } from "lucide-react";
import { useState } from "react";
import {
  CONSONANTS,
  MATRAS,
  WORD_EXAMPLES,
  type WordExample,
} from "../constants/hindi";
import { usePronounce } from "../hooks/usePronounce";

function SpeakButton({
  text,
  size = "md",
}: { text: string; size?: "sm" | "md" | "lg" }) {
  const { speak } = usePronounce();
  const [active, setActive] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActive(true);
    speak(text);
    setTimeout(() => setActive(false), 600);
  };

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all
        ${
          active
            ? "bg-primary text-primary-foreground scale-110"
            : "bg-primary/10 text-primary hover:bg-primary/20"
        }`}
      aria-label={`Pronounce ${text}`}
    >
      <Volume2 className={iconSizes[size]} />
    </button>
  );
}

// Matra explainer row: consonant + matra = result
function MatraExample({
  consonant,
  matra,
  matraLabel,
  result,
  description,
}: {
  consonant: string;
  matra: string;
  matraLabel: string;
  result: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-2 bg-muted/40 rounded-xl p-3">
      <div className="flex flex-col items-center min-w-[36px]">
        <span className="font-devanagari text-2xl font-bold text-primary leading-none">
          {consonant}
        </span>
        <span className="text-[9px] text-muted-foreground mt-0.5">
          consonant
        </span>
      </div>
      <span className="text-muted-foreground text-lg font-light">+</span>
      <div className="flex flex-col items-center min-w-[36px]">
        <span className="font-devanagari text-2xl font-bold text-accent leading-none">
          {matra || "—"}
        </span>
        <span className="text-[9px] text-muted-foreground mt-0.5">
          {matraLabel}
        </span>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground/60 shrink-0" />
      <div className="flex flex-col items-center min-w-[44px]">
        <span className="font-devanagari text-2xl font-bold text-foreground leading-none">
          {result}
        </span>
        <span className="text-[9px] text-muted-foreground mt-0.5">
          {description}
        </span>
      </div>
      <div className="ml-auto">
        <SpeakButton text={result} size="sm" />
      </div>
    </div>
  );
}

// Word example card with color-coded parts
function WordCard({ example }: { example: WordExample }) {
  return (
    <div
      className="bg-card border border-border rounded-2xl p-4 shadow-xs
      hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Word + speak */}
      <div className="flex items-center justify-between mb-3">
        <span className="font-devanagari text-3xl font-bold text-foreground">
          {example.word}
        </span>
        <SpeakButton text={example.word} size="md" />
      </div>

      {/* Color-coded parts */}
      <div className="flex items-center gap-1 flex-wrap mb-2">
        {example.parts.map((part, i) => (
          <span
            key={`${part.char}-${i}`}
            className={`font-devanagari text-base font-semibold px-1.5 py-0.5 rounded-md
              ${
                part.role === "consonant"
                  ? "bg-primary/12 text-primary"
                  : part.role === "matra"
                    ? "bg-accent/15 text-accent"
                    : "bg-secondary/40 text-foreground"
              }`}
          >
            {part.char}
          </span>
        ))}
      </div>

      {/* Transliteration + meaning */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground italic">
          {example.transliteration}
        </span>
        <span className="text-sm font-semibold text-foreground bg-muted/60 px-2 py-0.5 rounded-lg">
          {example.meaning}
        </span>
      </div>
    </div>
  );
}

export function WordFormationPage() {
  const { speak } = usePronounce();
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(
    null,
  );
  const [selectedMatra, setSelectedMatra] = useState<string | null>(null);

  // Compute combined syllable
  const combined =
    selectedConsonant && selectedMatra !== null
      ? selectedConsonant + selectedMatra
      : null;

  const handleConsonant = (c: string) => {
    setSelectedConsonant(c);
    // auto-speak if matra selected
    if (selectedMatra !== null) {
      const syl = c + selectedMatra;
      speak(syl);
    }
  };

  const handleMatra = (m: string) => {
    setSelectedMatra(m);
    if (selectedConsonant) {
      const syl = selectedConsonant + m;
      speak(syl);
    }
  };

  const handleSpeakCombined = () => {
    if (combined) speak(combined);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl text-foreground mb-1">
          Word Formation (शब्द निर्माण)
        </h1>
        <p className="text-sm text-muted-foreground">
          Learn to connect consonants and vowels to form syllables and words
        </p>
      </div>

      <div className="px-5 space-y-6">
        {/* === Section 1: How Matras Work === */}
        <section>
          <h2 className="font-display text-lg text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4.5 h-4.5 text-primary" />
            How Matras Work
          </h2>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            A matra (मात्रा) is a vowel diacritic written alongside a consonant.
            The consonant's inherent "a" sound changes based on the matra
            attached.
          </p>
          <div className="space-y-2">
            <MatraExample
              consonant="क"
              matra=""
              matraLabel="no matra"
              result="क"
              description="ka"
            />
            <MatraExample
              consonant="क"
              matra="ा"
              matraLabel="aa matra"
              result="का"
              description="kaa"
            />
            <MatraExample
              consonant="क"
              matra="ि"
              matraLabel="i matra"
              result="कि"
              description="ki"
            />
            <MatraExample
              consonant="क"
              matra="ु"
              matraLabel="u matra"
              result="कु"
              description="ku"
            />
            <MatraExample
              consonant="क"
              matra="े"
              matraLabel="e matra"
              result="के"
              description="ke"
            />
          </div>
        </section>

        {/* === Section 2: Interactive Builder === */}
        <section>
          <h2 className="font-display text-lg text-foreground mb-1">
            Interactive Builder
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            Select a consonant + vowel to build a syllable
          </p>

          {/* Combined result display */}
          <div
            className="bg-gradient-to-br from-primary/8 to-accent/8 border border-primary/20
            rounded-2xl p-5 mb-4 flex flex-col items-center gap-2"
          >
            {combined ? (
              <>
                <div className="flex items-center gap-3">
                  <span className="font-devanagari text-2xl font-bold text-primary/70">
                    {selectedConsonant}
                  </span>
                  <span className="text-muted-foreground">+</span>
                  <span className="font-devanagari text-2xl font-bold text-accent/70">
                    {selectedMatra || "—"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground/60" />
                  <span className="font-devanagari text-5xl font-bold text-foreground leading-none">
                    {combined}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleSpeakCombined}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground
                    text-sm font-semibold hover:bg-primary/90 active:scale-95 transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  Pronounce
                </button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground text-center">
                Select a consonant and vowel below to build a syllable
              </p>
            )}
          </div>

          {/* Consonant grid */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">
              Consonants (व्यंजन)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CONSONANTS.slice(0, 33).map((c) => (
                <button
                  key={c.char}
                  type="button"
                  onClick={() => handleConsonant(c.char)}
                  className={`font-devanagari text-base font-semibold w-10 h-10 rounded-lg
                    border transition-all duration-150 active:scale-90
                    ${
                      selectedConsonant === c.char
                        ? "bg-primary text-primary-foreground border-primary shadow-md scale-105"
                        : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-primary/8"
                    }`}
                >
                  {c.char}
                </button>
              ))}
            </div>
          </div>

          {/* Matra/vowel grid */}
          <div>
            <p className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">
              Vowels / Matras (स्वर)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {MATRAS.map((m) => (
                <button
                  key={m.vowel}
                  type="button"
                  onClick={() => handleMatra(m.matra)}
                  className={`font-devanagari text-base font-semibold min-w-[40px] h-10 px-2 rounded-lg
                    border transition-all duration-150 active:scale-90 flex flex-col items-center justify-center
                    ${
                      selectedMatra === m.matra
                        ? "bg-accent text-accent-foreground border-accent shadow-md scale-105"
                        : "bg-card text-foreground border-border hover:border-accent/50 hover:bg-accent/8"
                    }`}
                >
                  <span className="leading-none text-sm">{m.vowel}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* === Section 3: Sample Words === */}
        <section className="pb-4">
          <h2 className="font-display text-lg text-foreground mb-1">
            Sample Words
          </h2>
          <p className="text-xs text-muted-foreground mb-4">
            <span className="inline-block w-3 h-3 rounded-sm bg-primary/12 mr-1 align-middle" />
            consonant
            <span className="inline-block w-3 h-3 rounded-sm bg-accent/15 mx-1 ml-3 align-middle" />
            matra (vowel sign)
          </p>
          <div className="space-y-3">
            {WORD_EXAMPLES.map((example) => (
              <WordCard key={example.word} example={example} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
