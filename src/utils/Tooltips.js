import React, { useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: visible;

  .tooltip {
    position: absolute;
    transform: translateY(-2.5rem);
    padding: 0.6rem 1.2rem;
    border: 1px solid var(--light-grey);
    background-color: var(--background);
    color: var(--text-color);
    border-radius: 2px;
    user-select: none;
    box-shadow: 4px 9px 16px -3px rgba(0, 0, 0, 0.75);
    font-size: 0.9rem;
    font-family: inherit;
    z-index: 90;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      width: 0;
      height: 0;
      bottom: -8px;
      border-top: 8px solid var(--light-grey);
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
    }
  }
`;

const Tooltips = (props) => {
  let timer;
  const [active, setActive] = useState(false);

  const showTooltip = () => {
    timer = setTimeout(() => {
      setActive(true);
    }, [100]);
  };

  const hideTooltip = () => {
    clearTimeout(timer);
    clearInterval(timer);
    setActive(false);
  };

  return (
    <TooltipContainer onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {props.children} {active && <div className="tooltip">{props.text}</div>}
    </TooltipContainer>
  );
};

export default Tooltips;
