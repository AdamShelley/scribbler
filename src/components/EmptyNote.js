import React from "react";
import styled from "styled-components";

const StyledEmptyNote = styled.div`
  display: flex;
  min-height: 100%;
  width: 100%;
  border: 1px solid white;
`;

const EmptyNote = () => {
  return <StyledEmptyNote>EmptyNote</StyledEmptyNote>;
};

export default EmptyNote;
