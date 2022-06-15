import "../firebase";
import {
  getFirestore,
  setDoc,
  collection,
  doc,
  addDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const firestore = getFirestore();

export async function createUser(uid, data) {
  try {
    const newUserRef = doc(collection(firestore, "users"));
    await setDoc(newUserRef, { uid, ...data }, { merge: true });
  } catch (err) {
    console.log(err);
  }
}

export async function createScribble(uid, data) {
  console.log("Create Scribble function called");
  console.log(uid, data);
  try {
    await addDoc(collection(firestore, "scribbles"), {
      authorId: uid,
      ...data,
    });

    console.log("document added");
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUserScribbles(uid) {
  try {
    return doc(
      collection(firestore, "scribbles"),
      where("authorId", "==", uid)
    );
  } catch (err) {
    console.log(err);
  }
}

export async function updateScribble(id, newValues) {
  const existingScribble = doc(firestore, "scribbles", id);

  await updateDoc(existingScribble, newValues);
}

export default firestore;
