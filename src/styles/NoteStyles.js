import styled from "styled-components";

const StyledScribbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledSearchBar = styled.div`
  background-color: var(--dark-grey);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;
  border-bottom: 1px solid var(--light-grey);
  border-top: 1px solid var(--light-grey);

  div {
    display: flex;
    align-items: center;
  }

  span {
    padding: 0 1rem;
  }

  h3 {
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 1px;
  }

  .show-results {
    align-self: center;
    padding: 0rem 0.5rem;
    cursor: pointer;
    text-align: center;

    &:hover {
      color: var(--light-grey);
    }

    @media screen and (max-width: 800px) {
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
`;

const StyledNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-height: 100%;
  min-width: 100%; */
  flex-grow: 100;
  cursor: auto;
  position: relative;
  /* background-color: var(--nav-color); */
`;

export { StyledScribbleContainer, StyledSearchBar, StyledNoteContainer };
