import React, { useState } from "react";
import styled from "styled-components";
import EmptyNote from "./EmptyNote";
import Note from "./Note";
import { createScribble, updateScribble, deleteScribble } from "../utils/db";
import { useAuth } from "../utils/auth";
import Button from "../styles/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledScribbleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledSearchBar = styled.div`
  background-color: var(--dark-grey);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2.5rem;

  span {
    padding: 0 1rem;
  }

  h3 {
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 1px;
  }
`;

const StyledNoteContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* min-height: 100%;
  min-width: 100%; */
  flex-grow: 100;
  cursor: auto;
  position: relative;
`;

const toastOptions = {
  position: "bottom-right",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

const NoteContainer = ({ scribbles, selectedScribble, setScribbles }) => {
  const [markdown, setMarkdown] = useState(
    selectedScribble ? selectedScribble : "#### Write some markdown here"
  );
  const [title, setTitle] = useState(
    selectedScribble ? selectedScribble.title : ""
  );

  const [saving, setSaving] = useState(false);
  const auth = useAuth();

  const saveScribbleToDatabase = () => {
    // If Scribble exists, update it

    setSaving(true);
    if (selectedScribble.id) {
      updateScribble(selectedScribble.id, {
        body: markdown,
        title,
      });

      selectedScribble.title = title;
      selectedScribble.body = markdown;
      toast.success("The update was successful!", toastOptions);
      setSaving(false);
    } else {
      // Create new document
      console.log("Creating new scribble");

      createScribble(auth.user.uid, {
        body: markdown,
        title, // Make Dynamic
      });
      toast.success("Created new Scribble!", toastOptions);
      setSaving(false);
    }
  };

  const deleteScribbleHandler = () => {
    deleteScribble(selectedScribble.id);
    toast.success("Scribble deleted", toastOptions);
  };

  return (
    <StyledScribbleContainer>
      <StyledSearchBar>
        <h3>Search</h3>
        <div>
          <Button onClick={saveScribbleToDatabase} disabled={saving}>
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
            />
          ) : (
            <Note
              markdown={markdown}
              setMarkdown={setMarkdown}
              scribbles={scribbles}
              selectedScribble={selectedScribble}
              setTitle={setTitle}
            />
          )}
        </div>
        <ToastContainer closeButton={false} />
      </StyledNoteContainer>
    </StyledScribbleContainer>
  );
};

export default NoteContainer;
