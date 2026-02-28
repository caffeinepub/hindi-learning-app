# Hindi Grammar App

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Hindi grammar learning app with the following sections:
  1. **Nouns (संज्ञा)** -- types (vyakti, sthan, vastu), gender (masculine/feminine), singular/plural with examples and audio pronunciation
  2. **Pronouns (सर्वनाम)** -- personal, possessive, demonstrative pronouns with examples
  3. **Verbs (क्रिया)** -- root verbs, tenses (present/past/future), conjugation with subject agreement
  4. **Adjectives (विशेषण)** -- types, gender agreement with nouns, examples
  5. **Tenses (काल)** -- Present (वर्तमान), Past (भूतकाल), Future (भविष्य) with sentence structures and examples
  6. **Sentence Structure (वाक्य रचना)** -- SOV order, affirmative, negative, question sentences
  7. **Matras & Vowel Signs (मात्राएं)** -- how matras change meaning, examples with and without matras
  8. **Sandhi (संधि)** -- joining of words, common rules with examples
- Each topic card shows: Hindi term, English translation, explanation, example sentences (Hindi + transliteration + English meaning), and a speaker button for audio
- Quiz mode for each grammar topic: MCQ and fill-in-the-blank
- Progress tracking per topic (lessons completed, quiz scores)
- Search/filter to find grammar rules by keyword

### Modify
- None (new project)

### Remove
- None

## Implementation Plan
1. Backend: store grammar topics, lessons, quiz questions with answers, and user progress
2. Frontend: tabbed navigation for each grammar category, lesson cards with examples, audio via Web Speech API, quiz component, progress dashboard
3. Audio pronunciation using browser's SpeechSynthesis API with Hindi (hi-IN) voice
4. Quiz engine: MCQ with 4 options and fill-in-the-blank with answer checking
5. Progress stored per topic in backend
