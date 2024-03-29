import { updateSettings } from "./db";

export const storageSettings = (
  id,
  updatedSetting,
  currentSettings,
  setSettings
) => {
  if (updatedSetting.scribbleOrder) {
    sessionStorage.removeItem("scribbles");
    sessionStorage.removeItem("archived");
    sessionStorage.removeItem("deleted");
  }

  localStorage.removeItem("settings");
  updateSettings(id, updatedSetting);

  setSettings((settings) => ({
    ...settings,
    ...updatedSetting,
  }));

  const newCachedSettings = {
    ...currentSettings,
    ...updatedSetting,
  };

  localStorage.setItem("settings", JSON.stringify(newCachedSettings));
};
