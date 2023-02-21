import {onRenderOneCard} from './renderOneCard'
import onRenderByOneCategorie from '../common/API'
const data = localStorage.getItem('Date_current')

export function onSerchByCategori() {

    const dataCurrent = localStorage.getItem('Date_current')
    const categoriesLink = document.querySelector('.categories-box');

    categoriesLink.addEventListener('click', (e) =>{
        if (e.target.nodeName !== "A") {
        return
        }
        const category = encodeURIComponent(`${e.target.textContent.toLowerCase()}`); 
        onRenderByOneCategorie.articleSearchByCategory({category}).then(
            data => onRenderOneCard(data))
})   

}
