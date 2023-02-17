export function onSerchByCategori() {
    const categoriesLink = document.querySelector('.categories-box');
    categoriesLink.addEventListener('click', (e) =>{
        if (e.target.className !== "categories-link") {
        return
        }
        console.log(e.target.textContent);
})   

}

