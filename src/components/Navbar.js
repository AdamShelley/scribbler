import React, { useState } from "react";
import styled from "styled-components";
import NavBurger from "./NavBurger";
import { useAuth } from "../utils/auth";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "./Modal";

const StyledNavbar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  background-color: var(--nav-color);

  div {
    display: flex;
    align-items: center;
    height: 100%;

    /* .burger-nav {
      padding: 1rem;
      z-index: 99;
      height: 100%;
      background-color: var(--light-grey);
      display: flex;
      flex-direction: column;
      align-items: center;

      div {
        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;

        span {
          background-color: var(--text-color);
          height: 2px;
          width: 2rem;
          min-width: 80%;
          max-width: 2rem;
          margin-bottom: 3px;
          transform: scale(1);
          transition: all 0.2s ease-in-out;
        }

        &:hover span {
          background-color: #ccc;
          transform: scale(1.1);
        }
      }
    } */

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

    svg {
      margin-left: 0.4rem;
      font-size: 0.8rem;
    }

    ul {
      list-style: none;
      position: absolute;
      top: 80%;
      right: -20%;
      background-color: var(--dark-grey);
      border: 1px solid var(--background);
      border-radius: 5px;
      display: flex;
      flex-direction: column;
      z-index: 99;

      li {
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

        a {
          text-decoration: none;
          color: inherit;
        }
      }
    }
  }
`;

const Navbar = ({ navTitle, unsaved }) => {
  const [showNav, setShowNav] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const nodeRef = React.useRef(null);
  const auth = useAuth();

  const showMenu = () => {
    setShowDropdown((prev) => !prev);
  };

  const triggerModal = () => setShowModal(true);
  const closeModalHandler = () => setShowModal(false);

  const sendEmailLink = () => {
    auth.signInWithEmailLinkHandler(email);
  };

  return (
    <StyledNavbar>
      <div>
        {/* <div className="burger-nav" onClick={() => setShowNav((prev) => !prev)}>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div> */}
        <div className="logo-container">
          <Link to="/">
            <h1>Scribbler</h1>
          </Link>
        </div>
      </div>
      <div className="note-name">
        <h4>{navTitle} </h4>
        <span>{unsaved && " - Unsaved scribble"}</span>
      </div>

      <div className="avatar-container">
        {!auth.user && (
          <div>
            <button onClick={auth.signinWithGithub}>Sign in with Github</button>
          </div>
        )}
        {!auth.user && (
          <div>
            <button onClick={triggerModal}>Sign in with Email</button>
            {showModal && (
              <Modal
                setEmail={setEmail}
                closeModalHandler={closeModalHandler}
                signInWithLink={sendEmailLink}
              />
            )}
          </div>
        )}
        {auth.user && (
          <div onClick={showMenu} className="dropdown">
            <p>
              {auth.user?.name}
              <FontAwesomeIcon icon={faChevronDown} />
            </p>
            {showDropdown && (
              <ul>
                <li>
                  <Link to="/account">Your Account</Link>
                </li>
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li onClick={auth.signout}>Signout</li>
              </ul>
            )}
          </div>
        )}

        {auth.user && (
          <img
            src={auth.user?.photoUrl}
            alt="avatar"
            onClick={auth.signout}
          ></img>
        )}
      </div>

      <CSSTransition
        in={showNav}
        timeout={300}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <NavBurger setShowNav={setShowNav} />
      </CSSTransition>
    </StyledNavbar>
  );
};

export default Navbar;
