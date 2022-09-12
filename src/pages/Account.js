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
          <label for="email-address">Email Address</label>
          <input
            name="email-address"
            type="email"
            placeholder={auth.user?.email}
          />
        </div>
        <div className="button-container">
          <div className="profile-option">
            <Button padding="1rem" onClick={() => {}}>
              Export data (JSON)
            </Button>
          </div>
          <div className="profile-option">
            <Button padding="1rem" onClick={() => {}}>
              Delete All data
            </Button>
          </div>
          <div className="profile-option">
            <Button padding="1rem" onClick={() => {}}>
              Delete my profile
            </Button>
          </div>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Account;
