import React from "react";
import SettingOption from "../components/SettingOption";

import { StyledContainer } from "../styles/SettingsStyles";

const Settings = () => {
  const saveSettings = (updatedSetting) => {
    console.log(updatedSetting);
  };

  return (
    <StyledContainer>
      <div className="page-container">
        <h2>Settings</h2>
        <div className="settings-container settings">
          <SettingOption
            name="expandScribbles"
            optionText="Expand all scribble containers on load"
            choices={["Yes", "No"]}
            defaultChoice={"No"}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="hideMD"
            optionText="Hide MD preview"
            choices={["Yes", "No"]}
            defaultChoice={"Yes"}
            updateSetting={saveSettings}
          />
        </div>
      </div>
    </StyledContainer>
  );
};

export default Settings;
