import { createContext, useState, useContext } from "react";
const OralDosageValContext = createContext();

export const OralDosageValProvider = ({ children }) => {
  const [dailyDosageVal, setDailyDosageVal] = useState(0);

  return (
    <OralDosageValContext.Provider
      value={{ dailyDosageVal, setDailyDosageVal }}
    >
      {children}
    </OralDosageValContext.Provider>
  );
};

export const useOralDosageVal = () => {
  return useContext(OralDosageValContext);
};
