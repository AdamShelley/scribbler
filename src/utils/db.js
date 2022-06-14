import "../firebase";
import { getFirestore } from "firebase/firestore";

const firestore = getFirestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export default firestore;
