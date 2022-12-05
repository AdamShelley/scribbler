import React, { useState, createContext } from "react";
import OnboardingContainer from "./components/OnboardingContainer";
import { OnboardingData } from "./OnboardingData";

export const OnboardContext = createContext();

const OnboardingProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <OnboardContext.Provider value={[currentStep, setCurrentStep]}>
      {children}
      <OnboardingContainer stepData={OnboardingData} />
    </OnboardContext.Provider>
  );
};

export default OnboardingProvider;
