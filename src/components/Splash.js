import React from "react";

import styled from "styled-components";
import hero1 from "../img/hero1.png";

const StyledSplashContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 2rem;
  padding-top: 5rem;
  overflow: scroll;

  h2 {
    font-size: 2rem;
  }
  p {
    margin-top: 0.5rem;
  }

  div {
    margin-top: 5rem;
    max-width: 50%;
    max-width: 50%;
    height: 30rem;
  }

  .img-container {
    border: 1px solid var(--dark-grey);
    border-radius: 2px;
    box-shadow: 2px 2px 5px rgba(255, 255, 255, 0.1);

    img {
      /* height: 100%; */
      width: 100%;
      object-fit: cover;
    }
  }

  .features {
    padding: 1rem;

    ul {
      list-style: none;

      li {
        margin-top: 3rem;
      }
    }
  }

  @media screen and (max-width: 800px) {
    white-space: nowrap;
    padding-bottom: 10rem;
    overflow-x: hidden;

    div {
      max-width: 100%;
      margin-top: 3rem;
    }

    .img-container {
      width: 100%;
      object-fit: cover;
    }
  }
`;

const Splash = () => {
  return (
    <StyledSplashContainer>
      <h2>Welcome to Scribbler</h2>
      <p>Simplicity unlocked</p>

      <div className="img-container">
        <img src={hero1} alt="Scribbler main page"></img>
      </div>

      <div className="features">
        <ul>
          <li>
            <h4>Don't forget again</h4>
            <p>Take notes, study, make lists</p>
          </li>
          <li>
            <h4>Easy to use</h4>
            <p>No crazy gimmicks, just markdown text</p>
          </li>

          <li>
            <h4>Free to use</h4>
            <p>No cost, this is created for fun</p>
          </li>
        </ul>
      </div>
    </StyledSplashContainer>
  );
};

export default Splash;
