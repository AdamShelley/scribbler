import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSidebar } from "../styles/SidebarStyles";
import {
  faArrowDown,
  faArrowUp,
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
  settings,
}) => {
  const [showScribbles, setShowScribbles] = useState(settings.expandScribbles);
  const [showArchive, setShowArchive] = useState(settings.expandArchive);
  const [showBin, setShowBin] = useState(settings.expandBin);
  const [showConfirm, setShowConfirm] = useState(false);
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
      currentRightClickedScribble,
      setDeleted,
      user.uid
    );
  };

  const deleteAllScribblesInBin = () => {
    console.log("Delete all scribbles");

    deleted.forEach((deletedScribble) => {
      deleteScribbleFromDatabase(deletedScribble, setDeleted, user.uid);
    });

    setShowConfirm(false);
  };

  const copyScribbleHandler = () => {
    console.log("Copy scribble");
  };

  const showConfirmDeleteButton = () => {
    setShowConfirm(true);
    const confirmTimeout = setTimeout(() => {
      setShowConfirm(false);
    }, 3000);

    return () => {
      clearTimeout(confirmTimeout);
    };
  };

  return (
    <StyledSidebar>
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
        <div className="scribble-button-container">
          <div>
            <FontAwesomeIcon icon={!showScribbles ? faArrowUp : faArrowDown} />
            <h4>| Scribbles |</h4>
          </div>

          <FontAwesomeIcon
            onClick={(e) => {
              e.stopPropagation();
              createNewScribble();
            }}
            icon={faPlus}
            data-tip="New Scribble"
          />
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
                <h3>{scribble.title.slice(0, 35)}</h3>
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
          <div>
            <FontAwesomeIcon icon={!showArchive ? faArrowUp : faArrowDown} />
            <h4>| Archive |</h4>
          </div>
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
          <div>
            <FontAwesomeIcon icon={!showBin ? faArrowUp : faArrowDown} />
            <h4>| Bin |</h4>
          </div>
        </div>
      </button>

      {showBin && deleted.length > 0 && (
        <>
          <ul>
            {deleted
              ? deleted.map((scribble) => (
                  <li
                    key={scribble.id + "-deleted"}
                    onClick={() => changeScribble(scribble)}
                    onContextMenu={() =>
                      setCurrentRightClickedScribble(scribble)
                    }
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
          <div className="delete-all-container">
            {!showConfirm && (
              <button
                onClick={showConfirmDeleteButton}
                className="delete-all-button"
              >
                Empty Bin
              </button>
            )}
            {showConfirm && (
              <button
                onClick={deleteAllScribblesInBin}
                className="delete-all-button"
              >
                Confirm Deletion
              </button>
            )}
          </div>
        </>
      )}
      {/* {showBin && deleted.length === 0 && <ul>Empty</ul>} */}
    </StyledSidebar>
  );
};

export default Sidebar;
