import React from "react";
import styled from "styled-components";
import EmptyNote from "./EmptyNote";
import Note from "./Note";

const StyledNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-height: 100%;
  min-width: 100%; */
  flex-grow: 100;
  cursor: auto;
  position: relative;

  .searchbar {
    background-color: var(--dark-grey);
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      padding: 0 1rem;
    }

    h3 {
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 1px;
    }
  }
`;

const NoteContainer = ({ selectedScribble }) => {
  return (
    <StyledNoteContainer>
      <div className="searchbar">
        <h3>Search</h3>
        <div>
          <span>E</span>
          <span>D</span>
        </div>
      </div>
      <div>
        {!selectedScribble ? (
          <EmptyNote />
        ) : (
          <Note selectedScribble={selectedScribble} />
        )}
      </div>
    </StyledNoteContainer>
  );
};

export default NoteContainer;
