import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ---- Query: Get progress summary (uses getUserProgress from grammar backend) ----
export function useGetProgressSummary() {
  const { isFetching } = useActor();
  return useQuery<{
    streak: bigint;
    averageQuizScore: number;
    totalLettersLearned: bigint;
  }>({
    queryKey: ["progressSummary"],
    queryFn: async () => {
      // Grammar backend doesn't have a progress summary endpoint
      // Return defaults — the old alphabet progress is gone
      return { streak: 0n, averageQuizScore: 0, totalLettersLearned: 0n };
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

// ---- Query: Get all learned letters (not available in grammar backend) ----
export function useGetAllLearnedLetters() {
  return useQuery<string[]>({
    queryKey: ["learnedLetters"],
    queryFn: async () => [],
    staleTime: Number.POSITIVE_INFINITY,
  });
}

// ---- Mutation: Mark letter learned (no-op for grammar backend) ----
export function useMarkLetterLearned() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_letter: string) => {
      // No-op — grammar backend doesn't track individual letters
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnedLetters"] });
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}

// ---- Mutation: Record quiz score (no-op for grammar backend) ----
export function useRecordQuizScore() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (_params: { correct: bigint; total: bigint }) => {
      // No-op — use useSubmitGrammarQuiz for grammar quizzes
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}

// ---- Mutation: Update streak (no-op for grammar backend) ----
export function useUpdateStreak() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // No-op — grammar backend doesn't track streaks
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}

// ---- Mutation: Reset progress (no-op for grammar backend) ----
export function useResetProgress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      // No-op — grammar backend doesn't support reset
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnedLetters"] });
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}
