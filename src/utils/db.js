import "../firebase";
import {
  getFirestore,
  setDoc,
  collection,
  doc,
  addDoc,
  updateDoc,
  where,
  query,
  getDocs,
  serverTimestamp,
  deleteDoc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { DatabaseError } from "./error";

const firestore = getFirestore();

// USER & SETTINGS

export async function createUser(uid, data) {
  try {
    const newUserRef = doc(firestore, "users", uid);
    setDoc(newUserRef, { uid, ...data }, { merge: true });
    //Create new user settings if non available
    createSettings(uid);
  } catch (err) {
    throw new DatabaseError(
      "Cannot create new user, please try again.",
      504,
      err
    );
  }
}

export async function getUserSettings(uid) {
  if (!uid) return;

  try {
    const docRef = doc(firestore, "settings", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    throw new DatabaseError(
      "Cannot get user settings, please try again.",
      500,
      err
    );
  }
}

export async function createSettings(uid) {
  const settings = doc(firestore, "settings", uid);
  const settingsDoc = await getDoc(settings);
  if (!settingsDoc.exists()) {
    return await setDoc(
      settings,
      {
        authorId: uid,
        expandScribbles: "Yes",
        expandArchive: "Yes",
        expandBin: "No",
        showMD: "No",
        scribbleOrder: "Newest",
        autosave: 30000,
      },
      { merge: true }
    );
  } else {
    return settingsDoc.data();
  }
}

export async function updateSettings(uid, data) {
  const existingSettings = doc(firestore, "settings", uid);

  return await updateDoc(existingSettings, {
    ...data,
    timestamp: serverTimestamp(),
  });
}

// Scribble functions

export async function createScribble(uid, data) {
  try {
    return await addDoc(collection(firestore, "scribbles"), {
      authorId: uid,
      ...data,
      archived: false,
      deleted: false,
      unsaved: false,
      pinned: false,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    throw new DatabaseError(
      "Cannot create new Scribble, please try again.",
      500,
      err
    );
  }
}

// Creates settings if the user has no settings in firebase already
export async function pinScribble(id, data) {
  console.log(data);
  try {
    const existingScribble = doc(firestore, "scribbles", id);

    return await updateDoc(existingScribble, {
      ...data,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllUserScribbles(
  uid,
  col = "scribbles",
  scribbleOrder = "Newest"
) {
  if (!uid) return;
  try {
    const scribblesRef = collection(firestore, col);
    const q = query(scribblesRef, where("authorId", "==", uid));

    const querySnapshot = await getDocs(q);
    const scribbleList = [];

    querySnapshot.forEach((doc) => {
      scribbleList.push({
        ...doc.data(),
        id: doc.id,
        latestUpdate:
          doc.data().timestamp &&
          new Timestamp(
            doc.data().timestamp.seconds,
            doc.data().timestamp.nanoseconds
          ).toDate(),
      });
    });

    // Pick out pinned scribbles
    const pinnedScribbles = scribbleList.filter((scribble) => {
      return scribble.pinned;
    });

    const nonPinned = scribbleList.filter((scribble) => {
      return !scribble.pinned;
    });

    const orderedScribbles = await sortScribbles(nonPinned, scribbleOrder);

    return [...pinnedScribbles, ...orderedScribbles];
  } catch (err) {
    throw new DatabaseError("Could not get all user scribbles", 500, err);
  }
}

export async function sortScribbles(data, sortMethod) {
  switch (sortMethod) {
    case "Newest":
      return data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    case "Oldest":
      return data.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    case "A-Z":
      return data.sort((a, b) => a.title.localeCompare(b.title));
    case "Z-A":
      return data.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return data;
  }
}

export async function getSingleDocument(docId, col = "scribbles") {
  if (!docId) return;

  try {
    const docRef = doc(firestore, col, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    throw new DatabaseError("Cannot get document, please try again.", 504, err);
  }
}

export async function updateScribble(uid, newValues) {
  if (newValues.temp) return;

  try {
    const existingScribble = doc(firestore, "scribbles", uid);

    await updateDoc(existingScribble, {
      ...newValues,
      title: newValues.title,
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    throw new DatabaseError(
      "Cannot update Scribble, please try again.",
      504,
      err
    );
  }
}

export async function archiveScribble(
  data,
  loc = "archive",
  prevLoc = "scribbles"
) {
  try {
    await deleteScribble(data.id, prevLoc);
    await addDoc(collection(firestore, loc), {
      ...data,
      archived: loc === "archive" ? true : false,
      deleted: loc === "deleted" ? true : false,
    });
  } catch (err) {
    throw new DatabaseError(
      "Cannot archive Scribble, please try again.",
      500,
      err
    );
  }
}

export async function restoreScribble(scribble, prevLoc) {
  try {
    await addDoc(collection(firestore, "scribbles"), {
      ...scribble,
      archived: false,
      deleted: false,
    });
    deleteScribble(scribble.id, prevLoc);
  } catch (err) {
    throw new DatabaseError(
      "Cannot restore Scribble, please try again.",
      500,
      err
    );
  }
}

export async function deleteScribble(uid, collection = "deleted") {
  deleteDoc(doc(firestore, collection, uid));
}

export async function deleteAllScribbles(uid) {
  const buckets = ["scribbles", "archive", "deleted"];
  await deleteCollections(uid, buckets);
}

export async function duplicateScribble(docId, uid) {
  try {
    const existingDoc = await getSingleDocument(docId);

    existingDoc.title = `${existingDoc.title} (-copy)`;
    existingDoc.body = `${existingDoc.body} (-copy)`;
    existingDoc.id = `${existingDoc.id}-copy`;

    await createScribble(uid, existingDoc);
  } catch (err) {
    throw new DatabaseError(
      "Cannot duplicate Scribble, please try again.",
      504,
      err
    );
  }
}

// WIP delete account not fully working
export async function deleteAccount(uid) {
  // Delete scribbes, user & settings
  const buckets = ["scribbles", "archive", "deleted", "settings"];
  await deleteCollections(uid, buckets);

  const auth = getAuth();
  const user = auth.currentUser;

  // Need to reauthenticate
}

async function deleteCollections(uid, buckets) {
  try {
    for (let col in buckets) {
      const scribblesRef = collection(firestore, buckets[col]);
      const scribbleQuery = query(scribblesRef, where("authorId", "==", uid));
      const scribblesSnapshot = await getDocs(scribbleQuery);
      scribblesSnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
      // Clear session storage
      sessionStorage.removeItem(buckets[col]);
    }
  } catch (err) {
    throw new DatabaseError(
      "Cannot delete collection, please try again.",
      504,
      err
    );
  }
}

export default firestore;
