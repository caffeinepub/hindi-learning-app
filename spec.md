# Hindi Grammar App

## Current State

The app has:
- **Alphabet / Vowels / Khadi / Half-Letters** tabs with audio pronunciation
- **Flashcards (Quiz)** tab: flip cards with Devanagari ↔ transliteration, 10-card deck
- **Dictation** tab: word & sentence dictation with speed control, diff review, difficulty filter
- **Grammar** tab with sub-tabs:
  - **Topics** (home): 8 grammar topics, each with lessons + per-topic quizzes
  - **Progress**: shows lesson completion per topic
  - **Identify**: tap a word in a sentence, tag it as Noun/Verb/Adjective etc.
- **Writing** tab: free-draw canvas

## Requested Changes (Diff)

### Add

1. **Grammar Practice Hub** — a new "Practice" sub-tab inside Grammar (alongside Topics / Progress / Identify) that aggregates several targeted practice modes:

   a. **Fill-in-the-Blank Sentences** — show a Hindi sentence with one word blanked out; user types the missing word; audio button reads the full sentence; difficulty filter (Easy / Medium / Hard); 20+ sentences covering various grammar topics.

   b. **Sentence Builder** — show a set of shuffled Hindi word chips; user drags/taps them into the correct order to form a sentence; "Check" button shows correctness; audio reads the correct answer; difficulty filter; 20+ sentence sets.

   c. **Translation Practice** — show an English sentence, user types the Hindi translation; show diff/feedback after submission; audio reads the correct answer; 20+ items.

   d. **Verb Conjugation Drill** — show a verb in infinitive form + a subject (मैं / तुम / वह / हम / वे) + tense (present/past/future); user selects or types the correct conjugated form; 15+ verb sets.

2. **More Identify sentences** — expand SENTENCES array in GrammarIdentifyPage from 18 to 30+ entries (mix of easy/medium/hard).

3. **More Dictation items** — expand DICTATION_ITEMS in hindi.ts with 20+ additional word and sentence entries covering matras, half-letters, and conjunct clusters.

### Modify

- `GrammarPage.tsx` — add a "Practice" tab button to the inner sub-nav; wire it to a new `GrammarPracticePage` component; update `GrammarView` type and `GrammarTab` type accordingly.

### Remove

Nothing removed.

## Implementation Plan

1. Create `src/frontend/src/pages/GrammarPracticePage.tsx` with four practice mode tabs: Fill-in-Blank, Sentence Builder, Translation, Verb Conjugation. Each mode is self-contained with its own dataset, state, audio (SpeechSynthesis hi-IN), and difficulty/topic filters.
2. Update `GrammarPage.tsx`: add `practice` to `GrammarTab` and `GrammarView` types; add a "Practice" tab button (use Pencil icon); render `GrammarPracticePage` when active.
3. Expand SENTENCES array in `GrammarIdentifyPage.tsx` to 30+ entries across all three difficulties.
4. Expand `DICTATION_ITEMS` in `src/frontend/src/constants/hindi.ts` with 20+ new entries.
