import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSidebar } from "../styles/SidebarStyles";
import {
  faArrowDown,
  faArrowUp,
  faTrash,
  faFilter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import {
  saveScribbleToDatabase,
  deleteScribbleFromDatabase,
  archiveScribbleInDatabase,
  restoreScribbleToMain,
  moveScribbleToBin,
} from "../utils/HandleScribbles";
import OptionsMenu from "./OptionsMenu";

const Sidebar = ({
  scribbles,
  archived,
  setArchived,
  deleted,
  setDeleted,
  selectedScribble,
  changeScribble,
  createNewScribble,
  setScribbles,
  setSelectedScribble,
}) => {
  const [showArchive, setShowArchive] = useState(true);
  const [showBin, setShowBin] = useState(true);
  const [showScribbles, setShowScribbles] = useState(true);
  const [currentRightClickedScribble, setCurrentRightClickedScribble] =
    useState(null);
  const { user } = useAuth();

  const archiveScribbleHandler = () => {
    archiveScribbleInDatabase(
      currentRightClickedScribble,
      setScribbles,
      setArchived,
      user.uid
    );
  };

  const saveScribbleHandler = () => {
    const { body, title } = currentRightClickedScribble;
    saveScribbleToDatabase(
      body,
      title,
      scribbles,
      selectedScribble,
      setSelectedScribble,
      setScribbles,
      user.uid
    );
  };

  const restoreScribbleHandler = () => {
    const prevLoc = currentRightClickedScribble.archived
      ? "archive"
      : "deleted";
    const setPrevLoc = currentRightClickedScribble.archived
      ? setArchived
      : setDeleted;
    restoreScribbleToMain(
      currentRightClickedScribble,
      setScribbles,
      prevLoc,
      setPrevLoc,
      user.uid
    );
  };

  const binScribbleHandler = () => {
    moveScribbleToBin(
      currentRightClickedScribble,
      setScribbles,
      setDeleted,
      setArchived,
      user.uid
    );
  };

  const deleteScribbleHandler = () => {
    deleteScribbleFromDatabase(
      scribbles,
      selectedScribble.id,
      setScribbles,
      setSelectedScribble
    );
  };

  // To do
  const deleteAllScribblesInBin = () => {
    console.log("Delete all scribbles");
  };

  const copyScribbleHandler = () => {
    console.log("Copy scribble");
  };

  return (
    <StyledSidebar>
      <div>
        <h3>Organizer</h3>
        <div>
          <FontAwesomeIcon icon={faFilter} />
          <FontAwesomeIcon onClick={createNewScribble} icon={faPlus} />
        </div>
      </div>

      <OptionsMenu
        currentRightClickedScribble={currentRightClickedScribble}
        archiveScribbleHandler={archiveScribbleHandler}
        saveScribbleHandler={saveScribbleHandler}
        deleteScribbleHandler={deleteScribbleHandler}
        binScribbleHandler={binScribbleHandler}
        restoreScribbleHandler={restoreScribbleHandler}
        copyScribbleHandler={copyScribbleHandler}
        archivedMenu={currentRightClickedScribble?.archived}
        deleteMenu={currentRightClickedScribble?.deleted}
        fullMenu={
          !currentRightClickedScribble?.archived &&
          !currentRightClickedScribble?.deleted
        }
      />

      <button
        className="archive-button"
        onClick={() => setShowScribbles((prev) => !prev)}
        onContextMenu={() => setCurrentRightClickedScribble(null)}
      >
        <div>
          <FontAwesomeIcon icon={!showScribbles ? faArrowUp : faArrowDown} />
          <h4>| Scribbles |</h4>
        </div>
      </button>
      {showScribbles && scribbles.length > 0 && (
        <ul>
          {scribbles ? (
            scribbles.map((scribble) => (
              <li
                key={scribble.id || "temp"}
                onClick={() => changeScribble(scribble)}
                onContextMenu={() => setCurrentRightClickedScribble(scribble)}
                className={`${
                  selectedScribble?.title === scribble?.title
                    ? "selected-scribble"
                    : ""
                }`}
              >
                <h3>{scribble.title}</h3>
                {scribble?.unsaved && <div className="save-dot"></div>}
              </li>
            ))
          ) : (
            <li>
              <h3>Unsaved Scribble...</h3>
            </li>
          )}
        </ul>
      )}

      <button
        className="archive-button"
        onClick={() => setShowArchive((prev) => !prev)}
        onContextMenu={() => setCurrentRightClickedScribble(null)}
      >
        <div>
          <FontAwesomeIcon icon={!showArchive ? faArrowUp : faArrowDown} />
          <h4>| Archive |</h4>
        </div>
      </button>
      {showArchive && archived.length > 0 && (
        <ul>
          {archived
            ? archived.map((scribble) => (
                <li
                  key={scribble.id + "-archive"}
                  onClick={() => changeScribble(scribble)}
                  onContextMenu={() => setCurrentRightClickedScribble(scribble)}
                  className={`${
                    selectedScribble?.title === scribble.title
                      ? "selected-scribble"
                      : ""
                  }`}
                >
                  <h3>{scribble.title}</h3>
                </li>
              ))
            : ""}
        </ul>
      )}
      <button
        className="archive-button"
        onClick={() => setShowBin((prev) => !prev)}
        onContextMenu={() => setCurrentRightClickedScribble(null)}
      >
        <div>
          <FontAwesomeIcon icon={!showBin ? faArrowUp : faArrowDown} />
          <h4>| Bin |</h4>
        </div>
        <div className="bin-container" onClick={deleteAllScribblesInBin}>
          <h4>Clear all</h4>
          <FontAwesomeIcon icon={faTrash} className="bin-icon" />
        </div>
      </button>
      {showBin && deleted.length > 0 && (
        <ul>
          {deleted
            ? deleted.map((scribble) => (
                <li
                  key={scribble.id + "-deleted"}
                  onClick={() => changeScribble(scribble)}
                  onContextMenu={() => setCurrentRightClickedScribble(scribble)}
                  className={`${
                    selectedScribble?.title === scribble.title
                      ? "selected-scribble"
                      : ""
                  }`}
                >
                  <h3>{scribble.title}</h3>
                </li>
              ))
            : ""}
        </ul>
      )}
      {/* {showBin && deleted.length === 0 && <ul>Empty</ul>} */}
    </StyledSidebar>
  );
};

export default Sidebar;
