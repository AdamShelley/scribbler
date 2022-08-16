import React, { useEffect } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  .settings-container {
    padding: 1rem;
    background-color: #1e293b;
    margin: 1rem;

    h2 {
      margin-bottom: 2rem;
    }

    .option {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .option-choices {
        margin-left: 1rem;

        span {
          cursor: pointer;
          border: 1px solid var(--light-grey);
          padding: 0.5rem;
          margin: 0 0.5rem;
        }
      }
    }
  }
`;

const Account = ({ setShowNav }) => {
  return (
    <StyledContainer className="page-container">
      <div className="settings-container settings">
        <h2>Settings</h2>
        <div className="option">
          <h5>Expand all scribble containers</h5>
          <div className="option-choices">
            <span>Yes</span>
            <span>No</span>
          </div>
        </div>
        <div className="option">
          <h5>Hide MD preview</h5>
          <div className="option-choices">
            <span>Yes</span>
            <span>No</span>
          </div>
        </div>
      </div>
      <div className="settings-container profile">
        <h2>Profile</h2>

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
