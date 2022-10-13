import React, { useEffect } from "react";
import styled from "styled-components";
import { useRemark } from "react-remark";
import { updateTitle } from "../utils/getTitle";
import remarkBreaks from "remark-breaks";

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

const NoteNew = ({
  markdown,
  selectedScribble,
  setTitle,
  showResults,
  showMarkdown,
  updateScribblesWithoutDatabasePush,
  keyHandler,
}) => {
  const [reactContent, setMarkdownSource] = useRemark({
    remarkPlugins: [remarkBreaks],
  });

  useEffect(() => {
    setMarkdownSource(selectedScribble.body);
    const title = updateTitle(selectedScribble.body);
    setTitle(title);
  }, [setMarkdownSource, selectedScribble.body, setTitle]);

  const updateMarkdown = (currentTarget) => {
    setMarkdownSource(currentTarget.value);
    const newTitle = updateTitle(currentTarget.value);
    setTitle(newTitle);

    updateScribblesWithoutDatabasePush(
      selectedScribble,
      currentTarget.value,
      newTitle
    );
  };

  return (
    <StyledNoteContainer
      // showResults={showResults}
      tabIndex="1"
      onKeyDown={keyHandler}
    >
      {showMarkdown && (
        <textarea
          onChange={({ currentTarget }) => updateMarkdown(currentTarget)}
          data-provide="markdown"
          value={selectedScribble.body}
          disabled={selectedScribble.archived || selectedScribble.deleted}
        />
      )}
      {showResults && (
        <div className="result-container" style={{ whiteSpace: "pre" }}>
          {reactContent}
        </div>
      )}
    </StyledNoteContainer>
  );
};

export default NoteNew;
