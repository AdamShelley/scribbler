import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import NoteContainer from "../components/NoteContainer";
import { getAllUserScribbles } from "../utils/db";
import { useAuth } from "../utils/auth";
import Splash from "../components/Splash";
import { toast } from "react-toastify";
import { toastOptions } from "../utils/toastOptions";

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  /* position: relative; */
`;

const Scribble = ({
  navTitle,
  setNavTitle,
  settings,
  setSettings,
  setTempScribbles,
}) => {
  const [scribbles, setScribbles] = useState([]);
  const [archived, setArchived] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [selectedScribble, setSelectedScribble] = useState();

  const auth = useAuth();

  useEffect(() => {
    // Rerenders caused by changing the state for each separately
    // But why is the user being created 3 times?
    const cachedScribbles = JSON.parse(sessionStorage.getItem("scribbles"));
    const cachedArchived = JSON.parse(sessionStorage.getItem("archive"));
    const cachedDeleted = JSON.parse(sessionStorage.getItem("deleted"));

    if (cachedScribbles && auth.user) {
      setScribbles(cachedScribbles);
      setTempScribbles(cachedScribbles);
      setArchived(cachedArchived || []);
      setDeleted(cachedDeleted || []);
      setSelectedScribble(cachedScribbles[0]);
      setNavTitle(cachedScribbles[0]?.title);
    } else {
      const fetchScribbles = async () => {
        const fetchedScribbles = await getAllUserScribbles(
          auth.user.uid,
          "scribbles",
          settings.scribbleOrder
        );

        setScribbles(fetchedScribbles);
        setTempScribbles(fetchedScribbles);
        setSelectedScribble(fetchedScribbles[0]);
        setNavTitle(fetchedScribbles[0]?.title);

        const fetchedArchivedScribbles = await getAllUserScribbles(
          auth.user.uid,
          "archive",
          settings.scribbleOrder
        );
        setArchived(fetchedArchivedScribbles);

        const fetchedDeletedScribbles = await getAllUserScribbles(
          auth.user.uid,
          "deleted",
          settings.scribbleOrder
        );
        setDeleted(fetchedDeletedScribbles);

        // Remember scribbles until browser closed
        sessionStorage.setItem("scribbles", JSON.stringify(fetchedScribbles));
        sessionStorage.setItem(
          "archived",
          JSON.stringify(fetchedArchivedScribbles)
        );
        sessionStorage.setItem(
          "deleted",
          JSON.stringify(fetchedDeletedScribbles)
        );
      };

      if (auth.user && settings) {
        fetchScribbles();
      }
    }

    if (!auth.user) {
      setNavTitle("");
    }
  }, [auth.user, setNavTitle, settings, setTempScribbles]);

  const changeScribble = (scribble) => {
    setSelectedScribble(scribble);
    setNavTitle(scribble.title);
  };

  const createBlankScribble = () => {
    // If a blank scribble already exists, do not create a new one.
    const blankExists = scribbles.find((scribble) => scribble.temp);
    if (blankExists) {
      return toast.error("You already have a blank page", {
        ...toastOptions,
        toastId: "Saving",
      });
    }

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
    const newList = (previousScribbles) =>
      previousScribbles.map((scrib) =>
        scrib.id === currentScribble.id
          ? { ...scrib, body, title, unsaved: true }
          : scrib
      );

    setScribbles(newList);
    setTempScribbles(newList);
  };

  const resetSaveDot = (currentScribble) => {
    if (currentScribble.temp) return;

    const newOrder = scribbles.map((scrib) =>
      scrib.id === currentScribble.id ? { ...scrib, unsaved: false } : scrib
    );

    setScribbles(newOrder);
    setTempScribbles(newOrder);
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
              setSettings={setSettings}
              setNavTitle={setNavTitle}
            />
          </>
        ) : (
          <>
            <Splash />
          </>
        )}
      </StyledContainer>
    </div>
  );
};

export default Scribble;
