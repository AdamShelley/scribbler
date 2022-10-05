import React, { useEffect } from "react";
import { StyledContainer } from "../styles/SettingsStyles";
import { useAuth } from "../utils/auth";
import Button from "../styles/Button";
import { exportTxtFile } from "../utils/exportJSON";

const Account = ({ setNavTitle }) => {
  const auth = useAuth();

  useEffect(() => {
    setNavTitle("");
  }, [setNavTitle]);

  return (
    <StyledContainer className="page-container">
      <h2>Profile</h2>
      <div className="settings-container profile">
        <div className="profile-option">
          <label htmlFor="email-address">Email Address</label>
          <p>{auth?.user?.email}</p>
        </div>
        <div className="button-container">
          <div className="profile-option">
            <label htmlFor="export">Export JSON data to .txt file</label>
            <Button
              value="download"
              name="export"
              padding="1rem"
              minWidth="10rem"
              fontSize=".9rem"
              style={{ fontWeight: 900 }}
              onClick={exportTxtFile}
            >
              Export
            </Button>
          </div>
          <div className="profile-option">
            <label htmlFor="delete-data">Delete all scribbles</label>
            <Button
              name="delete-data"
              padding="1rem"
              minWidth="10rem"
              style={{ fontWeight: 900 }}
              fontSize=".9rem"
              onClick={() => {}}
            >
              Delete
            </Button>
          </div>
          <div className="profile-option">
            <label htmlFor="delete-profile">
              Delete all data and profile <span>(This cannot be undone)</span>
            </label>
            <Button
              name="delete-profile"
              padding="1rem"
              minWidth="10rem"
              fontSize=".9rem"
              style={{ fontWeight: 900 }}
              onClick={() => {}}
            >
              Delete my profile
            </Button>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Account;
