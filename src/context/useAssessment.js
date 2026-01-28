import { useContext } from "react";
import AssessmentContext from "./AssessmentContext";

export const useAssessment = () => {
  return useContext(AssessmentContext);
};
