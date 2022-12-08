import React from "react";
import styled from "styled-components";
import { useShowHighlight } from "../hooks/useShowHighlight";

const HighlightedComponent = styled.div`
  width: ${(props) => (props.width ? props.width : "")};
  border: 2px solid var(--text-color) !important;
  /* box-shadow: 2px 3px 2px rgba(255, 255, 255, 0.6); */
  user-select: none;
  pointer-events: none;
  z-index: 55;
`;

const HighlighterWrapper = ({ children, step, width }) => {
  const { highlightRef, currentStep } = useShowHighlight();

  return (
    <>
      {step === currentStep ? (
        <HighlightedComponent width={width} ref={highlightRef}>
          {children}
        </HighlightedComponent>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default HighlighterWrapper;
