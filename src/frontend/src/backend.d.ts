import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Topic {
    name: string;
    description: string;
    lessons: Array<Lesson>;
    quizzes: Array<QuizQuestion>;
}
export interface QuizOption {
    text: string;
    isCorrect: boolean;
}
export interface Lesson {
    title: string;
    content: string;
    transliteration: string;
    english: string;
}
export interface QuizQuestion {
    topic: string;
    question: string;
    answer: string;
    questionType: string;
    options: Array<QuizOption>;
}
export interface backendInterface {
    getLessonsByTopic(topicName: string): Promise<Array<Lesson>>;
    getQuizzesByTopic(topicName: string): Promise<Array<QuizQuestion>>;
    getTopics(): Promise<Array<Topic>>;
    getUserProgress(): Promise<{
        quizScores: Array<[string, Array<bigint>]>;
        completedLessons: Array<[string, bigint]>;
    }>;
    markLessonCompleted(topicName: string, lessonIndex: bigint): Promise<void>;
    submitQuizAnswers(topicName: string, correctAnswers: bigint, totalQuestions: bigint): Promise<void>;
}
