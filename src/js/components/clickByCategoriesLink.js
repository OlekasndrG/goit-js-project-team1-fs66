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

        if (dataCurrent === 0) {
            onRenderByOneCategorie.articleSearchByCategory(category, data);
        } else {
            onRenderByOneCategorie.articleSearchByCategory({category}).then(
                data => onRenderOneCard(data)
            )

        }
})   

}


// const fethByCategorie = new API;

// export async function onRenderByOneCategorie(params) {
//     const dataCurrent = localStorage.getItem('Date_current')
//     if(dataCurrent){
//     const result = await fethByCategorie.articleSearchByCategory(category, dataCurrent)

//     }
//     console.log(result);
    
// }
