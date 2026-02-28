# Hindi Learning App

## Current State
The app has an Alphabet page with three tabs: Vowels, Consonants, and Half (अर्ध). The Half tab shows each half consonant with its formation (full + virama = half) and example words. Users can hear pronunciation for examples but there is no direct side-by-side practice comparing half vs full form.

## Requested Changes (Diff)

### Add
- A practice mode in the Half (अर्ध) tab that shows each full consonant paired with its half form side by side for direct comparison
- Speak buttons on both the full and half form in each practice card so the user can hear and compare them directly
- A visual "Full vs Half" practice grid that lets users tap through all pairs

### Modify
- The HalfLetterGrid and HalfLetterCard components to show the full consonant with its own large display and speak button alongside the half form
- The formation row to be more prominent — show full consonant, half consonant, and a clear label on each

### Remove
- Nothing removed

## Implementation Plan
1. Update `HalfLetterCard` in `AlphabetPage.tsx` to show the full consonant prominently with a speak button next to the half form (with its own speak button), so the user can clearly compare and practice both
2. Show transliteration under both full and half forms
3. Keep the existing example word and "More examples" toggle below
4. Add a small "Practice" badge or label to distinguish the pair-comparison section from the examples
