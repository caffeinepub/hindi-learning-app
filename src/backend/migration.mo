import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
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

  type OldUserProgress = {
    learnedLetters : [Text];
    quizScores : [QuizSession];
    streak : Nat;
    lastPracticeDay : Int;
  };

  type QuizSession = {
    correctAnswers : Nat;
    totalQuestions : Nat;
  };

  type OldActor = {
    userProgressMap : Map.Map<Principal, OldUserProgress>;
  };

  type Topic = {
    name : Text;
    description : Text;
    lessons : [Lesson];
    quizzes : [QuizQuestion];
  };

  type NewUserProgress = {
    completedLessons : Map.Map<Text, Nat>;
    quizScores : Map.Map<Text, [Nat]>;
  };

  type NewActor = {
    topics : Map.Map<Text, Topic>;
    userProgress : Map.Map<Principal, NewUserProgress>;
  };

  public func run(old : OldActor) : NewActor {
    let migratedUserProgress = old.userProgressMap.map<Principal, OldUserProgress, NewUserProgress>(
      func(_user, oldProgress) {
        let newScores = Map.empty<Text, [Nat]>();
        newScores.add("default", oldProgress.quizScores.map(func(session) { session.correctAnswers }));
        {
          completedLessons = Map.empty<Text, Nat>();
          quizScores = newScores;
        };
      }
    );
    {
      topics = Map.empty<Text, Topic>();
      userProgress = migratedUserProgress;
    };
  };
};
