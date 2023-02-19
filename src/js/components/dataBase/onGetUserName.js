import { getDatabase, ref, child, get } from "firebase/database";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
Notify.init({
  timeout: 50000,
  clickToClose: true,
});
export const onGetUserName = function(userId){
const dbRef = ref(getDatabase());
get(child(dbRef, `users/${userId}`)).then((snapshot) => {
  if (snapshot.exists()) {
      const user = snapshot.val()
      Notify.success(`Команда номер 1 вітає Вас ${user.name}`)
  } else {
    console.log("No data available");
  }
})
.catch((error) => {
  console.error(error);
});
}