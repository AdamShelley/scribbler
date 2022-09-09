import React from "react";
import styled from "styled-components";
// import { fasquaregithub } from "@fortawesome/free-solid-svg-icons";

const StyledFooter = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-top: 1px solid var(--light-grey);
  background-color: var(--nav-color);
  margin-top: auto;

  min-height: 3rem;

  ul {
    list-style: none;
    font-size: 0.9rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      padding: 0.3rem;

      a {
        color: #ccc;
        transition: all 0.2s ease-in;
        cursor: pointer;
        text-decoration: none;
        font-weight: 800;

        &:hover {
          color: #a3a3a3;
        }
      }
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
        <li>
          Created by{" "}
          <span>
            <a
              href="https://adamshelley.com"
              target="_blank"
              rel=" noopener noreferrer"
            >
              adamshelley.com
            </a>
          </span>
        </li>
        <li>Github</li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
