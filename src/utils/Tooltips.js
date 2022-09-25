import React, { useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  .tooltip {
    position: absolute;
    transform: translateY(-2.5rem);
    padding: 0.5rem;
    border: 1px solid var(--text-color);
    background-color: var(--background);
    color: var(--text-color);
    z-index: 99;
    border-radius: 5px;

    font-size: 0.9rem;
  }
`;

const Tooltips = (props) => {
  const [active, setActive] = useState(false);

  const showTooltip = () => {
    setActive(true);
  };

  const hideTooltip = () => {
    setActive(false);
  };

  return (
    <TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {props.children} {active && <div className="tooltip">{props.text}</div>}
    </TooltipContainer>
  );
};

export default Tooltips;
