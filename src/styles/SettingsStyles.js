import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .settings-container {
    padding: 1rem;
    background-color: #1e293b;
    margin-top: 2rem;
    border-radius: 4px;

    h2 {
      margin-bottom: 2rem;
    }

    .option {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 1rem;

      .option-choices {
        margin-left: 5rem;

        > button {
          cursor: pointer;
          border: 2px solid var(--light-grey);
          background-color: inherit;
          color: inherit;
          font-size: 1rem;
          padding: 1rem;
          margin: 0 0.5rem;
          font-weight: 900;
          border-radius: 3px;
          width: 5rem;
        }

        .highlighted-setting {
          border: 2px solid var(--light-grey);
          background-color: var(--nav-color);
        }
      }
    }
  }
`;
