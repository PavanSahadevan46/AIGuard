import { createContext, useState, useContext } from "react";
const UserAnswerContext = createContext();

export function UserAnswersProvider({ children }) {
  const [isSECRequired, setIsSECRequired] = useState(null);

  return (
    <UserAnswerContext.Provider
      value={{ isSECRequired, setIsSECRequired }}
    >
      {children}
    </UserAnswerContext.Provider>
  );
}

export function useUserAnswers() {
  return useContext(UserAnswerContext);
}
