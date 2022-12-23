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

  const TESTHIGHLIGHT = (choice) => {
    return String(currentSetting) === String(choice)
      ? "highlighted-setting"
      : "";
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
              className={TESTHIGHLIGHT(choice)}
              onClick={changeOption}
            >
              {isNaN(choice) ? choice : choice / 1000}
            </button>
          ))}
      </div>
    </div>
  );
};

export default SettingOption;
