import { useState } from "react";
import AssessmentContext from "./AssessmentContext";

export function AssessmentProvider({ children }) {
  const [skill, setSkill] = useState(null);
  const [interviewId, setInterviewId] = useState(null);

  // 🆕 Interview progress
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions] = useState(5);

  // 🆕 Final result
  const [result, setResult] = useState(null);
  const resetAssessment = () => {
    setInterviewId(null);
    setCurrentQuestion(1);
    setResult(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        skill,
        setSkill,
        interviewId,
        setInterviewId,
        currentQuestion,
        setCurrentQuestion,
        totalQuestions,
        result,
        setResult,
        resetAssessment, // 🆕
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}
