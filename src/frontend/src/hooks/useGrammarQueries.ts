import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GRAMMAR_TOPICS,
  type GrammarLesson,
  type GrammarQuizQuestion,
  type GrammarTopic,
} from "../constants/grammar";
import { useActor } from "./useActor";

// ---- Query: Get all grammar topics (falls back to local data if backend empty) ----
export function useGetGrammarTopics() {
  const { isFetching } = useActor();
  return useQuery<GrammarTopic[]>({
    queryKey: ["grammarTopics"],
    queryFn: async () => {
      // Always return local grammar data (backend stores alphabet, not grammar)
      return GRAMMAR_TOPICS;
    },
    enabled: !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

// ---- Query: Get lessons for a topic ----
export function useGetGrammarLessons(topicId: string) {
  return useQuery<GrammarLesson[]>({
    queryKey: ["grammarLessons", topicId],
    queryFn: async () => {
      const topic = GRAMMAR_TOPICS.find((t) => t.id === topicId);
      return topic?.lessons ?? [];
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

// ---- Query: Get quizzes for a topic ----
export function useGetGrammarQuizzes(topicId: string) {
  return useQuery<GrammarQuizQuestion[]>({
    queryKey: ["grammarQuizzes", topicId],
    queryFn: async () => {
      const topic = GRAMMAR_TOPICS.find((t) => t.id === topicId);
      return topic?.quizzes ?? [];
    },
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export interface GrammarProgress {
  // topicName -> set of completed lesson counts
  completedLessons: Map<string, number>;
  // topicName -> array of quiz scores (0-100)
  quizScores: Map<string, number[]>;
}

// ---- Query: Get grammar user progress ----
export function useGetGrammarProgress() {
  const { actor, isFetching } = useActor();
  return useQuery<GrammarProgress>({
    queryKey: ["grammarProgress"],
    queryFn: async (): Promise<GrammarProgress> => {
      const empty: GrammarProgress = {
        completedLessons: new Map(),
        quizScores: new Map(),
      };
      if (!actor) return empty;
      try {
        const raw = await actor.getUserProgress();
        const completedLessons = new Map<string, number>();
        for (const [name, count] of raw.completedLessons) {
          completedLessons.set(name, Number(count));
        }
        const quizScores = new Map<string, number[]>();
        for (const [name, scores] of raw.quizScores) {
          quizScores.set(name, scores.map(Number));
        }
        return { completedLessons, quizScores };
      } catch {
        return empty;
      }
    },
    enabled: !!actor && !isFetching,
  });
}

// ---- Mutation: Mark grammar lesson completed ----
export function useMarkGrammarLessonCompleted() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      topicName,
      lessonIndex,
    }: { topicName: string; lessonIndex: bigint }) => {
      if (!actor) return;
      try {
        await actor.markLessonCompleted(topicName, lessonIndex);
      } catch {
        // Silently ignore if backend doesn't support grammar topics
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grammarProgress"] });
    },
  });
}

// ---- Mutation: Submit grammar quiz answers ----
export function useSubmitGrammarQuiz() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      topicName,
      correctAnswers,
      totalQuestions,
    }: {
      topicName: string;
      correctAnswers: bigint;
      totalQuestions: bigint;
    }) => {
      if (!actor) return;
      try {
        await actor.submitQuizAnswers(
          topicName,
          correctAnswers,
          totalQuestions,
        );
      } catch {
        // Silently ignore if backend doesn't support grammar topics
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grammarProgress"] });
    },
  });
}
