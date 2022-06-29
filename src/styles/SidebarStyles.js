import styled from "styled-components";

export const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 25vw;
  border-right: 1px solid var(--light-grey);
  background-color: #1b1b1b;
  max-height: 90vh;

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
        border-bottom: 1px solid var(--text-color);
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

  .archive-button {
    margin: 0 1rem;
    margin-top: 5rem;
    background-color: var(--dark-grey);
    color: inherit;
    padding: 0.8rem 1rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 400;
    font-family: inherit;
    border: 1px solid var(--light-grey);
    display: flex;
    justify-content: space-between;

    &:hover {
      border: 1px solid var(--text-color);
    }
  }
`;
