import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import NoteContainer from "../components/NoteContainer";

import { getAllUserScribbles } from "../utils/db";
import { useAuth } from "../utils/auth";
import Splash from "../components/Splash";
import ReactTooltip from "react-tooltip";
import { orderScribbles } from "../utils/orderScribbles";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Scribble = ({ setUnsaved, setNavTitle, settings }) => {
  const [scribbles, setScribbles] = useState([]);
  const [archived, setArchived] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [selectedScribble, setSelectedScribble] = useState();

  const auth = useAuth();

  useEffect(() => {
    // Rerenders caused by changing the state for each separately
    // But why is the user being created 3 times?
    const fetchScribbles = async () => {
      const fetchedScribbles = await getAllUserScribbles(
        auth.user.uid,
        "scribbles",
        settings.scribbleOrder
      );

      setScribbles(fetchedScribbles);
      setSelectedScribble(fetchedScribbles[0]);
      setNavTitle(fetchedScribbles[0]?.title);

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

    // Correct filtering for scribbles
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
    setNavTitle("No title");
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
    if (currentScribble.temp) return;
    setScribbles((previousScribbles) =>
      previousScribbles.map((scrib) =>
        scrib.id === currentScribble.id ? { ...scrib, unsaved: false } : scrib
      )
    );
    setUnsaved(false);
  };

  return (
    <div style={{ height: "100%", overflow: "hidden" }}>
      <StyledContainer>
        {auth.user && settings ? (
          <>
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
              settings={settings}
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
              setDeleted={setDeleted}
              setArchived={setArchived}
              settings={settings}
            />
          </>
        ) : (
          <>
            <Splash />
          </>
        )}

        <ReactTooltip
          effect="solid"
          place="top"
          delayShow={1000}
          border
          borderColor="var(--light-grey)"
          backgroundColor="var(--background)"
        />
      </StyledContainer>
    </div>
  );
};

export default Scribble;
