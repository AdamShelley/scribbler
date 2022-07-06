import React, { useState } from "react";
import styled from "styled-components";
import NavBurger from "./NavBurger";
import { useAuth } from "../utils/auth";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

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

    .burger-nav {
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
          /* max-width: 2rem; */
          margin-bottom: 3px;
          transform: scale(1);
          transition: all 0.2s ease-in-out;
        }

        &:hover span {
          background-color: #ccc;
          transform: scale(1.1);
        }
      }
    }

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
    margin-left: 10rem;
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
    justify-content: space-evenly;
    flex: 1;

    button {
      padding: 0.4rem 1rem;
      background-color: var(--background);
      border: 1px solid var(--text-color);
      color: var(--text-color);
      font-size: 0.8rem;
      font-weight: 500;
      font-family: inherit;
      border-radius: 2px;
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
`;

const Navbar = ({ navTitle, unsaved }) => {
  const [showNav, setShowNav] = useState(false);
  const nodeRef = React.useRef(null);
  const auth = useAuth();

  return (
    <StyledNavbar>
      <div>
        <div className="burger-nav" onClick={() => setShowNav((prev) => !prev)}>
          <div>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
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
        {!auth.user && <button onClick={auth.signinWithGithub}>Sign in</button>}
        {auth.user && <p>{auth.user?.name}</p>}
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
