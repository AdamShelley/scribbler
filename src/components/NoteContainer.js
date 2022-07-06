import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyNote from "./EmptyNote";
import Note from "./Note";
import { deleteScribble } from "../utils/db";
import { useAuth } from "../utils/auth";
import { toastOptions } from "../utils/toastOptions";
import Button from "../styles/Button";
import {
  StyledScribbleContainer,
  StyledSearchBar,
  StyledNoteContainer,
} from "../styles/NoteStyles";
import {
  saveScribbleToDatabase,
  deleteScribbleHandler,
} from "../utils/HandleScribbles";
import useKeyPress from "../utils/useKeyPress";

const NoteContainer = ({
  scribbles,
  selectedScribble,
  setScribbles,
  setSelectedScribble,
  updateScribblesWithoutDatabasePush,
  resetSaveDot,
}) => {
  const [markdown, setMarkdown] = useState(
    selectedScribble ? selectedScribble : "#### Write some markdown here"
  );

  const [title, setTitle] = useState(
    selectedScribble ? selectedScribble.title : ""
  );
  const [showResults, setShowResults] = useState(false);
  const [showMarkdown, setShowMarkdown] = useState(true);
  const [saving, setSaving] = useState(false);
  const auth = useAuth();
  const keyPressed = useKeyPress();

  const saveScribbleToDatabaseHandler = () => {
    saveScribbleToDatabase(
      markdown,
      title,
      scribbles,
      selectedScribble,
      setScribbles,
      auth.user.uid
    );

    resetSaveDot(selectedScribble);
  };

  const deleteScribbleHandler = () => {
    deleteScribble(selectedScribble.id);
    const scribbleList = scribbles.filter((scribble) => {
      return scribble.id !== selectedScribble.id;
    });

    setScribbles(scribbleList);
    setSelectedScribble(scribbleList[0]);
    toast.success("Scribble deleted", toastOptions);
  };

  return (
    <StyledScribbleContainer>
      <StyledSearchBar>
        <FontAwesomeIcon
          className="show-results"
          icon={showMarkdown ? faEyeSlash : faEye}
          onClick={() => setShowMarkdown((prev) => !prev)}
        />
        <div>
          <FontAwesomeIcon
            className="show-results"
            icon={showResults ? faEyeSlash : faEye}
            onClick={() => setShowResults((prev) => !prev)}
          />
          <Button
            onClick={saveScribbleToDatabaseHandler}
            disabled={saving}
            margin="0 0.3rem"
          >
            {saving ? "Saving" : "Save"}
          </Button>
          <Button onClick={deleteScribbleHandler}>Delete</Button>
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
