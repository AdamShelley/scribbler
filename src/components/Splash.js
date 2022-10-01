import React from "react";
import styled from "styled-components";
import NoteContainer from "./NoteContainer";
import hero1 from "../img/hero1.png";

const StyledSplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  /* background-color: var(--text-color);
  color: var(--background); */

  h2 {
    font-size: 2rem;
  }
  p {
    margin-top: 0.5rem;
  }

  div {
    margin-top: 5rem;
    border: 1px solid var(--light-grey);
    border-radius: 2px;
    width: 50%;
    max-width: 50%;
    height: 30rem;
    background-color: var(--light-grey);
    background-image: url(hero1);

    img {
      height: 100%;
      width: 100%;
    }
  }
`;

const Splash = () => {
  return (
    <StyledSplashContainer>
      <h2>Welcome to Scribbler</h2>
      <p>Simplicity unlocked</p>

      <div>
        <img src={hero1} alt="Scribbler main page"></img>
      </div>

      <div className="features">
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
      <div className="features">
        <ul>
          <li>Feature 1</li>
          <li>Feature 2</li>
          <li>Feature 3</li>
        </ul>
      </div>
    </StyledSplashContainer>
  );
};

export default Splash;
