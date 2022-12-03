import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import OnboardPortal from "./OnboardPortal";

import Button from "../styles/Button";

const OnboarderContainer = styled.div`
  position: fixed;
  inset: 0;
  /* background-color: rgba(0, 0, 0, 0.4); */
  display: flex;
  flex-direction: column;
  align-items: center; // Can be altered as an option
  justify-content: center; // Can be an option later
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  /* z-index: 997; */
  /* padding: 40px 20px 20px; */

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border: 2px solid var(--light-grey);
    border-radius: 2px;
    padding: 2rem;
    background-color: var(--background);
    width: 25%;
    height: 40%;

    z-index: 1000;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.8;
    }

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const stepList = [
  {
    step: 0,
    selectorName: ".selector-1",
    title: "Welcome to Scribbler",
    description: "This will help you get started!",
  },
  {
    step: 1,
    selectorName: ".selector-2",
    title: "Sidebar",
    description: "This is where all your scribbles are contained.",
  },
  {
    step: 2,
    selectorName: ".selector-3",
    title: "Add Scribble",
    description: "Click the + button to create a new scribble.",
  },
  {
    step: 3,
    selectorName: ".selector-4",
    title: "Scribble area",
    description:
      "This is where create your magic. Markdown text enabled editor.",
  },
  {
    step: 4,
    selectorName: ".selector-5",
    title: "Toolbar",
    description:
      "You have options to show/hide markdown/filter/save your scribbles",
  },
];

const Onboarder = ({
  children,
  isOpen,
  handleClose,
  step = 0,
  steps = stepList,
}) => {
  const [currentStep, setStep] = useState(step);
  const [borders, setBorders] = useState([]);

  //Remove highlighted elemnents
  const removeHighlightedElements = useCallback(() => {
    if (steps[currentStep - 1] > 0) return;

    const currentBorder = document.querySelector(
      steps[currentStep - 1].selectorName
    );

    if (!currentBorder) return;

    currentBorder.style.outline = "none";

    console.log(currentBorder);
  }, [currentStep, steps]);

  // HIGHLIGHT ELEMENT
  const highlightElement = useCallback(() => {
    if (currentStep === 0) return;

    const selectedElement = document.querySelector(
      steps[currentStep].selectorName
    );

    removeHighlightedElements();

    // selectedElement.style.border = "3px solid var(--text-color)";
    createOverlay(selectedElement);

    // selectedElement.style.zIndex = 995;
  }, [currentStep, steps, removeHighlightedElements]);

  const createOverlay = (selectedElement) => {};

  // SETTING STEPS
  const setNextStep = () => {
    setStep((prev) => prev + 1);
  };

  const previousPage = () => {
    removeHighlightedElements();
  };

  const endOnboarding = () => {
    removeHighlightedElements();
    handleClose();
  };

  // LISTENING FOR STEP CHANGE
  useEffect(() => {
    console.log("Use effect triggered");
    highlightElement();
  }, [currentStep, highlightElement]);

  if (!isOpen) return null;
  console.log("current step in main: ", currentStep);
  console.log(borders);

  return (
    <OnboardPortal wrapperId="onboard-wrapper">
      <OnboarderContainer>
        <section>
          <h2>{steps[currentStep].title}</h2>
          <p>{steps[currentStep].description}</p>

          {/* <div>{currentStep}</div> */}

          <div>
            {currentStep > 0 && (
              <Button
                margin="1rem"
                padding=".5rem"
                minWidth={"5rem "}
                onClick={() => {
                  setStep((prevStep) => prevStep - 1);
                  previousPage();
                }}
              >
                Previous step
              </Button>
            )}
            {steps.length - 1 !== currentStep && (
              <Button
                margin=".5rem"
                padding=".5rem"
                minWidth={"5rem "}
                onClick={setNextStep}
              >
                Next step
              </Button>
            )}
            {steps.length - 1 === currentStep && (
              <Button
                margin="1rem"
                padding=".5rem"
                minWidth={"5rem "}
                onClick={endOnboarding}
              >
                Finish
              </Button>
            )}
          </div>
        </section>
      </OnboarderContainer>
    </OnboardPortal>
  );
};

export default Onboarder;
