# Hindi Learning App

## Current State
- Alphabet page: Vowels, Consonants, Half Letters tabs with pronunciation and mark-learned
- Khadi page: Full scrollable 14-khadi table with tap-to-pronounce
- Word Formation page: Matra explainer, interactive consonant+vowel builder, sample words
- Flashcards and Writing/Progress pages
- Characters in constants/hindi.ts with basic fields (char, transliteration, meaning)

## Requested Changes (Diff)

### Add
- Word examples for every vowel and consonant (2-3 words showing the character in use, with transliteration + meaning)
- Word examples for every half-letter entry (showing real usage in context)
- Examples panel on Khadi cells (tap a syllable → show 1-2 example words using that syllable)
- Dictation Practice page: app shows a word (with matra, half-letter variety), user hears pronunciation, then selects the correct Hindi script from 3-4 options. Covers words with matras, half-alphabets, and complex combinations.
- New "Dictation" tab in bottom nav

### Modify
- AlphabetPage CharCard: after pronunciation display 2-3 usage examples (word + transliteration + meaning) in a collapsible/expandable section
- HalfLetterCard: add 2-3 contextual example words showing the half letter used in real words
- KhadiPage: tapping a syllable shows a small popover with 1-2 example words containing that syllable
- hindi.ts constants: add `examples` field to HindiCharacter, extend HalfConsonant with more examples, add SYLLABLE_EXAMPLES map for khadi

### Remove
- Nothing removed

## Implementation Plan
1. Update hindi.ts: add `examples: { word, transliteration, meaning }[]` to HindiCharacter for all vowels and consonants; add `examples` array to HalfConsonant; add SYLLABLE_EXAMPLES record for common khadi syllables
2. Update AlphabetPage: CharCard shows expandable examples section; HalfLetterCard shows additional example words
3. Update KhadiPage: tapping a syllable shows examples popover
4. Create DictationPage: shows a Hindi word, plays audio automatically, user picks correct script from choices; covers matras, half-letters, conjuncts; shows score and feedback
5. Add Dictation tab to App.tsx nav

## UX Notes
- Examples should be compact to fit in the card — use a small "See examples" expand toggle
- Dictation page should feel like a quiz: word shown as audio + romanized hint, pick the Devanagari
- After each answer show the correct form with pronunciation and meaning
- Progressive difficulty: simple 2-letter words first, then matras, then half-letters
