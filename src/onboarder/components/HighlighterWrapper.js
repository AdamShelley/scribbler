import React from "react";
import styled from "styled-components";
import { useShowHighlight } from "../hooks/useShowHighlight";

const HighlightedComponent = styled.div`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    border: 3px solid var(--text-color);
    box-shadow: 2px 3px 2px rgba(255, 255, 255, 0.4);
  }
`;

const HighlighterWrapper = ({ children, step }) => {
  const { checkStep, highlightRef } = useShowHighlight();

  const currentStep = checkStep();

  console.log(highlightRef.current);

  return (
    <div ref={highlightRef}>
      {step === true ? (
        <HighlightedComponent>{children}</HighlightedComponent>
      ) : (
        <>{children}</>
      )}
    </div>
  );
};

export default HighlighterWrapper;
