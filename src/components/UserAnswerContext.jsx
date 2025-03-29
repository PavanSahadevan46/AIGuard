import { createContext, useState, useContext } from "react";
const UserAnswerContext = createContext();

export function UserAnswersProvider({ children }) {
  const [answers, setAnswers] = useState({});

  return (
    <UserAnswerContext.Provider value={{ answers, setAnswers }}>
      {children}
    </UserAnswerContext.Provider>
  );
}

export function useUserAnswers() {
  return useContext(UserAnswerContext);
}
