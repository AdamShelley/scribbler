import { useRef, useContext } from "react";
import { OnboardContext } from "../OnboardingProvider";

export function useShowHighlight() {
  const highlightRef = useRef(null);

  const [currentStep, setNextStep] = useContext(OnboardContext);

  const saveStep = (step) => {
    // setCurrentStep(step);
  };

  console.log(currentStep);

  return {
    highlightRef,
    currentStep,
    saveStep,
  };
}
