import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

const StyledNote = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  height: 100%;
  width: 100%;

  p {
    margin-top: 2rem;
    line-height: 1.8;
  }
`;

const Note = () => {
  return (
    <StyledNote>
      <ReactMarkdown></ReactMarkdown>
    </StyledNote>
  );
};

export default Note;
