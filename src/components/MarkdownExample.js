import React from "react";
import styled from "styled-components";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

const ExampleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 2rem;

  textarea {
    border: 1px solid var(--light-grey);
    background-color: var(--background);
    color: var(--text-color);
    padding: 1rem;
    border-radius: 2px;
    resize: none;
    font-size: 1.2rem;
  }

  .md-rendered-container {
    margin: 0rem 3rem;
  }
`;

const MarkdownExample = ({ mdInput }) => {
  return (
    <ExampleContainer>
      <textarea>{mdInput}</textarea>
      <div className="md-rendered-container">
        <ReactMarkdown
          children={mdInput.replace(/\n/gi, "&nbsp; \n")}
          remarkPlugins={[[remarkGfm, { singleTilde: false }], remarkBreaks]}
        />
      </div>
    </ExampleContainer>
  );
};

export default MarkdownExample;
