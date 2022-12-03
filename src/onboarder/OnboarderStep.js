import React from "react";
import styled from "styled-components";

const OnboarderStepOutline = styled.div`
  position: relative;

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

const OnboarderStep = ({ children, showOutline }) => {
  return (
    <>
      {showOutline ? (
        <OnboarderStepOutline>{children}</OnboarderStepOutline>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default OnboarderStep;
