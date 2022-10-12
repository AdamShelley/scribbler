import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../utils/auth";
import { Link } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";
import Button from "../styles/Button";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";
import { useEffect } from "react";

const StyledNavbar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  min-height: 4rem;
  background-color: var(--nav-color);

  div {
    display: flex;
    align-items: center;
    height: 100%;

    .logo-container {
      margin-left: 2rem;

      a {
        color: inherit;
        text-decoration: none;
        opacity: 1;
        transition: all 0.2s;

        h1 {
          font-size: 1.2rem;
          padding-right: 2rem;
          border-right: 1px solid var(--light-grey);
        }

        &:hover {
          opacity: 0.9;
        }
      }
    }
  }

  .note-name {
    margin-left: 3rem;
    flex: 5;

    h4 {
      font-weight: 400;
    }

    span {
      font-style: italic;
    }
  }

  .avatar-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 1rem;
    flex: 1;

    > div {
      margin-right: 1rem;

      p {
        font-size: 0.9rem;
        letter-spacing: 1px;
      }
    }

    button {
      padding: 0.2rem 0.5rem;
      width: 100%;
      background-color: var(--background);
      border: 1px solid var(--light-grey);
      color: var(--text-color);
      font-size: 0.8rem;
      font-weight: 500;
      font-family: inherit;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.1s ease-in;

      &:hover {
        background-color: var(--dark-grey);
        color: var(--text-color);
      }
    }

    p {
      font-weight: 500;
    }

    img {
      margin: 0 0.5rem;
      width: 2.2rem;
      height: 2.2rem;
      cursor: pointer;
      border-radius: 50%;
      opacity: 1;
      transition: opacity 0.1s;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    white-space: no-wrap;
    /* z-index: 1000; */

    svg {
      margin-left: 0.4rem;
      font-size: 0.8rem;
    }

    p {
      white-space: nowrap;
    }

    div {
      position: absolute;
      top: 100%;
      right: 0%;
      background-color: var(--background);
      border: 1px solid var(--light-grey);
      border-radius: 2px;
      display: flex;
      flex-direction: column;
      min-height: 6.5rem; // Temp fix
      z-index: 99;
      box-shadow: 4px 9px 16px -3px rgba(0, 0, 0, 0.75);

      a {
        width: 100%;
        text-decoration: none;
        color: inherit;
        padding: 0.5rem 2rem;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        user-select: none;
        white-space: nowrap;

        &:hover {
          background-color: var(--text-color);
          color: var(--background);
        }
      }
    }
  }
`;

const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const Navbar = ({ navTitle, tempScribbles }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);

  const auth = useAuth();

  const showMenu = () => {
    setShowDropdown((prev) => !prev);
  };

  const triggerModal = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const sendEmailLink = () => {
    // Validate email
    const validEmail = isValidEmail(email);

    if (!validEmail) {
      toast.error("Please enter a valid email", toastOptions);
      return false;
    } else {
      console.log("Sending email to " + email);
      auth.signInWithEmailLinkHandler(email);
      return true;
    }
  };

  const logoutHandler = () => auth.signout();

  const checkUnsaved = () => {
    return (
      tempScribbles &&
      tempScribbles.some(
        (scribble) => scribble.title === navTitle && scribble.unsaved
      )
    );
  };

  return (
    <StyledNavbar>
      <div>
        <div className="logo-container">
          <Link to="/">
            <h1>Scribbler</h1>
          </Link>
        </div>
      </div>
      <div className="note-name">
        <h4>{navTitle} </h4>

        <span>{checkUnsaved() && "  - Unsaved scribble"}</span>
      </div>

      <div className="avatar-container">
        {!auth.user && (
          <div>
            <Button
              style={{ whiteSpace: "nowrap", padding: ".5rem" }}
              onClick={auth.signinWithGithub}
            >
              Github Signin
            </Button>
          </div>
        )}
        {!auth.user && (
          <div>
            <Button
              style={{ whiteSpace: "nowrap", padding: ".5rem" }}
              onClick={triggerModal}
            >
              Email Signin
            </Button>
            {showModal && (
              <Modal
                setEmail={setEmail}
                closeModalHandler={closeModalHandler}
                signInWithLink={sendEmailLink}
                showError={showError}
                setShowError={setShowError}
              />
            )}
          </div>
        )}
        {auth.user && (
          <div onClick={showMenu} className="dropdown">
            <p>
              {auth.user?.name || auth.user?.email}
              <FontAwesomeIcon icon={faChevronDown} />
            </p>
            {showDropdown && (
              <div>
                <Link to="/account">Your Account</Link>
                <Link to="/settings">Settings</Link>
                <Link to="/" onClick={logoutHandler}>
                  Signout
                </Link>
              </div>
            )}
          </div>
        )}

        {auth.user && auth.user.photoUrl && (
          <img src={auth.user?.photoUrl} alt="avatar"></img>
        )}
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
