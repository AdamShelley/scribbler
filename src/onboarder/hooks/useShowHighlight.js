import { useRef, useState } from "react";

export function useShowHighlight() {
  const highlightRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);

  const checkStep = () => {
    return currentStep;
  };

  const saveStep = (step) => {
    setCurrentStep(step);
  };

  return {
    highlightRef,
    checkStep,
    saveStep,
    setCurrentStep,
  };
}
