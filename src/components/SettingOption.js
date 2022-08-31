import React, { useState } from "react";

const SettingOption = ({
  name,
  optionText,
  choices,
  defaultChoice,
  updateSetting,
}) => {
  const [currentSetting, setCurrentSetting] = useState(
    defaultChoice ? "Yes" : "No"
  );

  const changeOption = (e) => {
    setCurrentSetting(e.target.value);
    updateSetting({
      [name]: e.target.value,
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
