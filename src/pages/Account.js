import React, { useEffect } from "react";
import { StyledContainer } from "../styles/SettingsStyles";
import { useAuth } from "../utils/auth";
import Button from "../styles/Button";

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
          <input
            name="email-address"
            type="email"
            placeholder={auth.user?.email}
          />
        </div>
        <div className="button-container">
          <div className="profile-option">
            <label htmlFor="export">Export JSON data to .txt file</label>
            <Button
              name="export"
              padding="1rem"
              minWidth="10rem"
              onClick={() => {}}
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
              onClick={() => {}}
            >
              Delete
            </Button>
          </div>
          <div className="profile-option">
            <label htmlFor="delete-profile">
              Delete all data and profile (There is no going back)
            </label>
            <Button
              name="delete-profile"
              padding="1rem"
              minWidth="10rem"
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
