import React from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { updateTitle } from "../utils/getTitle";

const StyledEmptyNote = styled.div`
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

const EmptyNote = ({ markdown, setMarkdown, setTitle }) => {
  const updateMarkdown = (e) => {
    setMarkdown(e.target.value);
    const newTitle = updateTitle(e.target.value);
    setTitle(newTitle);
  };

  return (
    <StyledEmptyNote>
      <textarea onChange={updateMarkdown} value={markdown} />
      <div className="result-container">
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
      </div>
    </StyledEmptyNote>
  );
};

export default EmptyNote;
