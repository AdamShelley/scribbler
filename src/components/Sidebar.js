import React, { useState } from "react";
import { useAuth } from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSidebar } from "../styles/SidebarStyles";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import {
  saveScribbleToDatabase,
  deleteScribbleFromDatabase,
  archiveScribbleInDatabase,
} from "../utils/HandleScribbles";
import OptionsMenu from "./OptionsMenu";

const Sidebar = ({
  scribbles,
  archived,
  selectedScribble,
  changeScribble,
  createNewScribble,
  setScribbles,
  setSelectedScribble,
}) => {
  const [showArchive, setShowArchive] = useState(true);
  const [currentRightClickedScribble, setCurrentRightClickedScribble] =
    useState(null);
  const { uid } = useAuth();

  const archiveScribbleHandler = () => {
    console.log("archiving scribble");
    console.log(currentRightClickedScribble);
    archiveScribbleInDatabase(uid, currentRightClickedScribble);
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
  const deleteScribble = () => {
    deleteScribbleFromDatabase(
      archiveScribbleInDatabase,
      selectedScribble.id,
      setScribbles,
      setSelectedScribble
    );
  };

  const copyScribble = () => {
    console.log("Copy scribble");
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
        deleteScribbleHandler={deleteScribble}
        copyScribble={copyScribble}
      />

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
      {showArchive && (
        <ul>
          {archived
            ? archived.map((scribble) => (
                <li
                  key={scribble.id + "-archive"}
                  onClick={() => changeScribble(scribble)}
                  className={`${
                    selectedScribble.title === scribble.title
                      ? "selected-scribble"
                      : ""
                  }`}
                >
                  {scribble.title}
                </li>
              ))
            : ""}
        </ul>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
