import React from "react";
import styled from "styled-components";
import MarkdownExample from "../components/MarkdownExample";

import { guideList } from "../utils/markdownList";

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 5rem;

  .guide-content-container {
    width: 50%;
    margin-top: 5rem;

    div h2 {
      font-size: 2rem;
      font-weight: 500;
      letter-spacing: 1px;
    }

    div p {
      margin-top: 2rem;
      line-height: 1.8;
      font-size: 1.1rem;
    }

    a {
      color: var(--text-color);
      text-decoration: none;
      opacity: 0.8;
      border-bottom: 1px solid var(--text-color);

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const Guide = () => {
  return (
    <GuideContainer>
      <div className="guide-content-container">
        <div>
          <h2>Markdown Guide</h2>
          <p>
            Scribbler uses the{" "}
            <a
              href="https://github.com/remarkjs/react-markdown"
              target="_blank"
              rel=" noopener noreferrer"
            >
              React Markdown
            </a>{" "}
            package to deliver markdown to the browser. Additionally it uses the{" "}
            <a
              href="https://github.com/remarkjs/remark-gfm"
              target="_blank"
              rel=" noopener noreferrer"
            >
              Remark GFM
            </a>{" "}
            Github plugin to support other functionality such as strikethroughs.
          </p>
          <p>Below are some examples of how to use markdown</p>

          {guideList.map((md) => (
            <MarkdownExample mdInput={md} />
          ))}
        </div>
      </div>
    </GuideContainer>
  );
};

export default Guide;
