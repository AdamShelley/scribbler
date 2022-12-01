import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import OnboardPortal from "./OnboardPortal";

import Button from "../styles/Button";

const OnboarderContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  z-index: 999;
  padding: 40px 20px 20px;
`;

const stepList = [
  {
    step: 0,
    selectorName: ".selector-0",
    title: "Welcome to Scribbler",
    description: "This will help you get started!",
  },
  {
    step: 1,
    selectorName: ".selector-1",
    title: "Sidebar",
    description: "This is where all your scribbles are contained.",
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

  useEffect(() => {
    highlightElement(currentStep);
  }, [currentStep, highlightElement]);

  console.log(currentStep);

  let selectedElement;

  const highlightElement = useCallback((currentStep) => {
    if (!selectedElement) return;

    selectedElement = document.querySelector(steps[currentStep].selectorName);

    selectedElement.style.border = "3px solid var(--text-color)";
  }, []);

  if (!isOpen) return null;

  return (
    <OnboardPortal wrapperId="onboard-wrapper">
      <OnboarderContainer>
        <>
          <h2>{steps[currentStep].title}</h2>
          <p>{steps[currentStep].description}</p>
        </>

        <div>{currentStep}</div>
        {/* <Button
          minWidth="5rem "
          margin="1rem"
          padding=".5rem"
          onClick={handleClose}
        >
          Close Tutorial
        </Button> */}
        <div>
          <Button
            margin="1rem"
            padding=".5rem"
            minWidth={"5rem "}
            onClick={() => setStep((prev) => (prev === 0 ? 0 : prev - 1))}
          >
            Previous step
          </Button>
          {steps.length - 1 !== currentStep && (
            <Button
              margin=".5rem"
              padding=".5rem"
              minWidth={"5rem "}
              onClick={() => {
                setStep((prev) => (prev === steps.length ? prev : prev + 1));
                highlightElement(currentStep);
              }}
            >
              Next step
            </Button>
          )}
          {steps.length - 1 === currentStep && (
            <Button
              margin="1rem"
              padding=".5rem"
              minWidth={"5rem "}
              onClick={handleClose}
            >
              Finish
            </Button>
          )}
        </div>
      </OnboarderContainer>
    </OnboardPortal>
  );
};

export default Onboarder;
