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

import {
  StyledScribbleContainer,
  StyledSearchBar,
  StyledNoteContainer,
} from "../styles/NoteStyles";
import {
  saveScribbleToDatabase,
  moveScribbleToBin,
} from "../utils/HandleScribbles";

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
}) => {
  const [markdown, setMarkdown] = useState(
    selectedScribble ? selectedScribble : "#### Write some markdown here"
  );

  const [title, setTitle] = useState(
    selectedScribble ? selectedScribble.title : ""
  );
  const [showResults, setShowResults] = useState(settings.showMD);
  const [showMarkdown, setShowMarkdown] = useState(true);

  const auth = useAuth();

  const saveScribbleToDatabaseHandler = () => {
    saveScribbleToDatabase(
      markdown,
      title,
      scribbles,
      selectedScribble,
      setSelectedScribble,
      setScribbles,
      auth.user.uid
    );

    resetSaveDot(selectedScribble);
  };

  const deleteScribbleHandler = () => {
    moveScribbleToBin(
      selectedScribble,
      setScribbles,
      setDeleted,
      setArchived,
      auth.user.uid
    );
  };

  const filterResults = () => {};

  return (
    <StyledScribbleContainer>
      <StyledSearchBar>
        <div>
          <FontAwesomeIcon
            className="show-results"
            icon={faFilter}
            onClick={filterResults}
            data-tip="Filter by: "
          />
          <FontAwesomeIcon
            className="show-results"
            icon={showMarkdown ? faEyeSlash : faEye}
            onClick={() => setShowMarkdown((prev) => !prev)}
            data-tip="Show/Hide Pad"
          />
        </div>
        <div>
          <FontAwesomeIcon
            className="show-results"
            icon={showResults ? faEyeSlash : faEye}
            onClick={() => setShowResults((prev) => !prev)}
            data-tip="Show/Hide Markdown Preview"
          />

          <FontAwesomeIcon
            className="show-results"
            icon={faFloppyDisk}
            onClick={saveScribbleToDatabaseHandler}
            data-tip="Save"
          />
          <FontAwesomeIcon
            className="show-results"
            icon={faTrash}
            onClick={deleteScribbleHandler}
            data-tip="Delete"
          />
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
              markdown={markdown}
              setMarkdown={setMarkdown}
              scribbles={scribbles}
              selectedScribble={selectedScribble}
              setTitle={setTitle}
              showResults={showResults}
              showMarkdown={showMarkdown}
              updateScribblesWithoutDatabasePush={
                updateScribblesWithoutDatabasePush
              }
            />
          )}
        </div>
        <ToastContainer closeButton={false} />
      </StyledNoteContainer>
    </StyledScribbleContainer>
  );
};

export default NoteContainer;
