import React from "react";
import styled from "styled-components";
import { useAuth } from "../utils/auth";

const StyledNavbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  background-color: var(--nav-color);
  /* padding: 2.5rem; */

  div {
    display: flex;
    align-items: center;
    height: 100%;
    flex: 1;

    .burger-nav {
      padding: 1rem;
      z-index: 99;
      width: 4.5rem;
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
          width: 80%;
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

      h1 {
        font-size: 1.2rem;
        padding-right: 2rem;
        border-right: 1px solid var(--light-grey);
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

    span {
      border: 1px solid var(--text-color);
      border-radius: 50%;
      padding: 0.5rem;
      width: 2.5rem;
      background-color: var(--dark-grey);
      text-align: center;
    }

    p {
      font-weight: 500;
    }

    img {
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
  }
`;

const Navbar = ({ setShowNav, noteTitle, unsaved }) => {
  const auth = useAuth();

  console.log(auth?.user);
  console.log(auth.user?.photoUrl);

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
          <h1>Scribbler</h1>
        </div>
      </div>
      <div className="note-name">
        <h4>{noteTitle} </h4>
        <span>{unsaved && " - Unsaved scribble"}</span>
      </div>

      <div className="avatar-container">
        {!auth.user && <span onClick={auth.signinWithGithub}>A</span>}
        {auth.user && <p>{auth.user?.displayName}</p>}
        {auth.user && (
          <img
            src={auth.user?.photoURL}
            alt="avatar"
            onClick={auth.signout}
          ></img>
        )}
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
