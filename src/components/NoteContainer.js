import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faFloppyDisk,
  faTrash,
  faFilter,
  faBoxArchive,
  faTrashArrowUp,
  faList,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  archiveScribbleInDatabase,
  restoreScribbleToMain,
  pinScribbleHandler,
} from "../utils/HandleScribbles";
import { useEffect } from "react";
import { useCallback } from "react";
import { sortScribbles } from "../utils/db";
import { filterOrder } from "../utils/filterOrder";
import { storageSettings } from "../utils/storageSettings";
import MobileTitle from "./MobileTitle";

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
  isMobile,
  setShowSidebar,
  navTitle,
  setNavTitle,
}) => {
  const auth = useAuth();

  const [markdown, setMarkdown] = useState(
    selectedScribble
      ? selectedScribble
      : "# Press the + button to create a new Scribble"
  );

  const [showResults, setShowResults] = useState(
    settings.showMD === "Yes" ? false : true
  );
  const [showMarkdown, setShowMarkdown] = useState(true);

  const saveScribbleToDatabaseHandler = useCallback(() => {
    saveScribbleToDatabase(
      markdown,
      scribbles,
      selectedScribble,
      setSelectedScribble,
      setScribbles,
      auth.user.uid
    );

    resetSaveDot(selectedScribble);
  }, [
    markdown,
    scribbles,
    selectedScribble,
    setSelectedScribble,
    setScribbles,
    auth?.user?.uid,
    resetSaveDot,
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

  const archiveScribbleHandler = () => {
    archiveScribbleInDatabase(
      selectedScribble,
      setScribbles,
      setArchived,
      auth.user.uid
    );
  };

  const filterResults = async () => {
    // Update user settings
    const newOrder = filterOrder(settings.scribbleOrder);
    // Update local storage
    storageSettings(auth.user.uid, newOrder, settings, setSettings);
    // Send request to DB to sort scribbles
    await sortScribbles(scribbles, "Z-A");
  };

  const restoreScribbleHandler = () => {
    const prevLoc = selectedScribble.archived ? "archive" : "deleted";
    const setPrevLoc = selectedScribble.archived ? setArchived : setDeleted;
    restoreScribbleToMain(
      selectedScribble,
      setScribbles,
      prevLoc,
      setPrevLoc,
      auth.user.uid
    );
  };

  const pinScribbleToTop = () => {
    // Check its not in archive or bin
    if (selectedScribble.archive || selectedScribble.deleted) return;

    pinScribbleHandler(
      scribbles,
      setScribbles,
      selectedScribble.id,
      { pinned: !selectedScribble.pinned },
      auth.user.uid
    );
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

  const showRestoreButton =
    selectedScribble?.archived || selectedScribble?.deleted;

  return (
    <StyledScribbleContainer className="selector selector-4">
      <StyledSearchBar className="selector selector-5">
        <div>
          {isMobile && (
            <FontAwesomeIcon
              className="show-results"
              icon={faList}
              onClick={() => setShowSidebar(true)}
            />
          )}
          {!isMobile && (
            <Tooltips text={`Order: ${settings?.scribbleOrder}`}>
              <FontAwesomeIcon
                className="show-results"
                icon={faFilter}
                onClick={filterResults}
              />
            </Tooltips>
          )}
          {!selectedScribble?.archived && !selectedScribble?.deleted && (
            <Tooltips text={selectedScribble?.pinned ? "Unpin" : "Pin"}>
              <FontAwesomeIcon
                className="show-results"
                icon={faMapPin}
                onClick={pinScribbleToTop}
              />
            </Tooltips>
          )}
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
          {isMobile && !selectedScribble.archived && !selectedScribble.deleted && (
            <FontAwesomeIcon
              className="show-results"
              icon={faBoxArchive}
              onClick={() => {
                archiveScribbleHandler();
                setShowSidebar(true);
              }}
            />
          )}
          {isMobile && !selectedScribble.deleted && (
            <Tooltips text="Delete">
              <FontAwesomeIcon
                className="show-results"
                icon={faTrash}
                onClick={() => {
                  deleteScribbleHandler();
                  setShowSidebar(true);
                }}
              />
            </Tooltips>
          )}

          {showRestoreButton && (
            <Tooltips text="Restore">
              <FontAwesomeIcon
                className="show-results"
                icon={faTrashArrowUp}
                onClick={restoreScribbleHandler}
              />
            </Tooltips>
          )}
        </div>
      </StyledSearchBar>
      {isMobile && (
        <MobileTitle setNavTitle={setNavTitle} navTitle={navTitle} />
      )}
      <StyledNoteContainer>
        <div>
          <Note
            markdown={markdown}
            setMarkdown={setMarkdown}
            scribbles={scribbles}
            selectedScribble={selectedScribble}
            showResults={showResults}
            showMarkdown={showMarkdown}
            updateScribblesWithoutDatabasePush={
              updateScribblesWithoutDatabasePush
            }
          />
        </div>
        <ToastContainer closeButton={false} />
      </StyledNoteContainer>
    </StyledScribbleContainer>
  );
};

export default NoteContainer;
