import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 25vw;
  border-right: 1px solid var(--light-grey);
  background-color: #1b1b1b;
  max-height: 80vh;

  div {
    background-color: var(--dark-grey);
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;

    h3 {
      font-weight: 400;
      font-size: 1rem;

      letter-spacing: 1px;
    }

    span {
      font-size: 1rem;
      font-weight: 900;
      transform: scale(1);
      cursor: pointer;
      transition: all 0.3s ease-in;

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  ul {
    margin-top: 1rem;
    padding: 0 2rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    max-height: 100%;
    overflow-x: scroll;

    li {
      margin-top: 1rem;
      height: 2.5rem;
      cursor: pointer;
      border-left: 1px solid transparent;
      padding-left: 0.3rem;
      transition: all 0.2s ease-in-out;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 0.5rem;
      border-radius: 5px;
      transition: all 0.3s ease-out;

      &:hover {
        border-left: 1px solid var(--text-color);
      }
    }

    h3 {
      font-size: 0.9rem;
      font-weight: 500;
    }

    button {
      padding: 0.4rem 0.8rem;
      background-color: var(--background);
      border: 1px solid var(--background);
      color: var(--text-color);
      font-size: 0.8rem;
      font-weight: 500;
      font-family: inherit;
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.1s ease-in;

      &:hover {
        border: 1px solid var(--text-color);
      }
    }

    /* span {
      border: 1px solid white;
      font-size: 0.8rem;
      border-radius: 2px;
      padding: 0.3rem;

      &:hover {
        color: var(--dark-grey);
        background-color: var(--text-color);
      }
    } */

    .selected-scribble {
      background-color: var(--light-grey);
      border-radius: 5px;
      padding: 0.5rem;
    }
  }
`;

const Sidebar = ({
  scribbles,
  selectedScribble,
  setSelectedScribble,
  scribbleTitle,
  createNewScribble,
}) => {
  const [showSave, setShowSave] = useState(false);

  let showSaveTimeout;

  useEffect(() => {
    setShowSave(false);
    clearTimeout(showSaveTimeout);
  }, [selectedScribble, showSaveTimeout]);

  if (selectedScribble) {
    clearTimeout(showSaveTimeout);

    showSaveTimeout = setTimeout(() => {
      setShowSave(true);
    }, 1000);
  }

  const createBlankScribble = () => {
    createNewScribble();
  };

  return (
    <StyledSidebar>
      <div>
        <h3>Scribbles</h3>
        <span onClick={createBlankScribble}>+</span>
      </div>

      <ul>
        {scribbles ? (
          scribbles.map((scribble) => (
            <li
              key={scribble.id || "temp"}
              onClick={(e) => setSelectedScribble(scribble)}
              className={`${
                selectedScribble.title === scribble.title
                  ? "selected-scribble"
                  : ""
              }`}
            >
              <h3>{scribble.title}</h3>
            </li>
          ))
        ) : (
          <li>
            <h3>Unsaved Scribble...</h3>
          </li>
        )}
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
