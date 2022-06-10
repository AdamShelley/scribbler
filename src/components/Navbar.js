import React from "react";
import styled from "styled-components";

const StyledNavbar = styled.div`
  display: flex;
  height: 8vh;
  /* border: 1px solid white; */
  background-color: var(--nav-color);
`;

const Navbar = () => {
  return <StyledNavbar>Navbar</StyledNavbar>;
};

export default Navbar;
