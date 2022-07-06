import {
  createScribble,
  deleteScribble,
  updateScribble,
  archiveScribble,
  restoreScribble,
} from "./db";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./toastOptions";

export const saveScribbleToDatabase = (
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
    };

    createScribble(userId, newScribble);
    const scribbleList = scribbles.filter((scribble) => {
      return scribble.temp !== true;
    });

    scribbleList.push(newScribble);
    setScribbles(scribbleList);

    toast.success("Created new Scribble!", toastOptions);
  }
};

export const deleteScribbleFromDatabase = (
  scribbles,
  selectedScribbleId,
  setScribbles,
  setSelectedScribble
) => {
  deleteScribble(selectedScribbleId);
  const scribbleList = scribbles.filter((scribble) => {
    return scribble.id !== selectedScribbleId;
  });

  setScribbles(scribbleList);
  setSelectedScribble(scribbleList[0]);
  toast.success("Scribble deleted", toastOptions);
};

export const moveScribbleToBin = (
  scribble,
  scribbles,
  setScribbles,
  setDeleted
) => {
  archiveScribble(scribble, "deleted");
};

export const archiveScribbleInDatabase = (
  scribble,
  scribbles,
  setScribbles,
  setArchived
) => {
  // Database call to delete from existing Collection and add to archive collection.
  archiveScribble(scribble);

  // Remove the archived scribble from the scribbles list
  const scribbleList = scribbles.filter((existing) => {
    return existing.id !== scribble.id;
  });
  setScribbles(scribbleList);

  scribble.archived = true;
  scribble.deleted = false;
  // Add the archived scribble to the archived section
  setArchived((scribbles) => [...scribbles, scribble]);

  toast.success("Scribble Archived", toastOptions);
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
