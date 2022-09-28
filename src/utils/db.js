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
} from "firebase/firestore";

const firestore = getFirestore();

// USER & SETTINGS

export async function createUser(uid, data) {
  // console.log("creating user");
  try {
    const newUserRef = doc(firestore, "users", uid);
    setDoc(newUserRef, { uid, ...data }, { merge: true });
    console.log("Created new User");
    //Create new user settings if non available
    createSettings(uid);
  } catch (err) {
    console.log(err);
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
  } catch (error) {
    console.log(error);
  }
}

export async function createSettings(uid) {
  const settings = doc(firestore, "settings", uid);
  const settingsDoc = await getDoc(settings);
  if (!settingsDoc.exists()) {
    return await setDoc(
      settings,
      {
        expandScribbles: "Yes",
        expandArchive: "Yes",
        expandBin: "No",
        showMD: false,
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
      timestamp: serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }
}

// Creates settings if the user has no settings in firebase already

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
      scribbleList.push({ ...doc.data(), id: doc.id });
    });

    const orderedScribbles = await sortScribbles(scribbleList, scribbleOrder);

    return orderedScribbles;
  } catch (err) {
    console.log("There has been an issue fetching user scribbles");
    console.log(err);
  }
}

export async function sortScribbles(data, sortMethod) {
  // console.log("Sorting Scribbles");
  // console.log(sortMethod);
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
  } catch (error) {
    console.log(error);
  }
}

export async function updateScribble(uid, newValues) {
  const existingScribble = doc(firestore, "scribbles", uid);

  return await updateDoc(existingScribble, {
    ...newValues,
    timestamp: serverTimestamp(),
  });
}

export async function archiveScribble(
  data,
  loc = "archive",
  prevLoc = "scribbles"
) {
  try {
    console.log([data, loc, prevLoc]);

    await deleteScribble(data.id, prevLoc);
    await addDoc(collection(firestore, loc), {
      ...data,
      archived: loc === "archive" ? true : false,
      deleted: loc === "deleted" ? true : false,
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
}

export async function deleteScribble(uid, collection = "deleted") {
  deleteDoc(doc(firestore, collection, uid));
}

export default firestore;
