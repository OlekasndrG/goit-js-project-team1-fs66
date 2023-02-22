import { getDatabase, ref, set, update } from 'firebase/database';

//   localStorage.setItem('keya',testing.key)
//   const theme = localStorage.getItem('keya')
//   console.log(theme);

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

