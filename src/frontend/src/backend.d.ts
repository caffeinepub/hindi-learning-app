import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    getAllLearnedLetters(): Promise<Array<string>>;
    getProgressSummary(): Promise<{
        streak: bigint;
        averageQuizScore: number;
        totalLettersLearned: bigint;
    }>;
    getStreak(): Promise<bigint>;
    isLetterLearned(letter: string): Promise<boolean>;
    markLetterLearned(letter: string): Promise<void>;
    recordQuizScore(correct: bigint, total: bigint): Promise<void>;
    resetProgress(): Promise<void>;
    updateStreak(): Promise<void>;
}
