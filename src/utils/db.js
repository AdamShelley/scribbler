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
  if (!uid) return;
  try {
    const scribblesRef = collection(firestore, "scribbles");
    const q = query(scribblesRef, where("authorId", "==", uid));
    const querySnapshot = await getDocs(q);
    const scribbleList = [];
    console.log("Checking snapshot");
    querySnapshot.forEach((doc) => {
      scribbleList.push({ ...doc.data(), id: doc.id });
    });

    return scribbleList;
  } catch (err) {
    console.log("There has been an issue fetching user scribbles");
    console.log(err);
  }
}

export async function updateScribble(id, newValues) {
  const existingScribble = doc(firestore, "scribbles", id);

  await updateDoc(existingScribble, newValues);
}

export default firestore;
