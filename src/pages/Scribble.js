import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NoteContainer from "../components/NoteContainer";

const StyledContainer = styled.div`
  display: flex;
  min-height: 80vh; /* Change this later */
  width: 100%;
`;

const scribbles = [
  { id: 1, title: "Shopping list", createdAt: new Date(), body: "# Testing 1" },
  { id: 2, title: "Lecture notes", createdAt: new Date(), body: "# Testing 2" },
  {
    id: 3,
    title: "Movies to watch",
    createdAt: new Date(),
    body: "# Testing 3",
  },
  { id: 4, title: "Journal Day 1", createdAt: new Date(), body: "# Testing 4" },
];

const emptyScribble = {
  id: "empty",
  title: "Empty Note",
  createdAt: new Date(),
  body: "# Start by typing and creating a scribble",
};

const Scribble = () => {
  const [selectedScribble, setSelectedScribble] = useState(emptyScribble);

  return (
    <div>
      <Navbar />
      <StyledContainer>
        <Sidebar
          scribbles={scribbles}
          selectedScribble={selectedScribble}
          setSelectedScribble={setSelectedScribble}
        />
        <NoteContainer
          scribbles={scribbles}
          selectedScribble={selectedScribble}
        />
      </StyledContainer>
    </div>
  );
};

export default Scribble;
