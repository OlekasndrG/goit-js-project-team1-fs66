const changeThemeBtn = document.querySelector('#sitetheme');
const body = document.querySelector('body');


const STORAGE_THEME = "theme";

let storageMemory =  localStorage.getItem(STORAGE_THEME) || undefined;

function saveLocalStorageTheme(){
   
    if(storageMemory === 'dark') {
        body.classList.add('themeDark')
        changeThemeBtn.checked = true;
    }

}
saveLocalStorageTheme(storageMemory);


changeThemeBtn.addEventListener('click', changeTheme);

function changeTheme() {

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

function addDarkClassToHTML() {
    try {
      if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('themeDark');
        
      }
      else {
        body.classList.remove('themeDark');
      }
    } catch (err) {}
}
  




