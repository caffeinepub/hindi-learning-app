import Time "mo:core/Time";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Int "mo:core/Int";
import Float "mo:core/Float";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";

actor {
  type QuizSession = {
    correctAnswers : Nat;
    totalQuestions : Nat;
  };

  type UserProgress = {
    learnedLetters : [Text];
    quizScores : [QuizSession];
    streak : Nat;
    lastPracticeDay : Int;
  };

  module UserProgress {
    public func compare(p1 : UserProgress, p2 : UserProgress) : Order.Order {
      Nat.compare(p1.streak, p2.streak);
    };
  };

  let userProgressMap = Map.empty<Principal, UserProgress>();

  public shared ({ caller }) func markLetterLearned(letter : Text) : async () {
    let progress = switch (userProgressMap.get(caller)) {
      case (null) { { learnedLetters = [letter]; quizScores = []; streak = 0; lastPracticeDay = 0 } };
      case (?existingProgress) {
        let updatedLetters = Array.fromIter(
          existingProgress.learnedLetters.values().concat([letter].values())
        );
        { existingProgress with learnedLetters = updatedLetters };
      };
    };
    userProgressMap.add(caller, progress);
  };

  public shared ({ caller }) func recordQuizScore(correct : Nat, total : Nat) : async () {
    switch (userProgressMap.get(caller)) {
      case (null) { Runtime.trap("User has no existing progress") };
      case (?progress) {
        let newSession = { correctAnswers = correct; totalQuestions = total };
        let updatedScores = Array.fromIter(
          progress.quizScores.values().concat([newSession].values())
        );
        userProgressMap.add(caller, { progress with quizScores = updatedScores });
      };
    };
  };

  public shared ({ caller }) func updateStreak() : async () {
    let today = Int.abs(Time.now() / 86_400_000_000_000);
    let progress = switch (userProgressMap.get(caller)) {
      case (null) { { learnedLetters = []; quizScores = []; streak = 1; lastPracticeDay = today } };
      case (?existingProgress) {
        if (existingProgress.lastPracticeDay == today) {
          existingProgress;
        } else if (existingProgress.lastPracticeDay == (today - 1)) {
          { existingProgress with streak = existingProgress.streak + 1; lastPracticeDay = today };
        } else {
          { existingProgress with streak = 1; lastPracticeDay = today };
        };
      };
    };
    userProgressMap.add(caller, progress);
  };

  public query ({ caller }) func getProgressSummary() : async {
    totalLettersLearned : Nat;
    averageQuizScore : Float;
    streak : Nat;
  } {
    switch (userProgressMap.get(caller)) {
      case (null) { Runtime.trap("User has no progress") };
      case (?progress) {
        let totalQuestions = progress.quizScores.foldLeft(0, func(acc, s) { acc + s.totalQuestions });
        let totalCorrect = progress.quizScores.foldLeft(0, func(acc, s) { acc + s.correctAnswers });

        let avgScore = if (totalQuestions == 0) { 0.0 } else {
          totalCorrect.toFloat() / totalQuestions.toFloat();
        };

        {
          totalLettersLearned = progress.learnedLetters.size();
          averageQuizScore = avgScore;
          streak = progress.streak;
        };
      };
    };
  };

  public shared ({ caller }) func resetProgress() : async () {
    userProgressMap.remove(caller);
  };

  public query ({ caller }) func isLetterLearned(letter : Text) : async Bool {
    switch (userProgressMap.get(caller)) {
      case (null) { false };
      case (?progress) {
        progress.learnedLetters.any(func(l) { l == letter });
      };
    };
  };

  public query ({ caller }) func getAllLearnedLetters() : async [Text] {
    switch (userProgressMap.get(caller)) {
      case (null) { [] };
      case (?progress) { progress.learnedLetters };
    };
  };

  public query ({ caller }) func getStreak() : async Nat {
    switch (userProgressMap.get(caller)) {
      case (null) { 0 };
      case (?progress) { progress.streak };
    };
  };
};
