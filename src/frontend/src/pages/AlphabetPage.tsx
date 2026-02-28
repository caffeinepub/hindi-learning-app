import { useState } from "react";
import { Check, Volume2, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VOWELS, CONSONANTS, HALF_CONSONANTS, type HindiCharacter, type HalfConsonant } from "../constants/hindi";
import { useGetAllLearnedLetters, useMarkLetterLearned } from "../hooks/useQueries";
import { usePronounce } from "../hooks/usePronounce";
import { toast } from "sonner";

function SpeakButton({ text }: { text: string }) {
  const { speak } = usePronounce();
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setActive(true);
        speak(text);
        setTimeout(() => setActive(false), 600);
      }}
      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all
        ${active ? "bg-primary text-primary-foreground scale-110" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
      aria-label={`Pronounce ${text}`}
    >
      <Volume2 className="w-3.5 h-3.5" />
    </button>
  );
}

export function AlphabetPage() {
  const { data: learnedLetters = [], isLoading } = useGetAllLearnedLetters();
  const markLearned = useMarkLetterLearned();
  const learnedSet = new Set(learnedLetters);

  const handleMark = (char: string) => {
    if (learnedSet.has(char)) return;
    markLearned.mutate(char, {
      onSuccess: () => {
        toast.success(`Marked "${char}" as learned!`, { duration: 2000 });
      },
      onError: () => {
        toast.error("Could not save. Try again.");
      },
    });
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="px-5 pt-8 pb-4">
        <h1 className="font-display text-2xl text-foreground mb-1">Alphabet</h1>
        <p className="text-sm text-muted-foreground">
          {learnedSet.size} of {VOWELS.length + CONSONANTS.length} characters learned
        </p>
      </div>

      <Tabs defaultValue="vowels" className="px-5">
        <TabsList className="w-full mb-5 bg-muted/60 rounded-xl p-1 h-11 flex">
          <TabsTrigger
            value="vowels"
            className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Vowels · {VOWELS.length}
          </TabsTrigger>
          <TabsTrigger
            value="consonants"
            className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Consonants · {CONSONANTS.length}
          </TabsTrigger>
          <TabsTrigger
            value="half"
            className="flex-1 rounded-lg text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            Half (अर्ध)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vowels" className="mt-0">
          <CharGrid
            characters={VOWELS}
            learnedSet={learnedSet}
            onMark={handleMark}
            isLoading={isLoading}
            isPending={markLearned.isPending}
          />
        </TabsContent>

        <TabsContent value="consonants" className="mt-0">
          <CharGrid
            characters={CONSONANTS}
            learnedSet={learnedSet}
            onMark={handleMark}
            isLoading={isLoading}
            isPending={markLearned.isPending}
          />
        </TabsContent>

        <TabsContent value="half" className="mt-0">
          <HalfLetterGrid isLoading={isLoading} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface CharGridProps {
  characters: HindiCharacter[];
  learnedSet: Set<string>;
  onMark: (char: string) => void;
  isLoading: boolean;
  isPending: boolean;
}

function CharGrid({ characters, learnedSet, onMark, isLoading, isPending }: CharGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 12 }, (_, i) => `skel-${i}`).map((key) => (
          <div key={key} className="h-28 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {characters.map((item, i) => {
        const isLearned = learnedSet.has(item.char);
        return (
          <CharCard
            key={item.char}
            item={item}
            isLearned={isLearned}
            onMark={onMark}
            isPending={isPending}
            animIndex={i}
          />
        );
      })}
    </div>
  );
}

interface CharCardProps {
  item: HindiCharacter;
  isLearned: boolean;
  onMark: (char: string) => void;
  isPending: boolean;
  animIndex: number;
}

function CharCard({ item, isLearned, onMark, isPending, animIndex }: CharCardProps) {
  const [pressed, setPressed] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const delay = Math.min(animIndex * 0.03, 0.5);
  const hasExamples = item.examples && item.examples.length > 0;

  return (
    <div
      className={`
        relative rounded-2xl border-2 p-3 flex flex-col items-center gap-1.5 overflow-hidden
        transition-all duration-300
        animate-scale-in
        ${isLearned
          ? "border-success/40 bg-success/8 shadow-xs"
          : "border-border bg-card shadow-xs hover:shadow-card-hover hover:-translate-y-0.5"
        }
      `}
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      {isLearned && (
        <div className="absolute top-2 right-2 w-4.5 h-4.5 bg-success/20 rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-success" />
        </div>
      )}

      {/* Speak button */}
      <div className="absolute top-2 left-2">
        <SpeakButton text={item.char} />
      </div>

      {/* Hindi character */}
      <span
        className={`font-devanagari text-4xl leading-none font-semibold select-none mt-4
          ${isLearned ? "text-success" : "text-primary"}`}
      >
        {item.char}
      </span>

      {/* Transliteration */}
      <span className={`text-xs font-medium tracking-wide
        ${isLearned ? "text-success/70" : "text-muted-foreground"}`}>
        {item.transliteration}
      </span>

      {/* Mark button */}
      {!isLearned && (
        <button
          type="button"
          disabled={isPending}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onMouseLeave={() => setPressed(false)}
          onClick={() => onMark(item.char)}
          className={`mt-1 w-full h-7 rounded-lg text-xs font-semibold transition-all duration-150
            bg-primary/10 text-primary border border-primary/20
            hover:bg-primary hover:text-primary-foreground
            disabled:opacity-40 disabled:cursor-not-allowed
            ${pressed ? "scale-95" : ""}`}
        >
          Mark learned
        </button>
      )}

      {isLearned && (
        <span className="mt-1 w-full h-7 rounded-lg text-xs font-semibold text-center leading-7
          text-success/80 bg-success/10 border border-success/20">
          Learned ✓
        </span>
      )}

      {/* Examples toggle */}
      {hasExamples && (
        <button
          type="button"
          onClick={() => setShowExamples((v) => !v)}
          className="w-full flex items-center justify-center gap-1 text-[10px] font-medium
            text-muted-foreground hover:text-primary transition-colors mt-0.5 py-0.5"
        >
          Examples
          {showExamples ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
        </button>
      )}

      {/* Examples list */}
      {hasExamples && showExamples && (
        <div className="w-full border-t border-border/50 pt-2 space-y-1.5">
          {item.examples!.map((ex) => (
            <div key={ex.word} className="flex items-center justify-between gap-1">
              <div className="flex-1 min-w-0">
                <span className="font-devanagari text-sm font-semibold text-foreground block leading-tight truncate">
                  {ex.word}
                </span>
                <span className="text-[9px] text-muted-foreground leading-tight">
                  {ex.transliteration} · {ex.meaning}
                </span>
              </div>
              <SpeakButton text={ex.word} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface HalfLetterGridProps {
  isLoading: boolean;
}

function HalfLetterGrid({ isLoading }: HalfLetterGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: 8 }, (_, i) => `skel-half-${i}`).map((key) => (
          <div key={key} className="h-36 rounded-2xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Explainer */}
      <div className="bg-accent/8 border border-accent/20 rounded-xl p-4">
        <p className="text-sm text-foreground font-medium mb-1">What are half letters?</p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          When two consonants join, the first loses its vowel sound and becomes a "half letter" (अर्ध अक्षर). 
          The virama sign (्) removes the inherent vowel.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {HALF_CONSONANTS.map((item, i) => (
          <HalfLetterCard key={item.full} item={item} animIndex={i} />
        ))}
      </div>
    </div>
  );
}

interface HalfLetterCardProps {
  item: HalfConsonant;
  animIndex: number;
}

function HalfLetterCard({ item, animIndex }: HalfLetterCardProps) {
  const delay = Math.min(animIndex * 0.04, 0.6);
  const [showMore, setShowMore] = useState(false);
  const hasMore = item.examples && item.examples.length > 0;

  // Derive full transliteration (consonant + a) from half transliteration
  const fullTranslit = `${item.transliteration}a`;
  const halfTranslit = item.transliteration;

  return (
    <div
      className="relative rounded-2xl border border-border bg-card p-3 flex flex-col gap-2.5
        shadow-xs hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300
        animate-scale-in overflow-hidden"
      style={{ animationDelay: `${delay}s`, animationFillMode: "both" }}
    >
      {/* Side-by-side practice boxes */}
      <div className="grid grid-cols-2 gap-2">
        {/* Full consonant box */}
        <div className="relative flex flex-col items-center gap-1.5 bg-primary/8 border border-primary/20 rounded-xl py-3 px-2">
          <div className="absolute top-1.5 right-1.5">
            <SpeakButton text={item.full} />
          </div>
          <span className="font-devanagari text-4xl font-bold text-primary leading-none mt-1 select-none">
            {item.full}
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-semibold text-primary/80 uppercase tracking-wider">Full</span>
            <span className="text-[9px] text-muted-foreground font-mono">{fullTranslit}</span>
          </div>
        </div>

        {/* Half consonant box */}
        <div className="relative flex flex-col items-center gap-1.5 bg-accent/8 border border-accent/20 rounded-xl py-3 px-2">
          <div className="absolute top-1.5 right-1.5">
            <SpeakButton text={item.full} />
          </div>
          <span className="font-devanagari text-4xl font-bold text-accent leading-none mt-1 select-none">
            {item.half}
          </span>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] font-semibold text-accent/80 uppercase tracking-wider">Half</span>
            <span className="text-[9px] text-muted-foreground font-mono">{halfTranslit}</span>
          </div>
        </div>
      </div>

      {/* Virama formula — small info line */}
      <div className="flex items-center justify-center gap-1 bg-muted/40 rounded-lg py-1 px-2">
        <span className="font-devanagari text-sm text-primary font-semibold">{item.full}</span>
        <span className="text-muted-foreground/50 text-[10px]">+</span>
        <span className="font-devanagari text-sm text-accent font-semibold">्</span>
        <ArrowRight className="w-2.5 h-2.5 text-muted-foreground/50 shrink-0" />
        <span className="font-devanagari text-sm text-foreground font-semibold">{item.half}</span>
        <span className="text-[9px] text-muted-foreground ml-0.5">(virama)</span>
      </div>

      {/* Example word */}
      <div className="flex items-center justify-between px-0.5">
        <div>
          <p className="font-devanagari text-base font-semibold text-foreground leading-none">{item.example}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{item.exampleMeaning}</p>
        </div>
        <SpeakButton text={item.example} />
      </div>

      {/* More examples toggle */}
      {hasMore && (
        <button
          type="button"
          onClick={() => setShowMore((v) => !v)}
          className="flex items-center gap-1 text-[10px] font-medium
            text-muted-foreground hover:text-primary transition-colors px-0.5"
        >
          More examples
          {showMore ? <ChevronUp className="w-2.5 h-2.5" /> : <ChevronDown className="w-2.5 h-2.5" />}
        </button>
      )}

      {/* More examples list */}
      {hasMore && showMore && (
        <div className="border-t border-border/50 pt-2 space-y-1.5 px-0.5">
          {item.examples!.map((ex) => (
            <div key={ex.word} className="flex items-center justify-between gap-1">
              <div className="flex-1 min-w-0">
                <span className="font-devanagari text-sm font-semibold text-foreground leading-tight block truncate">
                  {ex.word}
                </span>
                <span className="text-[9px] text-muted-foreground leading-tight">
                  {ex.transliteration} · {ex.meaning}
                </span>
              </div>
              <SpeakButton text={ex.word} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
