import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import NoteContainer from "../components/NoteContainer";

import { getAllUserScribbles } from "../utils/db";
import { useAuth } from "../utils/auth";

const StyledContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 100%;
`;

const Scribble = ({ setUnsaved }) => {
  const [scribbles, setScribbles] = useState([]);
  const [archived, setArchived] = useState([]);
  const [selectedScribble, setSelectedScribble] = useState();

  const auth = useAuth();

  useEffect(() => {
    const fetchScribbles = async () => {
      const fetchedScribbles = await getAllUserScribbles(auth.user.uid);
      setScribbles(fetchedScribbles);
      setSelectedScribble(fetchedScribbles[0]);

      const fetchedArchivedScribbles = await getAllUserScribbles(
        auth.user.uid,
        "archive"
      );

      setArchived(fetchedArchivedScribbles);
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
    setScribbles((previousScribbles) =>
      previousScribbles.map((scrib) =>
        scrib.id === currentScribble.id ? { ...scrib, body, title } : scrib
      )
    );

    setUnsaved(true);
  };

  return (
    <div>
      <StyledContainer>
        <Sidebar
          scribbles={scribbles}
          selectedScribble={selectedScribble}
          changeScribble={changeScribble}
          setScribbles={setScribbles}
          setSelectedScribble={setSelectedScribble}
          createNewScribble={createBlankScribble}
          archived={archived}
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
