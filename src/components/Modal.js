import React from "react";
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
`;

const Modal = ({ closeModalHandler, signInWithLink, setEmail }) => {
  return (
    <StyledModal>
      <div>
        <label htmlFor="email-signup">Enter your email *</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email-signup"
          type="email"
        />
        <Button
          onClick={signInWithLink}
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
    </StyledModal>
  );
};

export default Modal;
