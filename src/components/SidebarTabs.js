import React, { useState } from "react";
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
  deleteAllScribblesInBin,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

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

          {naming === "Scribbles" && (
            <FontAwesomeIcon
              onClick={(e) => {
                e.stopPropagation();
                createNewScribble();
              }}
              icon={faPlus}
            />
          )}

          {naming === "Bin" && showScribbles && scribbles.length > 0 && (
            <FontAwesomeIcon
              onClick={(e) => {
                e.stopPropagation();
                showConfirmDeleteButton();
              }}
              icon={showConfirm ? faTrashCanArrowUp : faTrashCan}
              style={{ opacity: 0.9 }}
            />
          )}
        </div>
      </button>

      {showScribbles && scribbles?.length >= 1 && (
        <>
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
          {naming === "Bin" && showConfirm && (
            <div className="delete-all-container">
              <button
                onClick={() => {
                  deleteAllScribblesInBin();
                  setShowConfirm(false);
                }}
                className="delete-all-button"
              >
                Confirm Deletion
              </button>
            </div>
          )}
        </>
      )}

      {showScribbles && scribbles?.length === 0 && (
        <p className="empty-section">You have no scribbles here!</p>
      )}
    </>
  );
};

export default SidebarTabs;
