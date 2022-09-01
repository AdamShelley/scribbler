import React from "react";
import SettingOption from "../components/SettingOption";

import { StyledContainer } from "../styles/SettingsStyles";
import { useAuth } from "../utils/auth";

const Settings = () => {
  const auth = useAuth();

  const saveSettings = (updatedSetting) => {
    console.log("Updating settings");
    // Send the update to the database
  };

  return (
    <StyledContainer>
      <div className="page-container">
        <h2>Settings</h2>
        <div className="settings-container settings">
          <SettingOption
            name="expandScribbles"
            optionText="Expand Scribble section on load"
            choices={["Yes", "No"]}
            defaultChoice={true}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="expandArchive"
            optionText="Expand archive section on load"
            choices={["Yes", "No"]}
            defaultChoice={true}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="expandBin"
            optionText="Expand Bin section  on load"
            choices={["Yes", "No"]}
            defaultChoice={false}
            updateSetting={saveSettings}
          />
          <SettingOption
            name="showMD"
            optionText="Hide markdown preview"
            choices={["Yes", "No"]}
            defaultChoice={false}
            updateSetting={saveSettings}
          />
        </div>
      </div>
    </StyledContainer>
  );
};

export default Settings;
