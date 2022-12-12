import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useOnboarderContainer } from "../hooks/useOnboarderContainer";
import { OnboardContext } from "../OnboardingProvider";
import OnboardOverlay from "./OnboardOverlay";
import Button from "../styles/Button";

const OnboarderContainer = styled.div`
  /* position: fixed; */
  /* inset: 0; */
  display: flex;
  flex-direction: column;
  align-items: center; // Can be altered as an option
  justify-content: center; // Can be an option later
  transition: all 0.3s ease-in-out;
  overflow: hidden;

  z-index: 60;

  section {
    position: absolute;
    top: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    border: 3px solid var(--text-color);
    border-radius: 5px;
    padding: 2rem;
    background-color: var(--background);
    width: 30%;
    height: 40%;

    box-shadow: 0px 2px 5px rgba(255, 255, 255, 0.1);

    h2 {
      font-size: 2rem;
      padding: 1rem 0;
    }

    p {
      font-size: 1.5rem;
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

  @media screen and (max-width: 800px) {
    section {
      width: 75%;
      height: 25%;
      padding: 2rem;
      border: 1px solid var(--text-color);
      justify-content: flex-start;

      h2 {
        font-size: 1rem;
        padding: 0.5rem 0;
      }

      p {
        margin-top: 1rem;
        font-size: 0.8rem;
      }

      button {
        margin-top: 2rem;
        padding: 0.5rem;
      }
    }
  }
`;

const OnboardingContainer = ({
  stepData,
  showOnboarding,
  finishOnboarding,
}) => {
  const { containerRef } = useOnboarderContainer();
  const [openModal, setOpenModal] = useState(showOnboarding);

  const [stepContext, setNextStep] = useContext(OnboardContext);

  const nextStep = () => {
    setNextStep(stepContext + 1);
  };

  const previousStep = () => {
    setNextStep(stepContext - 1);
  };

  const finishOnboardingHandler = () => {
    setOpenModal(false);
    setNextStep(0);
    finishOnboarding();
  };

  return (
    <>
      {openModal && (
        <>
          <OnboarderContainer ref={containerRef}>
            <section>
              <h2>{stepData[stepContext]?.title}</h2>
              <p>{stepData[stepContext]?.description}</p>

              <div>
                {stepContext > 0 && (
                  <Button minWidth="50%" padding="1rem" onClick={previousStep}>
                    Previous step
                  </Button>
                )}

                {stepData.length - 1 !== stepContext ? (
                  <Button padding="1rem" minWidth="50%" onClick={nextStep}>
                    Next step
                  </Button>
                ) : (
                  <Button
                    minWidth="50%"
                    padding="1rem"
                    onClick={finishOnboardingHandler}
                  >
                    Finish
                  </Button>
                )}
              </div>
            </section>
          </OnboarderContainer>
          <OnboardOverlay />
        </>
      )}
    </>
  );
};

export default OnboardingContainer;
