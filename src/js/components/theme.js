const changeThemeBtn = document.querySelector('#sitetheme');
const body = document.querySelector('body');
import { initializeApp } from "firebase/app";
import { onGetCookie } from "./dataBase/getCookie"
import { updateUserCards } from "./dataBase/setDatabase"
import { getDatabase, ref, child, get } from 'firebase/database';
import { async } from "@firebase/util";
const firebaseConfig = {
  apiKey: "AIzaSyCAzOEobkX7zjzKcWCZNu8dhUnsurUUSAw",
  authDomain: "news-goit-1.firebaseapp.com",
  databaseURL: "https://news-goit-1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "news-goit-1",
  storageBucket: "news-goit-1.appspot.com",
  messagingSenderId: "618434101899",
  appId: "1:618434101899:web:58e5277fd4ec3d55f6ca8e",
  measurementId: "G-7YDFYWJH4S"
};
const app = initializeApp(firebaseConfig);


const STORAGE_THEME = "theme";

let storageMemory =  localStorage.getItem(STORAGE_THEME) || undefined;

export function saveLocalStorageTheme(){
   if (onGetCookie('user')) {
    readDataBaseAddClass(onGetCookie('user'))
   } else {
    if(storageMemory === 'dark') {
      body.classList.add('themeDark')
      changeThemeBtn.checked = true;
  }
   }
}
saveLocalStorageTheme(storageMemory);

changeThemeBtn.addEventListener('click', changeTheme);

 function changeTheme() {
  if (onGetCookie('user')) {
    changeThemeData(onGetCookie('user'))
  }
  else {

   if(!localStorage.getItem(STORAGE_THEME)) {
        body.classList.toggle('themeDark')
        changeThemeBtn.checked = true;
        localStorage.setItem(STORAGE_THEME, "dark");
    }
   else  {

    localStorage.removeItem(STORAGE_THEME);

   }
   addDarkClassToHTML()
  }
}

function addDarkClassToHTML() {
  if (onGetCookie('user')) {
    readDataBaseAddClass(onGetCookie('user'))
  } else {
    try {
      if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('themeDark');

      }
      else {
        body.classList.remove('themeDark');
      }
    } catch (err) {}
  }

}
  

function readDataBaseAddClass(userId) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/${userId}/STORAGE_THEME`))
    .then(snapshot => {
      if (snapshot.val() === 'dark') {
        body.classList.add('themeDark')
        changeThemeBtn.checked = true;
      }else{
        body.classList.remove('themeDark');
      }
    })
    .catch(error => {
      error
    });
}

function changeThemeData(userId) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${userId}/STORAGE_THEME`))
    .then(snapshot => {
      if(snapshot.val() === null) {
        body.classList.toggle('themeDark')
        changeThemeBtn.checked = true;
        updateUserCards(onGetCookie('user'), {STORAGE_THEME: "dark"});
    }
   else  {
    
    updateUserCards(onGetCookie('user'), {STORAGE_THEME: null});
    body.classList.remove('themeDark');

   }
    })
    .catch(error => {
      error
    });
}