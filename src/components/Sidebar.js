import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSidebar } from "../styles/SidebarStyles";
import {
  faArrowDown,
  faArrowUp,
  faFloppyDisk,
  faTrash,
  faBoxArchive,
} from "@fortawesome/free-solid-svg-icons";
import OptionsMenu from "./OptionsMenu";

const Sidebar = ({
  scribbles,
  selectedScribble,
  changeScribble,
  createNewScribble,
}) => {
  const [showArchive, setShowArchive] = useState(false);

  const createBlankScribble = () => {
    createNewScribble();
  };

  return (
    <StyledSidebar>
      <div>
        <h3>Scribbles</h3>
        <span onClick={createBlankScribble}>+</span>
      </div>

      <ul>
        {scribbles ? (
          scribbles.map((scribble) => (
            <li
              key={scribble.id || "temp"}
              onClick={() => changeScribble(scribble)}
              className={`${
                selectedScribble.title === scribble.title
                  ? "selected-scribble"
                  : ""
              }`}
            >
              <OptionsMenu scribble={scribble} />
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
          <li>archived scribble</li>
          <li>archived scribble</li>
          <li>archived scribble</li>
          <li>archived scribble</li>
        </ul>
      )}
    </StyledSidebar>
  );
};

export default Sidebar;
