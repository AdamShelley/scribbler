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
          choices.map((choice) => (
            <button
              value={choice}
              className={currentSetting === choice && "highlighted-setting"}
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
