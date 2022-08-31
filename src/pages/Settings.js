import React from "react";
import SettingOption from "../components/SettingOption";

import { StyledContainer } from "../styles/SettingsStyles";

// Pull settings from database

const Settings = ({ options }) => {
  const saveSettings = (updatedSetting) => {
    console.log(updatedSetting);
  };

  console.log(options);

  return (
    <StyledContainer>
      <div className="page-container">
        <h2>Settings</h2>
        <div className="settings-container settings">
          <SettingOption
            name="expandScribbles"
            optionText="Expand Scribble section on load"
            choices={["Yes", "No"]}
            defaultChoice={options.expandScribbles}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="expandArchive"
            optionText="Expand archive section on load"
            choices={["Yes", "No"]}
            defaultChoice={options.expandArchive}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="expandBin"
            optionText="Expand Bin section  on load"
            choices={["Yes", "No"]}
            defaultChoice={options.expandBin}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="showMD"
            optionText="Hide markdown preview"
            choices={["Yes", "No"]}
            defaultChoice={options.showMD}
            updateSetting={saveSettings}
          />
        </div>
      </div>
    </StyledContainer>
  );
};

export default Settings;
