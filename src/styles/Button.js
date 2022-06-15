import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${(props) => props.bg || "var(--background)"};
  color: ${(props) => props.color || "var(--text-color)"};
  border: ${(props) => props.border || "1px solid var(--text-color)"};
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  font-size: 0.8rem;
  font-family: inherit;
  border-radius: 2px;
  cursor: pointer;
`;

const Button = (props) => {
  console.log();
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
