import React from "react";
import styled from "styled-components";
import EmptyNote from "./EmptyNote";
import Note from "./Note";

const StyledNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  cursor: auto;

  .searchbar {
    background-color: var(--dark-grey);
    padding: 0.5rem 1rem;

    h3 {
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 1px;
    }
  }
`;

const NoteContainer = (note = false) => {
  return (
    <StyledNoteContainer>
      <div className="searchbar">
        <h3>Search</h3>
      </div>
      <div>{!note ? <EmptyNote /> : <Note />}</div>
    </StyledNoteContainer>
  );
};

export default NoteContainer;
