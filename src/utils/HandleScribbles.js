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
    getAllUserScribbles(userId).then((result) => setScribbles(result));
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

export const moveScribbleToBin = async (
  scribble,
  setScribbles,
  setDelete,
  setArchived,
  userId
) => {
  try {
    let currentCollection = scribble?.archived ? "archive" : "";

    await archiveScribble(scribble, "deleted", currentCollection);
    const userScribbles = await getAllUserScribbles(userId);
    setScribbles(userScribbles);

    const archivedScribbles = await getAllUserScribbles(userId, "archive");
    setArchived(archivedScribbles);

    const deletedScribbles = await getAllUserScribbles(userId, "deleted");
    setDelete(deletedScribbles);

    toast.success(`Scribble Deleted`, toastOptions);
  } catch (err) {
    console.log(err);
  }
};

export const archiveScribbleInDatabase = async (
  scribble,
  setScribbles,
  setArchived,
  userId
) => {
  // Database call to delete from existing Collection and add to archive collection.
  try {
    await archiveScribble(scribble);

    const userScribbles = await getAllUserScribbles(userId);
    setScribbles(userScribbles);
    const archivedScribbles = await getAllUserScribbles(userId, "archive");
    setArchived(archivedScribbles);

    toast.success("Scribble Archived", toastOptions);
  } catch (error) {
    console.log(error);
  }
};

export const restoreScribbleToMain = async (
  scribble,
  setScribbles,
  prevLoc,
  setPrevLoc,
  userId
) => {
  // Restore scribble to the main section
  try {
    await restoreScribble(scribble, prevLoc);

    const prevLocScribbles = await getAllUserScribbles(userId, prevLoc);
    setPrevLoc(prevLocScribbles);
    const userScribbles = await getAllUserScribbles(userId);
    setScribbles(userScribbles);
  } catch (err) {
    console.log(err);
  }
};
