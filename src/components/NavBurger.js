import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledNavBurger = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  height: 100vh;
  width: 25vw;
  z-index: 99;

  background-color: var(--dark-grey);
  border-right: 1px solid var(--text-color);

  h3 {
    margin-top: 2rem;
    font-size: 5rem;
    font-weight: 900;
  }

  ul {
    margin-top: 3rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;

    li {
      margin-top: 2rem;
      font-weight: 500;
      cursor: pointer;

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }
`;

const NavBurger = (setShowNav) => {
  return (
    <StyledNavBurger>
      <h3>S</h3>
      <ul>
        <li>
          <Link onClick={() => setShowNav(false)} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link onClick={() => setShowNav(false)} to="/account">
            Account
          </Link>
        </li>
        <li>
          <Link onClick={() => setShowNav(false)} to="/settings">
            Settings
          </Link>
        </li>
        <li>
          <Link onClick={() => setShowNav(false)} to="/contact">
            Contact
          </Link>
        </li>
      </ul>
    </StyledNavBurger>
  );
};

export default NavBurger;
