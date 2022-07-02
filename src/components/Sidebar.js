import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledSidebar } from "../styles/SidebarStyles";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import OptionsMenu from "./OptionsMenu";

const Sidebar = ({
  scribbles,
  archived,
  selectedScribble,
  changeScribble,
  createNewScribble,
}) => {
  const [showArchive, setShowArchive] = useState(false);

  const createBlankScribble = () => {
    createNewScribble();
  };

  const archiveScribble = (scribble) => {
    console.log(scribble);
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
              <OptionsMenu />
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
