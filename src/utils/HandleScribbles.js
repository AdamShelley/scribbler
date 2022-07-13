import {
  createScribble,
  deleteScribble,
  updateScribble,
  archiveScribble,
  restoreScribble,
  getAllUserScribbles,
} from "./db";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./toastOptions";

export const saveScribbleToDatabase = async (
  markdown,
  title,
  scribbles,
  selectedScribble,
  setSelectedScribble,
  setScribbles,
  userId
) => {
  // If Scribble exists, update it

  if (selectedScribble.id) {
    updateScribble(selectedScribble.id, {
      body: markdown,
      title,
    });

    console.log(selectedScribble);
    // setSelectedScribble((prev) => []);
    selectedScribble.title = title;
    selectedScribble.body = markdown;
    // Remove current scribble & reinsert

    scribbles.forEach((scribble) => {
      if (scribble.id === selectedScribble.id) {
        scribble = {
          body: markdown,
          title,
          unsaved: false,
        };
      }
    });

    toast.success("The update was successful!", toastOptions);
  } else {
    // Create new document

    const newScribble = {
      body: markdown,
      title,
      createdAt: new Date().toISOString(),
      temp: false,
      archived: false,
      deleted: false,
      authorId: userId,
      unsaved: false,
    };

    createScribble(userId, newScribble);

    getAllUserScribbles(userId).then((result) => setScribbles(result));

    toast.success("Created new Scribble!", toastOptions);
  }
};

export const deleteScribbleFromDatabase = (
  scribbles,
  selectedScribbleId,
  setScribbles,
  setSelectedScribble
) => {
  try {
    deleteScribble(selectedScribbleId);
    const scribbleList = scribbles.filter((scribble) => {
      return scribble.id !== selectedScribbleId;
    });

    setScribbles(scribbleList);
    setSelectedScribble(scribbleList[0]);
    toast.success("Scribble deleted", toastOptions);
  } catch (err) {
    console.log(err);
  }
};

export const moveScribbleToBin = (
  scribble,
  scribbles,
  setScribbles,
  setDelete,
  userId
) => {
  try {
    archiveScribble(scribble, "deleted");
    getAllUserScribbles(userId, "deleted").then((result) => setDelete(result));
    getAllUserScribbles(userId).then((result) => setScribbles(result));
  } catch (err) {
    console.log(err);
  }
};

export const archiveScribbleInDatabase = async (
  scribble,
  scribbles,
  setScribbles,
  setArchived,
  uid
) => {
  // Database call to delete from existing Collection and add to archive collection.
  try {
    archiveScribble(scribble);

    // Remove the archived scribble from the scribbles list
    const scribbleList = scribbles.filter((existing) => {
      return existing.id !== scribble.id;
    });
    setScribbles(scribbleList);

    const archivedScribbles = await getAllUserScribbles(
      scribble.authorId,
      "archive"
    );

    setArchived(archivedScribbles);

    toast.success("Scribble Archived", toastOptions);
  } catch (error) {
    console.log(error);
  }
};

export const restoreScribbleToMain = (
  scribble,
  scribbles,
  setScribbles,
  prevLoc,
  setPrevLoc
) => {
  // Restore scribble to the main section
  restoreScribble(scribble, prevLoc);

  // Remove from prevList
  setPrevLoc((prev) =>
    prev.filter((existing) => {
      return existing.id !== scribble.id;
    })
  );
  // Add to main list
  scribble.archived = false;
  scribble.deleted = false;
  setScribbles((prev) => [...prev, scribble]);
};
