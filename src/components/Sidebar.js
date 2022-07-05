import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSidebar } from "../styles/SidebarStyles";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
  const [currentRightClickedScribble, setCurrentRightClickedScribble] =
    useState(null);
  const { uid } = useAuth();

  const archiveScribbleHandler = () => {
    archiveScribbleInDatabase(
      currentRightClickedScribble,
      scribbles,
      setScribbles,
      setArchived
    );
  };

  const saveScribbleHandler = () => {
    const { body, title } = currentRightClickedScribble;
    saveScribbleToDatabase(
      body,
      title,
      scribbles,
      selectedScribble,
      setScribbles,
      uid
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

  const restoreScribbleHandler = () => {
    const prevLoc = currentRightClickedScribble.archived
      ? "archive"
      : "deleted";
    const setPrevLoc = currentRightClickedScribble.archived
      ? setArchived
      : setDeleted;
    restoreScribbleToMain(
      currentRightClickedScribble,
      scribbles,
      setScribbles,
      prevLoc,
      setPrevLoc
    );
  };

  const copyScribbleHandler = () => {
    console.log("Copy scribble");
  };

  const binScribbleHandler = () => {
    moveScribbleToBin(
      currentRightClickedScribble,
      scribbles,
      setScribbles,
      setDeleted
    );
  };

  return (
    <StyledSidebar>
      <div>
        <h3>Scribbles</h3>
        <span onClick={createNewScribble}>+</span>
      </div>

      <OptionsMenu
        archiveScribbleHandler={archiveScribbleHandler}
        saveScribbleHandler={saveScribbleHandler}
        // deleteScribbleHandler={deleteScribbleHandler}
        binScribbleHandler={binScribbleHandler}
        restoreScribbleHandler={restoreScribbleHandler}
        copyScribbleHandler={copyScribbleHandler}
        fullMenu={currentRightClickedScribble?.archived}
      />
      {scribbles.length === 0 && <ul>Wow.. nothing here.</ul>}
      <ul>
        {scribbles ? (
          scribbles.map((scribble) => (
            <li
              key={scribble.id || "temp"}
              onClick={() => changeScribble(scribble)}
              onContextMenu={() => setCurrentRightClickedScribble(scribble)}
              className={`${
                selectedScribble.title === scribble.title
                  ? "selected-scribble"
                  : ""
              }`}
            >
              <h3>{scribble.title}</h3>
            </li>
          ))
        ) : (
          <li>
            <h3>Unsaved Scribble...</h3>
          </li>
        )}
      </ul>

      <button
        className="archive-button"
        onClick={() => setShowArchive((prev) => !prev)}
      >
        | Archive |{" "}
        <FontAwesomeIcon icon={showArchive ? faArrowUp : faArrowDown} />
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
      >
        | Bin |<span>X</span>
        <FontAwesomeIcon icon={showBin ? faArrowUp : faArrowDown} />
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
