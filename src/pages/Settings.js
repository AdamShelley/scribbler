import React, { useEffect } from "react";
import SettingOption from "../components/SettingOption";

import { StyledContainer } from "../styles/SettingsStyles";
import { useAuth } from "../utils/auth";
import { storageSettings } from "../utils/storageSettings";

const Settings = ({ settings, setSettings, setNavTitle }) => {
  const auth = useAuth();

  const saveSettings = (updatedSetting) => {
    // Send the update to the database & update localstorage
    storageSettings(auth.user.uid, updatedSetting, settings, setSettings);
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
            <SettingOption
              name="scribbleOrder"
              optionText="Order of Scribbles on startup"
              choices={["Newest", "Oldest", "A-Z", "Z-A"]}
              defaultChoice={settings?.scribbleOrder}
              updateSetting={saveSettings}
            />
            <SettingOption
              name="autosave"
              optionText="Autosave Timing (s)"
              choices={["30000", "60000", "120000", "300000", "Never"]}
              defaultChoice={settings?.autosave || "30s"}
              updateSetting={saveSettings}
            />
          </div>
        </div>
      )}
    </StyledContainer>
  );
};

export default Settings;
