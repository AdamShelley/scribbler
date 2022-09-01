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
  getDoc,
} from "firebase/firestore";

const firestore = getFirestore();

export async function createUser(uid, data) {
  // console.log("creating user");
  try {
    const newUserRef = doc(firestore, "users", uid);
    setDoc(newUserRef, { uid, ...data }, { merge: true });

    createSettings(uid);
  } catch (err) {
    console.log(err);
  }
}

export async function createScribble(uid, data) {
  try {
    return await addDoc(collection(firestore, "scribbles"), {
      authorId: uid,
      ...data,
      archived: false,
      deleted: false,
      unsaved: false,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createSettings(uid) {
  // console.log("checking for settings");
  const settings = doc(firestore, "settings", uid);

  const settingsSnapshot = await getDoc(settings);

  if (settingsSnapshot.exists()) {
    console.log("doc exists");
  } else {
    try {
      await addDoc(
        collection(firestore, "settings"),
        {
          userId: uid,
          options: {
            expandScribbles: true,
            expandArchive: false,
            expandBin: false,
            showMD: false,
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
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
