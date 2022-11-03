import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPlus,
  faTrashCan,
  faTrashCanArrowUp,
} from "@fortawesome/free-solid-svg-icons";

const SidebarTabs = ({
  naming,
  setShowScribbles,
  setCurrentRightClickedScribble,
  showScribbles,
  scribbles,
  createNewScribble,
  changeScribble,
  selectedScribble,
}) => {
  return (
    <>
      <button
        className="archive-button"
        onClick={() => setShowScribbles((prev) => !prev)}
        onContextMenu={() => setCurrentRightClickedScribble(null)}
      >
        <div className="scribble-button-container">
          <div>
            <FontAwesomeIcon icon={!showScribbles ? faArrowUp : faArrowDown} />
            <h4>| {naming} |</h4>
          </div>

          <FontAwesomeIcon
            onClick={(e) => {
              e.stopPropagation();
              createNewScribble();
            }}
            icon={faPlus}
          />
        </div>
      </button>

      {showScribbles && scribbles?.length >= 1 && (
        <ul>
          {scribbles ? (
            scribbles.map((scribble, index) => (
              <li
                key={scribble?.id || `temp-${index}`}
                onClick={() => changeScribble(scribble)}
                onContextMenu={() => setCurrentRightClickedScribble(scribble)}
                className={`${
                  selectedScribble?.id === scribble?.id
                    ? "selected-scribble"
                    : ""
                }`}
              >
                <h3>{scribble?.title?.slice(0, 35)}</h3>
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

      {showScribbles && scribbles?.length === 0 && (
        <p className="empty-section">You have no Scribbles!</p>
      )}
    </>
  );
};

export default SidebarTabs;
