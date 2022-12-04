import React, { useState } from "react";

import Onboarder from "./Onboarder";

import { OnboardingSteps } from "./OnboardingData";

const OnboarderStep = (props) => {
  const [showOnboarder, setShowOnboarder] = useState(true);
  const [showFinish, setShowFinish] = useState(false);

  //   const prevPage = () => {
  //     setStep((prev) => (prev > 0 ? prev - 1 : 0));
  //   };

  //   const nextPage = () => {
  //     if (currentStep === OnboardingSteps.length - 1) {
  //       setShowFinish(true);
  //     } else {
  //       setStep((prev) => prev + 1);
  //     }
  //   };

  const finishOnboarding = () => {
    setShowOnboarder(false);
  };

  console.log(props);

  return (
    <>
      <Onboarder
        isOpen={showOnboarder}
        handleClose={() => setShowOnboarder(false)}
        currentStep={props.step}
        stepData={OnboardingSteps[props.step]}
        finishOnboarding={finishOnboarding}
        showFinish={showFinish}
      />
    </>
  );
};

export default OnboarderStep;
