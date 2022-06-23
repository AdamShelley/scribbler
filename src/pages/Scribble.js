import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NavBurger from "../components/NavBurger";
import NoteContainer from "../components/NoteContainer";

import { getAllUserScribbles } from "../utils/db";
import { CSSTransition } from "react-transition-group";
import { useAuth } from "../utils/auth";
import { saveScribbleToDatabase } from "../utils/HandleScribbles";

const StyledContainer = styled.div`
  display: flex;
  min-height: 80vh; /* Change this later */
  width: 100%;
`;

const Scribble = () => {
  const [showNav, setShowNav] = useState(false);
  const [scribbles, setScribbles] = useState([]);
  const [selectedScribble, setSelectedScribble] = useState();
  const [unsaved, setUnsaved] = useState(false);

  const auth = useAuth();

  useEffect(() => {
    const fetchScribbles = async () => {
      const fetchedScribbles = await getAllUserScribbles(auth.user.uid);
      setScribbles(fetchedScribbles);
      setSelectedScribble(fetchedScribbles[0]);
    };

    if (auth.user) {
      fetchScribbles();
    }
  }, [auth.user]);

  const changeScribble = (scribble) => {
    setSelectedScribble(scribble);
  };

  const createBlankScribble = () => {
    // If a blank scribble already exists, do not create a new one.
    const blankExists = scribbles.find((scribble) => scribble.temp);
    if (blankExists) return;

    const blankScribble = {
      body: "# Unsaved Scribble",
      title: "Unsaved Scribble",
      temp: true,
    };

    setScribbles((scribbles) => [...scribbles, blankScribble]);
    setSelectedScribble(blankScribble);
  };

  // Keeps the non-saved markdown persistent.
  const updateScribblesWithoutDatabasePush = (currentScribble, body, title) => {
    const filteredScribbles = scribbles.filter((scribble) => {
      return scribble.id !== selectedScribble.id;
    });

    const tempUpdateScribble = {
      ...currentScribble,
      body,
      title,
    };

    setScribbles([...filteredScribbles, tempUpdateScribble]);
  };

  return (
    <div>
      <Navbar
        setShowNav={setShowNav}
        noteTitle={selectedScribble?.title}
        unsaved={unsaved}
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
          changeScribble={changeScribble}
          createNewScribble={createBlankScribble}
        />
        <NoteContainer
          scribbles={scribbles}
          selectedScribble={selectedScribble}
          setSelectedScribble={setSelectedScribble}
          setScribbles={setScribbles}
          updateScribblesWithoutDatabasePush={
            updateScribblesWithoutDatabasePush
          }
        />
      </StyledContainer>
    </div>
  );
};

export default Scribble;
