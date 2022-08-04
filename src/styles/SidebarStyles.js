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
  overflow-x: scroll;
  scroll-behavior: smooth;

  div {
    background-color: var(--dark-grey);
    padding: 0.5rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.5rem;
    border-bottom: 1px solid var(--light-grey);
    border-top: 1px solid var(--light-grey);

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
      white-space: nowrap;
      overflow-y: hidden;
      max-width: 100%;
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
      /* background-color: var(--background); */
      overflow-y: hidden;
      border-radius: 5px;
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      padding: 1rem 1.5rem;

      &:hover {
        border: 1px solid var(--light-grey);
      }

      h3 {
        white-space: nowrap;
        overflow-y: hidden;
      }
    }
  }

  button:first-of-type {
    border-top: 1px solid transparent;
  }

  .archive-button {
    margin: 0rem;
    background-color: var(--background);
    color: var(--text-color);
    padding: 0rem 1rem;
    cursor: pointer;
    font-family: inherit;
    border: 1px solid transparent;
    display: flex;
    justify-content: space-between;
    letter-spacing: 1px;
    transition: all 0.1s ease-in;
    border-bottom: 1px solid var(--dark-grey);
    border-top: 1px solid var(--dark-grey);

    &:hover {
      border: 1px solid var(--light-grey);
    }

    &:hover .bin-container {
      opacity: 1;
      transition: all 0.2s ease-in;
      cursor: pointer;
    }

    div {
      padding-left: 0;
      /* background-color: var(--dark-grey); */
      background-color: inherit;
      border: none;

      h4 {
        font-size: 0.8rem;
        font-weight: 500;
        margin-left: 0.5rem;

        &:hover {
          transform: scale(1);
        }
      }
    }
  }

  .delete-all-container {
    width: 50%;
    height: 2rem;
    align-self: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid var(--light-grey);
    background-color: var(--background);
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      border: none;
      background-color: transparent;
      color: var(--text-color);
      font-weight: 600;
      letter-spacing: 0.5px;
      cursor: pointer;

      &:hover {
        color: #ddd;
      }
    }

    &:hover {
    }
  }
`;
