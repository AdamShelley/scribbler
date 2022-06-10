import React from "react";
import styled from "styled-components";

const StyledSidebar = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  min-width: 25vw;
  border-right: 1px solid var(--light-grey);

  div {
    background-color: var(--dark-grey);
    padding: 0.5rem 1rem;

    h3 {
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 1px;
    }
  }

  ul {
    margin-top: 2rem;
    padding: 0 2rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    li {
      margin-top: 1rem;
      padding: 1rem 0;
    }
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar>
      <div>
        <h3>Scribbles</h3>
      </div>

      <ul>
        <li>Note 1 - Lorem ipsum dolor sit amet.</li>
        <li>Note 2 - Lorem ipsum dolor sit.</li>
        <li>Note 3 - Lorem ipsum dolor sit</li>
        <li>Note 4 - Lorem ipsum dolor sit amet.</li>
        <li>Note 5 - Lorem, ipsum dolor.</li>
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;
