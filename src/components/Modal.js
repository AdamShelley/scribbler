import React, { useState } from "react";
import styled from "styled-components";
import Button from "../styles/Button";

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  position: absolute;
  right: 0;

  div {
    /* margin-right: 0.5rem; */
    z-index: 99;
    background: var(--nav-color);
    border-radius: 2px;
    padding: 1rem;
  }

  label {
    white-space: nowrap;
    margin-right: 1rem;
    font-weight: 500;

    span {
      cursor: pointer;
    }
  }

  .auth-warning {
    position: absolute;
    top: 100%;
    padding: 1rem;
  }

  input {
    padding: 0.3rem;
    font-size: 1rem;
    border-radius: 2px;
    border: 1px solid var(--light-grey);
    background: var(--background);
    color: var(--text-color);
    font-weight: 400;
    font-size: 1rem;
    font-family: inherit;
    width: 25rem;
  }

  .check-email-display {
    p {
      margin-right: 1rem;
      white-space: nowrap;
    }
  }
`;

const Modal = ({ closeModalHandler, signInWithLink, setEmail }) => {
  const [showAuthWarning, setShowAuthWarning] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  return (
    <StyledModal>
      {!emailSent && (
        <div>
          <label htmlFor="email-signup">
            Enter your email{" "}
            <span
              onMouseEnter={() => setShowAuthWarning(true)}
              onMouseLeave={() =>
                setTimeout(() => setShowAuthWarning(false), [3000])
              }
            >
              *
            </span>
          </label>
          {showAuthWarning && (
            <p className="auth-warning">
              [Authentication is automated using Google. Scribbler does not
              store any passwords.]
            </p>
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            name="email-signup"
            type="email"
          />
          <Button
            onClick={() => {
              signInWithLink();
              setEmailSent(true);
            }}
            maxWidth="15%"
            minWidth="10%"
            style={{ whiteSpace: "nowrap", padding: ".5rem" }}
          >
            Sign-in
          </Button>
          <Button
            onClick={closeModalHandler}
            maxWidth="15%"
            minWidth="10%"
            style={{ whiteSpace: "nowrap", padding: ".5rem" }}
          >
            Cancel
          </Button>
        </div>
      )}

      {emailSent && (
        <div className="check-email-display">
          <p>Please check your email for a sign in link.</p>
          <Button
            maxWidth="15%"
            minWidth="20%"
            margin="0 2rem"
            style={{
              whiteSpace: "nowrap",
              padding: ".5rem",
            }}
            onClick={() => setEmailSent(false)}
          >
            Go back
          </Button>
        </div>
      )}
    </StyledModal>
  );
};

export default Modal;
