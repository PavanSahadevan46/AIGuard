/**
 * Oral Dosage Value component
 *
 * A context provider component that stores the value from oral route to use in the inhaler route.
 * 
 * It creates context, a context provider and a custom hook to consume the context
 * @author Pavan Sahadevan
 * @version 1.0
 * Developed as a proof of concept for NHS England and as a final year project for CI601 from the University of Brighton.
 */

import { createContext, useState, useContext } from "react";

// Create a context to store and share the daily oral dosage value across components

const OralDosageValContext = createContext();

// Provider component that wraps parts of the app needing access to the oral dosage value
export const OralDosageValProvider = ({ children }) => {
  // Initialize state to store the daily dosage value (default is 0)

  const [dailyDosageVal, setDailyDosageVal] = useState(0);

  return (
    // The provider makes the dosage value and its setter function available to children components 
    <OralDosageValContext.Provider
      value={{ dailyDosageVal, setDailyDosageVal }}
    >
      {children}
    </OralDosageValContext.Provider>
  );
};

// Custom hook for easier usage of the OralDosageValContext

export const useOralDosageVal = () => {
  return useContext(OralDosageValContext);
};
