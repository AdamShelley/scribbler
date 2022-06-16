import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavBurger from "../components/NavBurger";
import NoteContainer from "../components/NoteContainer";
import firestore from "../utils/db";
import { getAllUserScribbles } from "../utils/db";
import { CSSTransition } from "react-transition-group";
import { useAuth } from "../utils/auth";

const StyledContainer = styled.div`
  display: flex;
  min-height: 80vh; /* Change this later */
  width: 100%;
`;

const Scribble = () => {
  const [showNav, setShowNav] = useState(false);
  const [scribbles, setScribbles] = useState([]);
  const [selectedScribble, setSelectedScribble] = useState();
  const auth = useAuth();

  useEffect(() => {
    auth.checkSignedIn();
    const fetchScribbles = async () => {
      const scribbles = await getAllUserScribbles(auth?.user?.uid);
      console.log(scribbles);
    };
    fetchScribbles();
  }, []);

  console.log(scribbles);

  return (
    <div>
      <Navbar
        setShowNav={setShowNav}
        noteTitle={selectedScribble?.title}
        unsaved={true}
      />
      <CSSTransition
        in={showNav}
        timeout={300}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <NavBurger />
      </CSSTransition>
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
