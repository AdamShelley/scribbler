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

const Scribble = ({ setUnsaved, setNavTitle }) => {
  const [scribbles, setScribbles] = useState([]);
  const [archived, setArchived] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [selectedScribble, setSelectedScribble] = useState();

  const auth = useAuth();

  useEffect(() => {
    const fetchScribbles = async () => {
      const fetchedScribbles = await getAllUserScribbles(auth.user.uid);
      setScribbles(fetchedScribbles);
      setSelectedScribble(fetchedScribbles[0]);
      setNavTitle(fetchedScribbles[0].title);

      const fetchedArchivedScribbles = await getAllUserScribbles(
        auth.user.uid,
        "archive"
      );
      setArchived(fetchedArchivedScribbles);

      const fetchedDeletedScribbles = await getAllUserScribbles(
        auth.user.uid,
        "deleted"
      );

      setDeleted(fetchedDeletedScribbles);
    };

    if (auth.user) {
      fetchScribbles();
    }
  }, [auth.user, setNavTitle]);

  const changeScribble = (scribble) => {
    setSelectedScribble(scribble);
    setNavTitle(scribble.title);
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
        scrib.id === currentScribble.id
          ? { ...scrib, body, title, unsaved: true }
          : scrib
      )
    );

    setUnsaved(true);
  };

  const resetSaveDot = (currentScribble) => {
    setScribbles((previousScribbles) =>
      previousScribbles.map((scrib) =>
        scrib.id === currentScribble.id ? { ...scrib, unsaved: false } : scrib
      )
    );
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
          setArchived={setArchived}
          deleted={deleted}
          setDeleted={setDeleted}
        />
        <NoteContainer
          scribbles={scribbles}
          selectedScribble={selectedScribble}
          setSelectedScribble={setSelectedScribble}
          setScribbles={setScribbles}
          updateScribblesWithoutDatabasePush={
            updateScribblesWithoutDatabasePush
          }
          resetSaveDot={resetSaveDot}
        />
      </StyledContainer>
    </div>
  );
};

export default Scribble;
