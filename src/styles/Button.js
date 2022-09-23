import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.bg || "var(--background)"};
  color: ${(props) => props.color || "var(--text-color)"};
  border: ${(props) => props.border || "1px solid var(--text-color)"};
  padding: ${(props) => props.padding || "0.3rem 0.8rem"};
  margin: ${(props) => props.margin || "0 0.5rem"};
  font-size: 0.7rem;
  font-family: inherit;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--dark-grey);
  }
`;

const Button = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
