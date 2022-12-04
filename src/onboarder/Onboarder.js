import React from "react";
import styled from "styled-components";
import OnboardPortal from "./OnboardPortal";

import Button from "../styles/Button";

const OnboarderContainer = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center; // Can be altered as an option
  justify-content: center; // Can be an option later
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  /* z-index: 997; */
  /* padding: 40px 20px 20px; */

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    border: 2px solid var(--light-grey);
    border-radius: 2px;
    padding: 2rem;
    background-color: var(--background);
    min-width: 25%;
    min-height: 40%;

    z-index: 1000;

    h2 {
      font-size: 2rem;
      padding: 1rem 0;
    }

    p {
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.8;
    }

    div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

const Onboarder = ({ isOpen, finishOnboarding, stepData, showFinish }) => {
  if (!isOpen) return null;

  return (
    <OnboardPortal wrapperId="onboard-wrapper">
      <OnboarderContainer>
        <section>
          <h2>{stepData.title}</h2>
          <p>{stepData.description}</p>

          <div>
            <Button
              margin="1rem"
              padding=".5rem"
              minWidth={"5rem "}
              onClick={() => {}}
            >
              Previous step
            </Button>

            {!showFinish ? (
              <Button
                margin=".5rem"
                padding=".5rem"
                minWidth={"5rem "}
                onClick={() => {}}
              >
                Next step
              </Button>
            ) : (
              <Button
                margin="1rem"
                padding=".5rem"
                minWidth={"5rem "}
                onClick={finishOnboarding}
              >
                Finish
              </Button>
            )}
          </div>
        </section>
      </OnboarderContainer>
    </OnboardPortal>
  );
};

export default Onboarder;
