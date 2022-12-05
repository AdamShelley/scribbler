import OnboardPortal from "../OnboardPortal";
import React, { useState } from "react";
import styled from "styled-components";
import { useOnboarderContainer } from "../hooks/useOnboarderContainer";
import { useShowHighlight } from "../hooks/useShowHighlight";

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

const OnboardingContainer = ({ stepData, showOnboarding = true }) => {
  const { containerRef } = useOnboarderContainer();
  const { saveStep } = useShowHighlight();
  const [openModal, setOpenModal] = useState(showOnboarding);

  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
    saveStep(currentStep + 1);
  };

  const previousStep = () => {
    setCurrentStep((prev) => prev - 1);
    saveStep(currentStep - 1);
  };

  return (
    <>
      {openModal && (
        <OnboardPortal wrapperId="onboarder-wrapper">
          <OnboarderContainer ref={containerRef}>
            <section>
              <h2>{stepData[currentStep].title}</h2>
              <p>{stepData[currentStep].description}</p>

              <div>
                {currentStep > 0 && (
                  <button onClick={previousStep}>Previous step</button>
                )}

                {stepData.length - 1 !== currentStep ? (
                  <button onClick={nextStep}>Next step</button>
                ) : (
                  <button onClick={() => setOpenModal(false)}>Finish</button>
                )}
              </div>
            </section>
          </OnboarderContainer>
        </OnboardPortal>
      )}
    </>
  );
};

export default OnboardingContainer;
