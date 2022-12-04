import React from "react";
import styled from "styled-components";
import OnboarderStep from "./OnboarderStep";
import { OnboardingSteps } from "./OnboardingData";

const OnboarderStepOutline = styled.div`
  position: relative;
  z-index: 999;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    /* background-color: rgba(0, 0, 0, 0.1); */
    width: 100%;
    height: 100%;
    border: 3px solid var(--text-color);
    z-index: 100;
  }
`;

const OnboardingWrapper = ({ children, step, showOutline }) => {
  console.log(step);

  return (
    <>
      {showOutline ? (
        <OnboarderStepOutline>{children}</OnboarderStepOutline>
      ) : (
        <>{children}</>
      )}

      {/* Only show one step per wrapper  */}
      {/* Do i do a loop? */}
      <OnboarderStep showOutline={showOutline} step={step} />
    </>
  );
};

export default OnboardingWrapper;
