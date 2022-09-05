import React from "react";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top: 1px solid white;
  margin-top: auto;

  min-height: 2rem;

  ul {
    list-style: none;
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    li {
      padding: 0.3rem;
    }
  }

  .left-side {
  }

  .right-side {
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <ul className="left-side">
        <li>AdamShelley.com</li>
        <li>Github</li>
      </ul>
      <ul className="right-side">
        <li>Contact</li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
