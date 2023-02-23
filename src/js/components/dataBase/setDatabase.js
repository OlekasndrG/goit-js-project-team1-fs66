
import {  getDatabase, ref, set, update } from "firebase/database";



export function writeUserData(userId, object) {
  const database = getDatabase();
  const db = getDatabase();
  set(ref(db, 'users/' + userId), { ...object });
}

export function updateUserCards(userId, object) {
  const database = getDatabase();
  const db = getDatabase();
  update(ref(db, 'users/' + userId), { ...object });
}

