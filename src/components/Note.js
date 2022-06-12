import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    width: 50%;
    border-right: 1px solid var(--light-grey);
  }

  .result-container {
    width: 50%;
    padding: 1rem 2rem;
    line-height: 2;
    font-weight: inherit;
  }
`;

const Note = ({ selectedScribble }) => {
  const [markdown, setMarkDown] = useState(selectedScribble.body);

  useEffect(() => {
    setMarkDown(selectedScribble.body);
  }, [selectedScribble]);

  const updateMarkdown = (e) => {
    setMarkDown(e.target.value);
    console.log(markdown);
  };

  return (
    <StyledNoteContainer>
      <textarea
        onChange={updateMarkdown}
        value={markdown}
        data-provide="markdown"
      />
      <div className="result-container">
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
      </div>
    </StyledNoteContainer>
  );
};

export default Note;
