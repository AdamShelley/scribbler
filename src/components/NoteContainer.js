import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faFloppyDisk,
  faTrash,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyNote from "./EmptyNote";
import Note from "./Note";
import { useAuth } from "../utils/auth";
import Tooltips from "../utils/Tooltips";
import {
  StyledScribbleContainer,
  StyledSearchBar,
  StyledNoteContainer,
} from "../styles/NoteStyles";
import {
  saveScribbleToDatabase,
  moveScribbleToBin,
} from "../utils/HandleScribbles";
import { useEffect } from "react";
import { useCallback } from "react";
import { sortScribbles, updateSettings } from "../utils/db";
import { filterOrder } from "../utils/filterOrder";

const NoteContainer = ({
  scribbles,
  selectedScribble,
  setScribbles,
  setSelectedScribble,
  updateScribblesWithoutDatabasePush,
  resetSaveDot,
  setArchived,
  setDeleted,
  settings,
  setSettings,
  setNavTitle,
  testing,
}) => {
  const [markdown, setMarkdown] = useState(
    selectedScribble ? selectedScribble : "#### Write some markdown here"
  );

  const [title, setTitle] = useState(
    selectedScribble ? selectedScribble.title : ""
  );
  const [showResults, setShowResults] = useState(
    settings?.showMD === "Yes" ? false : true
  );
  const [showMarkdown, setShowMarkdown] = useState(true);

  const auth = useAuth();

  const saveScribbleToDatabaseHandler = useCallback(() => {
    saveScribbleToDatabase(
      markdown,
      title,
      scribbles,
      selectedScribble,
      setSelectedScribble,
      setScribbles,
      auth.user.uid
    );

    setNavTitle(title);
    resetSaveDot(selectedScribble);
  }, [
    markdown,
    title,
    scribbles,
    selectedScribble,
    setSelectedScribble,
    setScribbles,
    auth?.user?.uid,
    resetSaveDot,
    setNavTitle,
  ]);

  const deleteScribbleHandler = () => {
    moveScribbleToBin(
      selectedScribble,
      setScribbles,
      setDeleted,
      setArchived,
      auth.user.uid
    );
  };

  const filterResults = async () => {
    // Update user settings

    const newOrder = filterOrder(settings.scribbleOrder);

    sessionStorage.removeItem("scribbles");
    sessionStorage.removeItem("archived");
    sessionStorage.removeItem("deleted");

    localStorage.removeItem("settings");
    updateSettings(auth.user.uid, newOrder);

    setSettings((settings) => ({
      ...settings,
      ...newOrder,
    }));

    const newCachedSettings = {
      ...settings,
      ...newOrder,
    };

    localStorage.setItem("settings", JSON.stringify(newCachedSettings));

    // Send request to DB to sort scribbles
    await sortScribbles(scribbles, "Z-A");
  };

  useEffect(() => {
    // Setup save timer
    if (settings.autosave !== "Never") {
      const autosaveTimer = setInterval(() => {
        // Function to autosave on correct option
        saveScribbleToDatabaseHandler();
      }, [settings?.autosave || 30000]);
      return () => clearInterval(autosaveTimer);
    }
  }, [settings?.autosave, saveScribbleToDatabaseHandler]);

  return (
    <StyledScribbleContainer>
      <StyledSearchBar>
        <div>
          <Tooltips text={`Order: ${settings?.scribbleOrder}`}>
            <FontAwesomeIcon
              className="show-results"
              icon={faFilter}
              onClick={filterResults}
            />
          </Tooltips>
          <Tooltips text="Show Editor">
            <FontAwesomeIcon
              className="show-results"
              icon={showMarkdown ? faEyeSlash : faEye}
              onClick={() => setShowMarkdown((prev) => !prev)}
            />
          </Tooltips>
        </div>
        <div>
          <Tooltips text="Show results">
            <FontAwesomeIcon
              className="show-results"
              icon={showResults ? faEyeSlash : faEye}
              onClick={() => setShowResults((prev) => !prev)}
            />
          </Tooltips>
          <Tooltips text="Save">
            <FontAwesomeIcon
              className="show-results"
              icon={faFloppyDisk}
              onClick={saveScribbleToDatabaseHandler}
            />
          </Tooltips>
          <Tooltips text="Delete">
            <FontAwesomeIcon
              className="show-results"
              icon={faTrash}
              onClick={deleteScribbleHandler}
            />
          </Tooltips>
        </div>
      </StyledSearchBar>
      <StyledNoteContainer>
        <div>
          {scribbles?.length < 1 ? (
            <EmptyNote
              markdown={markdown}
              setMarkdown={setMarkdown}
              setTitle={setTitle}
              scribbles={scribbles}
              showResults={showResults}
            />
          ) : (
            <Note
              markdown={markdown ? markdown : "oh"}
              setMarkdown={setMarkdown}
              scribbles={scribbles}
              selectedScribble={selectedScribble}
              setTitle={setTitle}
              showResults={showResults}
              showMarkdown={showMarkdown}
              updateScribblesWithoutDatabasePush={
                updateScribblesWithoutDatabasePush
              }
              // keyHandler={keyHandler}
            />
          )}
        </div>
        <ToastContainer closeButton={false} />
      </StyledNoteContainer>
    </StyledScribbleContainer>
  );
};

export default NoteContainer;
