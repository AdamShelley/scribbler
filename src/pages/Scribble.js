import React from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoteContainer from "../components/NoteContainer";

const StyledContainer = styled.div`
  display: flex;
  min-height: 80vh; /* Change this later */
  width: 100%;
`;

const Scribble = () => {
  return (
    <div>
      <Navbar />
      <StyledContainer>
        <Sidebar />
        <NoteContainer />
      </StyledContainer>
    </div>
  );
};

export default Scribble;
