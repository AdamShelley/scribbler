import React from "react";
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
    }
  }
`;

const NavBurger = () => {
  return (
    <StyledNavBurger>
      <h3>S</h3>
      <ul>
        <li>Home</li>
        <li>Account</li>
        <li>Settings</li>
        <li>Contact</li>
      </ul>
    </StyledNavBurger>
  );
};

export default NavBurger;
