import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

// ---- Query: Get all learned letters ----
export function useGetAllLearnedLetters() {
  const { actor, isFetching } = useActor();
  return useQuery<string[]>({
    queryKey: ["learnedLetters"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLearnedLetters();
    },
    enabled: !!actor && !isFetching,
  });
}

// ---- Query: Progress summary ----
export function useGetProgressSummary() {
  const { actor, isFetching } = useActor();
  return useQuery<{ streak: bigint; averageQuizScore: number; totalLettersLearned: bigint }>({
    queryKey: ["progressSummary"],
    queryFn: async () => {
      if (!actor) return { streak: 0n, averageQuizScore: 0, totalLettersLearned: 0n };
      return actor.getProgressSummary();
    },
    enabled: !!actor && !isFetching,
  });
}

// ---- Mutation: Mark letter learned ----
export function useMarkLetterLearned() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (letter: string) => {
      if (!actor) throw new Error("Actor not available");
      return actor.markLetterLearned(letter);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnedLetters"] });
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}

// ---- Mutation: Record quiz score ----
export function useRecordQuizScore() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ correct, total }: { correct: bigint; total: bigint }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.recordQuizScore(correct, total);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}

// ---- Mutation: Update streak ----
export function useUpdateStreak() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateStreak();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}

// ---- Mutation: Reset progress ----
export function useResetProgress() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.resetProgress();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["learnedLetters"] });
      queryClient.invalidateQueries({ queryKey: ["progressSummary"] });
    },
  });
}
