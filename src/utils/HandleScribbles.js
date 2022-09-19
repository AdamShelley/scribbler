import {
  createScribble,
  deleteScribble,
  updateScribble,
  archiveScribble,
  restoreScribble,
  getAllUserScribbles,
  getSingleDocument,
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
  sessionStorage.removeItem("scribbles");

  // If Scribble exists, update it
  if (selectedScribble.id) {
    updateScribble(selectedScribble.id, {
      ...selectedScribble,
      body: markdown,
      title,
    });

    const updatedDoc = await getSingleDocument(selectedScribble.id);

    // Get the index of the scribble
    const findIndex = scribbles.findIndex(
      (scribbles) => scribbles.id === selectedScribble.id
    );

    // Remove the old scribble

    const prevScribbles = scribbles.filter(
      (scribble) => scribble.id !== selectedScribble.id
    );

    // Replace with the new one in the correct Index
    prevScribbles.splice(findIndex, 0, updatedDoc);

    setScribbles(prevScribbles);

    sessionStorage.setItem("scribbles", JSON.stringify(prevScribbles));

    toast.success("Scribble Saved!", { ...toastOptions, toastId: "Saving" });
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

    getAllUserScribbles(userId).then((result) => {
      setScribbles(result);
      sessionStorage.setItem("scribbles", JSON.stringify(result));
    });

    toast.success("Created new Scribble!", toastOptions);
  }
};

export const deleteScribbleFromDatabase = async (
  rightClickedScribble,
  setDeleted,
  userId
) => {
  try {
    await deleteScribble(rightClickedScribble.id);

    const deletedScribbles = await getAllUserScribbles(userId, "deleted");
    setDeleted(deletedScribbles);

    sessionStorage.removeItem("deleted");

    toast.success("Scribble Deleted", toastOptions);
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
    let currentCollection = scribble?.archived ? "archive" : "scribbles";

    await archiveScribble(scribble, "deleted", currentCollection);

    if (currentCollection === "archive") {
      const archivedScribbles = await getAllUserScribbles(userId, "archive");
      setArchived(archivedScribbles);
      sessionStorageRefresh("archived", archivedScribbles);
    } else {
      const userScribbles = await getAllUserScribbles(userId);
      setScribbles(userScribbles);
      sessionStorageRefresh("scribbles", userScribbles);
    }

    const deletedScribbles = await getAllUserScribbles(userId, "deleted");
    setDelete(deletedScribbles);

    sessionStorageRefresh("deleted", deletedScribbles);

    toast.success(`Scribble moved to Bin`, toastOptions);
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
    await archiveScribble(scribble, "archive");

    const userScribbles = await getAllUserScribbles(userId);
    setScribbles(userScribbles);
    sessionStorageRefresh("scribbles", userScribbles);
    const archivedScribbles = await getAllUserScribbles(userId, "archive");
    setArchived(archivedScribbles);
    sessionStorageRefresh("archived", archivedScribbles);

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
    console.log(prevLoc);
    await restoreScribble(scribble, prevLoc);

    const prevLocScribbles = await getAllUserScribbles(userId, prevLoc);
    setPrevLoc(prevLocScribbles);
    sessionStorageRefresh(prevLoc, prevLocScribbles);
    const userScribbles = await getAllUserScribbles(userId);
    setScribbles(userScribbles);
    sessionStorageRefresh("scribbles", userScribbles);
  } catch (err) {
    console.log(err);
  }
};

const sessionStorageRefresh = (store, data) => {
  sessionStorage.removeItem(store);

  sessionStorage.setItem(store, JSON.stringify(data));
};
