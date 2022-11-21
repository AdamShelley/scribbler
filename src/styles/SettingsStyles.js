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
    width: 50%;
    position: relative;

    .button-container {
      margin-top: 3rem;
      border-top: 1px solid var(--text-color);
      width: 100%;
    }

    .profile-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      margin-top: 2rem;
      position: relative;

      label {
        font-size: 0.9rem;
        font-weight: 700;

        span {
          margin-left: 0.2rem;
          color: rgba(255, 255, 255, 0.55);
        }
      }

      input {
        margin-left: 1rem;
        padding: 0.5rem;
        width: 60%;
      }

      .confirm-modal {
        position: absolute;
        right: -35%;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 1rem;
          font-size: 2rem;
          color: var(--text-color);
        }
      }
    }
  }

  @media screen and (max-width: 800px) {
    padding: 1rem;
    min-height: 120vh;

    h2 {
      padding: 1rem;
      text-align: center;
    }

    .settings-container {
      .option {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;

        h5 {
          margin-bottom: 1rem;
          font-size: 1rem;
          font-weight: 500;
        }

        .option-choices {
          flex-wrap: wrap;
          width: 100%;
          margin-left: 0;

          button {
            padding: 0.5rem;
            margin: 0.8rem;
            font-weight: 600;
            border: 1px solid var(--dark-grey);
          }

          .highlighted-setting {
            border: 1px solid var(--text-color);
          }
        }
      }
    }

    .profile {
      width: 100%;
    }
  }
`;
