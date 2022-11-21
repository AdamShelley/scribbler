import React, { useState } from "react";
import styled from "styled-components";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MobileTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.4rem 1rem;
  background-color: var(--nav-color);
  border-top: 1px solid var(--dark-grey);
  border-bottom: 2px solid var(--light-grey);

  input {
    font-weight: 400;
    font-size: 1rem;
    font-family: inherit;
    border: none;
    background-color: inherit;
    color: inherit;
    outline: none;
    text-align: left;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease-in;
    line-height: 2;
    padding: 0.2rem 0.5rem;

    &:focus {
      line-height: 2;
      border-bottom: 1px solid var(--light-grey);
    }
  }

  > button {
    background-color: var(--background-color);
    border: none;
    cursor: pointer;

    svg {
      color: var(--text-color);
      font-size: 1.2rem;
      padding: 0.5rem;
      transform: scale(1);
      opacity: 1;
      transition: all 0.2s ease-in;

      &:hover {
        transform: scale(1.1);
        opacity: 0.9;
      }
    }
  }
`;

const MobileTitle = ({ navTitle, setNavTitle }) => {
  const [newTitle, setNewTitle] = useState(navTitle);
  const [showTick, setShowTick] = useState(false);

  const updateTitleHandler = () => {
    setNavTitle(newTitle);
    setShowTick(false);
  };

  return (
    <MobileTitleContainer>
      {navTitle && (
        <input
          type="text"
          value={newTitle}
          // size={newTitle?.length}
          onChange={(e) => {
            setShowTick(true);
            setNewTitle(e.target.value);
          }}
        />
      )}
      {showTick && (
        <button onClick={updateTitleHandler}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      )}
    </MobileTitleContainer>
  );
};

export default MobileTitle;
