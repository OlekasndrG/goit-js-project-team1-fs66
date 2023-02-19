import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { onGetUserName } from "./onGetUserName";
import { onSetCookie } from "./setCookie"
import { onGetCookie } from "./getCookie"
import { onDeleteCookie } from "./deleteCookie"

// config
Notify.init({
    timeout: 7000,
    clickToClose: true,
  });
const refs = {
    nameRef: document.getElementById('name'),
    passRef: document.getElementById('pass'),
    emailRef: document.getElementById('email'),
    formRef: document.getElementById('form'),
    buttonLogin: document.getElementById('login'),
    buttonRegistr: document.querySelector('.registr'),
    buttonLogout: document.querySelector('.logout')
}
// config

onAuthorizationCheck()

refs.formRef.addEventListener('submit', (e) => {
    e.preventDefault()
    onAuthorizationUser( e.target.pass.value, e.target.email.value)
})

export const onAuthorizationUser = function(password, email){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        return user
    })
    .then((user)=> {
        onSetCookie('user', user.uid)
        onAuthorizationCheck()
     onGetUserName(user.uid)  
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (errorMessage ==='Firebase: Error (auth/user-not-found).') {
            Notify.failure(`User is not foundю Register please`)
        } else if(errorMessage === 'Firebase: Error (auth/wrong-password).'){
            Notify.failure(`The password is incorrect`)
        }
        else {
            Notify.failure(`${errorMessage}`)
        }
    });
}

function onAuthorizationCheck() {
    if (onGetCookie('user')) {
        refs.buttonRegistr.classList.toggle('displayNone')
        refs.buttonLogin.classList.toggle('displayNone')
        refs.buttonLogout.classList.toggle('displayNone')
        refs.buttonLogout.addEventListener('click', onLogout)
    } 
}

function onLogout() {
    onDeleteCookie('user');
    refs.buttonRegistr.classList.toggle('displayNone')
    refs.buttonLogin.classList.toggle('displayNone')
    refs.buttonLogout.classList.toggle('displayNone')
}

