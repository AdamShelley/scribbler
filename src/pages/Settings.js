import React, { useEffect } from "react";
import SettingOption from "../components/SettingOption";

import { StyledContainer } from "../styles/SettingsStyles";
import { useAuth } from "../utils/auth";
import { updateSettings } from "../utils/db";

const Settings = ({ settings, setSettings, setNavTitle }) => {
  const auth = useAuth();

  const saveSettings = (updatedSetting) => {
    console.log("Updating settings:");
    // Send the update to the database
    updateSettings(auth.user.uid, updatedSetting);
    setSettings((previousSettings) => ({
      ...previousSettings,
      ...updatedSetting,
    }));
  };

  useEffect(() => {
    setNavTitle("");
  }, [setNavTitle]);

  return (
    <StyledContainer>
      {settings && (
        <div className="page-container">
          <h2>Settings</h2>
          <div className="settings-container settings">
            <SettingOption
              name="expandScribbles"
              optionText="Expand Scribble section on load"
              choices={["Yes", "No"]}
              defaultChoice={settings.expandScribbles}
              updateSetting={saveSettings}
            />
            <SettingOption
              name="expandArchive"
              optionText="Expand archive section on load"
              choices={["Yes", "No"]}
              defaultChoice={settings.expandArchive}
              updateSetting={saveSettings}
            />
            <SettingOption
              name="expandBin"
              optionText="Expand Bin section  on load"
              choices={["Yes", "No"]}
              defaultChoice={settings.expandBin}
              updateSetting={saveSettings}
            />
            <SettingOption
              name="showMD"
              optionText="Hide markdown preview"
              choices={["Yes", "No"]}
              defaultChoice={settings.showMD}
              updateSetting={saveSettings}
            />
          </div>
        </div>
      )}
    </StyledContainer>
  );
};

export default Settings;
