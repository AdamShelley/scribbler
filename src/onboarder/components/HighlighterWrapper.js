import React from "react";
import styled from "styled-components";
import { useShowHighlight } from "../hooks/useShowHighlight";

const HighlightedComponent = styled.div`
  border: 1px solid var(--text-color);

  box-shadow: 2px 3px 2px rgba(255, 255, 255, 0.4);

  user-select: none;
  pointer-events: none;

  z-index: 55;
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
