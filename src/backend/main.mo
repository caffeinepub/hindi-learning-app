import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

import Order "mo:core/Order";


actor {
  type Lesson = {
    title : Text;
    content : Text;
    transliteration : Text;
    english : Text;
  };

  type QuizOption = {
    text : Text;
    isCorrect : Bool;
  };

  type QuizQuestion = {
    question : Text;
    options : [QuizOption];
    answer : Text;
    questionType : Text;
    topic : Text;
  };

  type Topic = {
    name : Text;
    description : Text;
    lessons : [Lesson];
    quizzes : [QuizQuestion];
  };

  type UserProgress = {
    completedLessons : Map.Map<Text, Nat>;
    quizScores : Map.Map<Text, [Nat]>;
  };

  let topics = Map.empty<Text, Topic>();
  let userProgress = Map.empty<Principal, UserProgress>();

  public query ({ caller }) func getTopics() : async [Topic] {
    topics.values().toArray();
  };

  public query ({ caller }) func getLessonsByTopic(topicName : Text) : async [Lesson] {
    switch (topics.get(topicName)) {
      case (null) { Runtime.trap("Topic not found") };
      case (?topic) { topic.lessons };
    };
  };

  public query ({ caller }) func getQuizzesByTopic(topicName : Text) : async [QuizQuestion] {
    switch (topics.get(topicName)) {
      case (null) { Runtime.trap("Topic not found") };
      case (?topic) { topic.quizzes };
    };
  };

  public shared ({ caller }) func submitQuizAnswers(topicName : Text, correctAnswers : Nat, totalQuestions : Nat) : async () {
    let progress = switch (userProgress.get(caller)) {
      case (null) {
        let newScores = Map.empty<Text, [Nat]>();
        newScores.add(topicName, [correctAnswers]);
        { completedLessons = Map.empty<Text, Nat>(); quizScores = newScores };
      };
      case (?existing) {
        let existingScores = existing.quizScores.get(topicName);
        let scoresArray = switch (existingScores) {
          case (null) { [correctAnswers] };
          case (?scores) { scores.concat([correctAnswers]) };
        };
        existing.quizScores.add(topicName, scoresArray);
        existing;
      };
    };
    userProgress.add(caller, progress);
  };

  public shared ({ caller }) func markLessonCompleted(topicName : Text, lessonIndex : Nat) : async () {
    let progress = switch (userProgress.get(caller)) {
      case (null) {
        let newLessons = Map.empty<Text, Nat>();
        newLessons.add(topicName, lessonIndex);
        { completedLessons = newLessons; quizScores = Map.empty<Text, [Nat]>() };
      };
      case (?existing) {
        let currentLesson = switch (existing.completedLessons.get(topicName)) {
          case (null) { lessonIndex };
          case (?existingIndex) { existingIndex + 1 };
        };
        existing.completedLessons.add(topicName, currentLesson);
        existing;
      };
    };
    userProgress.add(caller, progress);
  };

  public query ({ caller }) func getUserProgress() : async {
    completedLessons : [(Text, Nat)];
    quizScores : [(Text, [Nat])];
  } {
    switch (userProgress.get(caller)) {
      case (null) { Runtime.trap("User progress not found") };
      case (?progress) {
        {
          completedLessons = progress.completedLessons.toArray();
          quizScores = progress.quizScores.toArray();
        };
      };
    };
  };
};

