import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);

  z-index: 50;
`;

const OnboardOverlay = () => {
  return <Overlay></Overlay>;
};

export default OnboardOverlay;
