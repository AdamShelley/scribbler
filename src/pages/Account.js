import React, { useEffect, useState } from "react";
import { StyledContainer } from "../styles/SettingsStyles";
import { useAuth } from "../utils/auth";
import Button from "../styles/Button";
import { exportTxtFile } from "../utils/exportJSON";
import { deleteAllScribbles, deleteAccount } from "../utils/db";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Account = ({ setNavTitle }) => {
  const [checkDeleteScribbles, setCheckDeleteScribbles] = useState(false);
  const [checkDeleteUser, setCheckDeleteUser] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setNavTitle("");
  }, [setNavTitle]);

  const deleteAllFirebaseDocs = () => {
    deleteAllScribbles(auth.user.uid);

    toast.success(`All scribbles deleted`, toastOptions);
  };

  const deleteAccountFully = async () => {
    localStorage.removeItem("settings");
    localStorage.removeItem("emailForSignIn");
    await deleteAccount(auth.user.uid);
    auth.signout();
    toast.success("Account Deleted", toastOptions);
    navigate("/");
  };

  return (
    <StyledContainer className="page-container">
      <h2>Profile</h2>
      <div className="settings-container profile">
        <div className="profile-option">
          <label htmlFor="email-address">Email Address</label>
          <p>{auth?.user?.email || `Logged in with Github`}</p>
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
            <label htmlFor="delete-data">
              Delete all scribbles <span>(This cannot be undone)</span>
            </label>
            <Button
              name="delete-data"
              padding="1rem"
              minWidth="10rem"
              style={{ fontWeight: 900 }}
              fontSize=".9rem"
              disabled={checkDeleteScribbles}
              onClick={() => {
                setTimeout(() => {
                  setCheckDeleteScribbles(false);
                }, [3000]);
                setCheckDeleteScribbles(true);
              }}
            >
              {checkDeleteScribbles ? "Are you sure?" : "Delete data"}
            </Button>

            {checkDeleteScribbles && (
              <div className="confirm-modal">
                <FontAwesomeIcon icon={faArrowRight} />
                <Button
                  minWidth="100%"
                  padding="1rem"
                  fontSize=".9rem"
                  onClick={deleteAllFirebaseDocs}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
          {/* <div className="profile-option">
            <label htmlFor="delete-profile">
              Delete all data and profile <span>(This cannot be undone)</span>
            </label>
            <Button
              name="delete-profile"
              padding="1rem"
              minWidth="10rem"
              fontSize=".9rem"
              disabled={checkDeleteUser}
              style={{ fontWeight: 900 }}
              onClick={() => {
                setTimeout(() => {
                  setCheckDeleteUser(false);
                }, [5000]);
                setCheckDeleteUser(true);
              }}
            >
              {checkDeleteUser ? "Are you sure?" : "Delete my profile"}
            </Button>
            {checkDeleteUser && (
              <div className="confirm-modal">
                <FontAwesomeIcon icon={faArrowRight} />
                <Button
                  minWidth="100%"
                  padding="1rem"
                  fontSize=".9rem"
                  onClick={deleteAccountFully}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div> */}
        </div>
      </div>
      <ToastContainer closeButton={false} />
    </StyledContainer>
  );
};

export default Account;
