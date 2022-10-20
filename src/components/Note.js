import React, { useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
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
    resize: horizontal;
  }

  .result-container {
    width: 50%;
    /* min-width: 30%; */
    padding: 1rem 2rem;
    line-height: 2;
    font-weight: inherit;
    overflow-x: scroll;
    /* white-space: pre; */
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
}) => {
  useEffect(() => {
    setMarkdown(
      selectedScribble?.body || "# Press the + button to create a new Scribble"
    );
    const title = updateTitle(selectedScribble?.body || "");
    setTitle(title || "");
    console.log(title);
  }, [setMarkdown, selectedScribble?.body, setTitle]);

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

  console.log(markdown);

  return (
    <StyledNoteContainer tabIndex="1">
      {/* {markdown && ( */}
      <textarea
        onChange={updateMarkdown}
        value={markdown ? markdown : ""}
        data-provide="markdown"
        disabled={
          selectedScribble?.archived ||
          selectedScribble?.deleted ||
          !selectedScribble?.body
        }
      />
      {/* )} */}

      {showResults && markdown.length > 0 && (
        <div className="result-container">
          <ReactMarkdown
            children={markdown.replace(/\n/gi, "&nbsp; \n")}
            remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
          />
        </div>
      )}
    </StyledNoteContainer>
  );
};

export default Note;
