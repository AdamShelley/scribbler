import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavBurger = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 25vw;
  z-index: 99;

  background-color: var(--dark-grey);
  border-right: 1px solid var(--text-color);

  .close-nav {
    height: 4rem;
    width: 4rem;
    background-color: var(--light-grey);
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    cursor: pointer;
    border-radius: 3px;

    &:hover span {
      color: var(--dark-grey);
    }

    span {
      font-size: 1.8rem;
      font-weight: 900;
      transition: all 0.15s ease-in-out;
    }
  }

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

let activeStyle = {
  borderBottom: "1px solid white",
  paddingBottom: ".3rem",
};

const NavBurger = ({ setShowNav }) => {
  const handleNavLinkClick = () => {
    setShowNav(false);
  };

  return (
    <StyledNavBurger>
      <div className="close-nav" onClick={handleNavLinkClick}>
        <span>X</span>
      </div>
      <h3>S</h3>
      <ul>
        <li>
          <NavLink
            to="/"
            onClick={handleNavLinkClick}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account"
            onClick={handleNavLinkClick}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Account
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/settings"
            onClick={handleNavLinkClick}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Settings
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            onClick={handleNavLinkClick}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </StyledNavBurger>
  );
};

export default NavBurger;
