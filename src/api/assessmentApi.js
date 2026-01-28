export const startAssessment = async (skill) => {
  return { success: true };
};

export const submitAnswer = async (answer) => {
  return { success: true };
};

export const getResult = async () => {
  return {
    confidence: 58,
    strengths: ["Basics", "JSX"],
    gaps: ["Hooks depth", "Optimization"],
  };
};
