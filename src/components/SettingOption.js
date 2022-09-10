import React, { useState } from "react";

const SettingOption = ({
  name,
  optionText,
  choices,
  defaultChoice,
  updateSetting,
}) => {
  const [currentSetting, setCurrentSetting] = useState(defaultChoice);

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
