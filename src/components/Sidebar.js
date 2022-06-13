import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 25vw;
  border-right: 1px solid var(--light-grey);

  div {
    background-color: var(--dark-grey);
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;

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

    span {
      border: 1px solid white;
      font-size: 0.8rem;
      border-radius: 2px;
      padding: 0.3rem;

      &:hover {
        color: var(--dark-grey);
        background-color: var(--text-color);
      }
    }

    .selected-scribble {
      background-color: var(--light-grey);
      border-radius: 5px;
      padding: 0.5rem;
    }
  }
`;

const Sidebar = ({ scribbles, selectedScribble, setSelectedScribble }) => {
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
    }, 10000);
  }

  return (
    <StyledSidebar>
      <div>
        <h3>Scribbles</h3>
        <span>+</span>
      </div>

      <ul>
        {scribbles ? (
          scribbles.map((note) => (
            <li
              key={note.id}
              onClick={(e) => setSelectedScribble(note)}
              className={`${
                selectedScribble.title === note.title ? "selected-scribble" : ""
              }`}
            >
              <h3>{note.title}</h3>
              {selectedScribble.id === note.id && showSave && <span>Save</span>}
            </li>
          ))
        ) : (
          <li>
            <h3>Unsaved Scribble...</h3>
            <span>Save</span>
          </li>
        )}
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
