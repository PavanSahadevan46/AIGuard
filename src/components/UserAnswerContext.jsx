import { createContext, useState, useContext } from "react";
const UserAnswerContext = createContext();

export function UserAnswersProvider({ children }) {
  const [answers, setAnswers] = useState({});
  const [isSECRequired, setIsSECRequired] = useState(null);

  const resetAnswers = () => {
    setAnswers({});
    setIsSECRequired(null);
  };


  return (
    <UserAnswerContext.Provider
      value={{ answers, setAnswers, isSECRequired, setIsSECRequired,resetAnswers }}
    >
      {children}
    </UserAnswerContext.Provider>
  );
}

export function useUserAnswers() {
  return useContext(UserAnswerContext);
}
