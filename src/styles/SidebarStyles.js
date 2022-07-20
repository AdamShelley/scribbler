import styled from "styled-components";

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 25vw;
  border-right: 1px solid var(--light-grey);
  background-color: #1b1b1b;
  max-height: 90vh;
  position: relative;

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

    div {
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      svg {
        margin: 0 0.5rem;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
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
    padding: 0 2rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    max-height: 100%;
    /* overflow-x: scroll; */

    li {
      margin: 0.5rem 0;
      height: 2rem;
      cursor: pointer;
      border: 1px solid transparent;
      border-left: 1px solid var(--light-grey);
      transition: all 0.2s ease-in-out;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      padding: 1rem 0;
      padding-left: 1rem;
      border-radius: 5px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      transition: all 0.3s ease-out;

      &:hover {
        border-left: 1px solid var(--text-color);
      }

      div {
        width: 100%;
      }

      .save-dot {
        background-color: var(--light-grey);
        max-width: 8px;
        max-height: 8px;
        border-radius: 100%;
        padding: 0;
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
        border-bottom: 1px solid var(--text-color);
      }
    }

    .selected-scribble {
      border: 1px solid var(--dark-grey);
      border-left: 1px solid var(--text-color);
      background-color: var(--background);
      border-radius: 5px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      padding: 1rem 1.5rem;

      &:hover {
        border: 1px solid var(--light-grey);
      }

      h3 {
      }
    }
  }

  button:first-of-type {
    margin-top: 0.3rem;
    border-top: 1px solid var(--light-grey);
  }

  .archive-button {
    margin: 0rem;
    background-color: var(--dark-grey);
    color: var(--text-color);
    padding: 0rem 1rem;
    cursor: pointer;
    font-family: inherit;

    /* border: 1px solid var(--light-grey); */
    border: 1px solid transparent;
    /* border-bottom: 1px solid var(--light-grey); */
    /* border-top: 1px solid var(--light-grey); */
    border-top: 1px solid var(--background);
    border-bottom: 1px solid var(--background);
    display: flex;
    justify-content: space-between;
    /* border-radius: 3px; */
    letter-spacing: 1px;

    &:hover {
      border: 1px solid var(--text-color);
    }

    &:hover .bin-container {
      opacity: 1;
      transition: all 0.2s ease-in;
      cursor: pointer;
    }

    div {
      padding-left: 0;

      h4 {
        font-size: 0.9rem;
        font-weight: 500;
        margin-left: 0.5rem;

        &:hover {
          transform: scale(1);
        }
      }
    }

    .bin-container {
      opacity: 0;
      color: var(--light-grey);
      position: absolute;

      .bin-icon {
        margin-left: 0.5rem;
      }

      &:hover {
        color: var(--text-color);
      }
    }
  }
`;
