import React, { useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { updateTitle } from "../utils/getTitle";

const StyledNoteContainer = styled.div`
  display: flex;
  /* flex-direction: column; */
  position: absolute;

  width: 100%;
  height: 100%;

  textarea {
    padding: 1rem;
    background-color: inherit;
    resize: none;
    height: 100%;
    border: none;
    outline: none;
    color: var(--text-color);
    cursor: text;
    font-size: 1rem;
    width: ${(props) => (props.showResults ? "50%" : "100%")};
    border-right: 1px solid var(--light-grey);
    min-width: 20%;
    overflow-x: scroll;
  }

  .result-container {
    width: 50%;
    padding: 1rem 2rem;
    line-height: 2;
    font-weight: inherit;
    overflow-x: scroll;
  }
`;

const Note = ({
  markdown,
  setMarkdown,
  selectedScribble,
  setTitle,
  showResults,
  showMarkdown,
  updateScribblesWithoutDatabasePush,
  keyHandler,
}) => {
  useEffect(() => {
    setMarkdown(selectedScribble.body);
    const title = updateTitle(selectedScribble.body);
    setTitle(title);
  }, [setMarkdown, selectedScribble.body, setTitle]);

  const updateMarkdown = (e) => {
    setMarkdown(e.target.value);
    const newTitle = updateTitle(e.target.value);
    setTitle(newTitle);

    updateScribblesWithoutDatabasePush(
      selectedScribble,
      e.target.value,
      newTitle
    );
  };

  return (
    <StyledNoteContainer
      showResults={showResults}
      tabIndex="1"
      onKeyDown={keyHandler}
    >
      {showMarkdown && (
        <textarea
          onChange={updateMarkdown}
          value={markdown}
          data-provide="markdown"
          disabled={selectedScribble.archived || selectedScribble.deleted}
        />
      )}
      {showResults && (
        <div className="result-container">
          <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
        </div>
      )}
    </StyledNoteContainer>
  );
};

export default Note;
