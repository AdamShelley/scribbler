import React from "react";
import { StyledContainer } from "../styles/SettingsStyles";

const Account = () => {
  return (
    <StyledContainer className="page-container">
      <h2>Profile</h2>
      <div className="settings-container profile">
        <div className="option">
          <h5>Email Address</h5>
          <input type="email" />
        </div>

        <div className="option">
          <h5>Delete my profile</h5>
        </div>
      </div>
    </StyledContainer>
  );
};

export default Account;
