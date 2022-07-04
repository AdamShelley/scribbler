import { compareDesc, compareAsc, parseISO } from "date-fns";
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
} from "firebase/firestore";

const firestore = getFirestore();

export async function createUser(uid, data) {
  try {
    const newUserRef = doc(firestore, "users", uid);
    setDoc(newUserRef, { uid, ...data }, { merge: true });
  } catch (err) {
    console.log(err);
  }
}

export async function createScribble(uid, data) {
  console.log("Create Scribble function called");
  console.log(uid, data);
  try {
    return await addDoc(collection(firestore, "scribbles"), {
      authorId: uid,
      ...data,
      archived: false,
      deleted: false,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUserScribbles(uid, col = "scribbles") {
  if (!uid) return;
  try {
    const scribblesRef = collection(firestore, col);
    const q = query(scribblesRef, where("authorId", "==", uid));
    const querySnapshot = await getDocs(q);
    const scribbleList = [];

    querySnapshot.forEach((doc) => {
      scribbleList.push({ ...doc.data(), id: doc.id });
    });

    scribbleList.sort((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );

    return scribbleList;
  } catch (err) {
    console.log("There has been an issue fetching user scribbles");
    console.log(err);
  }
}

export async function getAllUserArchivedScribbles(uid) {
  if (!uid) return;

  try {
  } catch (err) {
    console.log(err);
  }
}

export async function updateScribble(uid, newValues) {
  console.log(newValues);
  const existingScribble = doc(firestore, "scribbles", uid);

  return await updateDoc(existingScribble, {
    ...newValues,
    timestamp: serverTimestamp(),
  });
}

export async function archiveScribble(uid, data) {
  console.log(data);

  try {
    await addDoc(collection(firestore, "archive"), {
      authorId: uid,
      archived: true,
      deleted: false,
      ...data,
    });
    deleteScribble(data.id);
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

export async function deleteScribble(id, collection = "scribbles") {
  deleteDoc(doc(firestore, collection, id));
}

export default firestore;
