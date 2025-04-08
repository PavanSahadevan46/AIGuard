/**
 * User Answer component
 *
 * A context provider component creates a context for managing user answer-related state within the application.
 * Specifically, it is used for storing whether a Steroid Emergency Card (SEC) is required (isSECRequired).
 *
 * It creates context, a context provider, a custom hook to consume the context
 *
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

import { createContext, useState, useContext } from "react";
// Create a new context for user answer state
const UserAnswerContext = createContext();

// Provider component that wraps the app  to provide access to user answer state
export function UserAnswersProvider({ children }) {
  // Initialize state for determining if a Steroid Emergency Card is required
  // Initially set to null such that if the end page is accessed in a way thats not intended e.g. via url,
  // It uses the null step in the end page

  const [isSECRequired, setIsSECRequired] = useState(null);

  return (
    // The Provider supplies the state and its updater function to children components

    <UserAnswerContext.Provider value={{ isSECRequired, setIsSECRequired }}>
      {children}
    </UserAnswerContext.Provider>
  );
}

// Custom hook for accessing the user answer context more easily in child components

export function useUserAnswers() {
  return useContext(UserAnswerContext);
}
