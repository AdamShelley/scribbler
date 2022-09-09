import React, { useState } from "react";
import { useEffect } from "react";

const SettingOption = ({
  name,
  optionText,
  choices,
  defaultChoice,
  updateSetting,
}) => {
  const [currentSetting, setCurrentSetting] = useState(defaultChoice);

  // useEffect(() => {
  //   switchCurrentSetting(defaultChoice);
  // }, [defaultChoice]);

  // const switchCurrentSetting = (choice) => {
  //   switch (choice) {
  //     case "Yes":
  //       setCurrentSetting("Yes");
  //       break;
  //     case "No":
  //       setCurrentSetting("No");
  //       break;
  //     case "Newest":
  //       setCurrentSetting("Newest");
  //       break;
  //     case "Oldest":
  //       setCurrentSetting("Oldest");
  //       break;
  //     case "A-Z":
  //       setCurrentSetting("A-Z");
  //       break;
  //     case "Z-A":
  //       setCurrentSetting("Z-A");
  //       break;
  //     default:
  //       setCurrentSetting("No");
  //       break;
  //   }
  // };

  const changeOption = (e) => {
    if (currentSetting !== e.target.value) {
      setCurrentSetting(e.target.value);
      sendUpdate(e.target.value);
    }
  };

  const sendUpdate = (newValue) => {
    updateSetting({
      [name]: newValue,
    });
  };

  return (
    <div className="option">
      <h5>{optionText}</h5>
      <div className="option-choices">
        {choices &&
          choices.map((choice, index) => (
            <button
              value={choice}
              key={choice + index}
              className={currentSetting === choice ? "highlighted-setting" : ""}
              onClick={changeOption}
            >
              {choice}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SettingOption;
