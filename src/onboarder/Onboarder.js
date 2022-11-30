import React, { useState } from "react";
import styled from "styled-components";
import OnboardPortal from "./OnboardPortal";

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

const Onboarder = ({ children, isOpen, handleClose, step = 0 }) => {
  const [currentStep, setStep] = useState(step);
  if (!isOpen) return null;

  return (
    <OnboardPortal wrapperId="onboard-wrapper">
      <OnboarderContainer>
        {currentStep === 0 && (
          <>
            <h2>Welcome to Scribbler</h2>
            <p>Let us walk you through the basics</p>
          </>
        )}
        <div>{currentStep}</div>
        <button onClick={handleClose}>Close Tutorial</button>
      </OnboarderContainer>
    </OnboardPortal>
  );
};

export default Onboarder;
