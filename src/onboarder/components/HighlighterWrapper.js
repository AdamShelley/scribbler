import React from "react";
import styled from "styled-components";
import { useShowHighlight } from "../hooks/useShowHighlight";

const HighlightedComponent = styled.div`
  position: relative;
  z-index: 1000;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 3px solid var(--text-color);
    box-shadow: 2px 3px 2px rgba(255, 255, 255, 0.4);
    z-index: 1000;
  }
`;

const HighlighterWrapper = ({ children, step }) => {
  const { highlightRef, currentStep } = useShowHighlight();

  console.log(currentStep);

  return (
    <>
      {step === currentStep ? (
        <HighlightedComponent ref={highlightRef}>
          {children}
        </HighlightedComponent>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default HighlighterWrapper;
