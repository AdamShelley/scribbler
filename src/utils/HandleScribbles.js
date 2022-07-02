import { createScribble, updateScribble } from "./db";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./toastOptions";

export const saveScribbleToDatabase = (
  markdown,
  title,
  scribbles,
  selectedScribble,
  setScribbles,
  userId
) => {
  // If Scribble exists, update it

  if (selectedScribble.id) {
    updateScribble(selectedScribble.id, {
      body: markdown,
      title,
    });

    selectedScribble.title = title;
    selectedScribble.body = markdown;
    // Remove current scribble & reinsert
    scribbles.forEach((scribble) => {
      if (scribble.id === selectedScribble.id) {
        scribble = {
          body: markdown,
          title,
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

export const deleteScribble = (
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

export const archiveScribble = (scribble) => {
  console.log(scribble);
};
