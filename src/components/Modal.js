import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  background-color: var(--background);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Modal = ({ closeModalHandler, signInWithLink, setEmail }) => {
  return (
    <StyledModal>
      <div>
        <span onClick={closeModalHandler}>X</span>
        <label htmlFor="email-signup">Enter your email</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          name="email-signup"
          type="email"
        />
        <button onClick={signInWithLink}>Sign-in</button>
      </div>
    </StyledModal>
  );
};

export default Modal;
