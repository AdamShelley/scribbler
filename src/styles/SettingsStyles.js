import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 0 5rem;
  padding-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100vh;

  .settings-container {
    padding: 1rem;
    /* background-color: #1e293a; */
    background-color: var(--nav-color);
    margin-top: 2rem;
    border-radius: 4px;
    border: 1px solid var(--dark-grey);

    h2 {
      margin-bottom: 2rem;
    }

    .option {
      padding: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-color);

      h5 {
        font-size: 0.9rem;
        font-weight: 500;
        letter-spacing: 0.5px;
      }

      .option-choices {
        margin-left: 2rem;
        display: flex;

        > button {
          cursor: pointer;
          border: 2px solid var(--light-grey);
          background-color: var(--background);
          color: inherit;
          font-size: 1rem;
          padding: 1rem;
          margin: 0 0.5rem;
          font-weight: 900;
          border-radius: 3px;
          min-width: 5rem;
          transition: all 0.1s ease-in;

          &:hover {
            border: 2px solid var(--text-color);
          }
        }

        .highlighted-setting {
          border: 2px solid var(--text-color);
        }
      }
    }
  }

  .profile {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    width: 40%;

    .button-container {
      margin-top: 3rem;
      border-top: 1px solid var(--text-color);
    }

    .profile-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 2rem;

      label {
        font-size: 0.9rem;
      }

      input {
        margin-left: 1rem;
        padding: 0.5rem;
        width: 60%;
      }
    }
  }
`;
