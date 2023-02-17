import {fetchNewsByCategories} from './fetchNewsByCategories'
export function onSerchByCategori() {
    const categoriesLink = document.querySelector('.categories-box');
    categoriesLink.addEventListener('click', (e) =>{
        if (e.target.nodeName !== "A") {
        return
        }
        const encoded = encodeURIComponent(`${e.target.textContent.toLowerCase()}`); 
        fetchNewsByCategories(encoded);
})   

}

