import { useRef, useContext } from "react";
import { OnboardContext } from "../OnboardingProvider";

export function useShowHighlight() {
  const highlightRef = useRef(null);

  const [currentStep, setNextStep] = useContext(OnboardContext);

  return {
    highlightRef,
    currentStep,
  };
}
