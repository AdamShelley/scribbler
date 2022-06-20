import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmptyNote from "./EmptyNote";
import Note from "./Note";
import { createScribble, updateScribble, deleteScribble } from "../utils/db";
import { useAuth } from "../utils/auth";
import { toastOptions } from "../utils/toastOptions";
import Button from "../styles/Button";
import {
  StyledScribbleContainer,
  StyledSearchBar,
  StyledNoteContainer,
} from "../styles/NoteStyles";
import { saveScribbleToDatabase } from "../utils/HandleScribbles";

const NoteContainer = ({
  scribbles,
  selectedScribble,
  setScribbles,
  setSelectedScribble,
}) => {
  const [markdown, setMarkdown] = useState(
    selectedScribble ? selectedScribble : "#### Write some markdown here"
  );
  const [title, setTitle] = useState(
    selectedScribble ? selectedScribble.title : ""
  );
  const [showResults, setShowResults] = useState(true);
  const [saving, setSaving] = useState(false);
  const auth = useAuth();

  const saveScribbleToDatabaseHandler = () => {
    saveScribbleToDatabase(
      markdown,
      title,
      scribbles,
      selectedScribble,
      setScribbles,
      auth.user.uid
    );
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
        <h3>Search</h3>
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
            />
          )}
        </div>
        <ToastContainer closeButton={false} />
      </StyledNoteContainer>
    </StyledScribbleContainer>
  );
};

export default NoteContainer;
