import {fetchCategories} from './fetchSemanticList'
import {onSerchByCategori} from './clickByCategoriesLink'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const buttonCategoriesRef = document.querySelector('.button-categories')
const ulCategoriesRef = document.querySelector('.categories-list')
const ulCategoriesOtherRef = document.querySelector('.categories-list-others');
const categorieBox = document.querySelector('.categories-menu');
const categorieOthersBox = document.querySelector('.categories-others-menu');

const categorieItem = [];
const categorieOther = [];


searchCategories()
onSerchByCategori()
function onFilterCategories(arrayNews) {

      if (window.matchMedia("(max-width: 768px)").matches) {
        const arrayCategories = arrayNews.map(categorie => `<li class="categories-item"><a class="categories-link">${categorie.display_name}</a></li>`).join('')

        onMarkupMobil(arrayCategories)

      } else if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches) {
        const arrayCategories = arrayNews.map(
          (categorie, i) => {
            if (i < 4) {
              categorieItem.push(`<li class="categories-item-tablet"><a class="categories-link">${categorie.display_name}</a></li>`) 
              return categorieItem
            }else{
              categorieOther.push(`<li class="categories-item-tablet-other"><a class="categories-link">${categorie.display_name}</a></li>`)
              return categorieOther
            }
          })
             
        onMarkupTablet(categorieItem.join(''), categorieOther.join(''))

      } else {
        const arrayCategories = arrayNews.map(
          (categorie, i) => {
            if (i < 6) {
              categorieItem.push(`<li class="categories-item-tablet"><a class="categories-link">${categorie.display_name}</a></li>`) 
              return categorieItem
            }else{
              categorieOther.push(`<li class="categories-item-tablet-other"><a class="categories-link">${categorie.display_name}</a></li>`)
              return categorieOther
            }
          })
        onMarkupSixCategories(categorieItem.join(''), categorieOther.join(''))
      }

}

function onMarkupMobil(section) {
  ulCategoriesRef.insertAdjacentHTML('beforeend',section)
  ulCategoriesRef.classList.add('is-mobil')

}

function onMarkupTablet(item, other) {
  ulCategoriesRef.insertAdjacentHTML('beforeend',item)
  ulCategoriesOtherRef.insertAdjacentHTML('beforeend',other)
  ulCategoriesRef.classList.add('is-tablet')

}

function onMarkupSixCategories(item, other) {
    ulCategoriesRef.insertAdjacentHTML('beforeend',item)
    ulCategoriesOtherRef.insertAdjacentHTML('beforeend',other)
    ulCategoriesRef.classList.add('is-desktop')

}

function categoriesIsOpen() {
  categorieBox.classList.toggle('js-open')
  categorieOthersBox.classList.toggle('js-others-open')
  ulCategoriesRef.classList.toggle('is-open')
  buttonCategoriesRef.classList.toggle('is-open')
  ulCategoriesOtherRef.classList.toggle('is-open')
}
async function searchCategories() {
  const result = await fetchCategories()
  onFilterCategories(result)
}

buttonCategoriesRef.addEventListener('click', categoriesIsOpen);


ulCategoriesRef.addEventListener('click', ()=>{
  ulCategoriesRef.classList.remove('is-open');
  categorieBox.classList.remove('js-open');
  buttonCategoriesRef.classList.remove('is-open')
  
});
ulCategoriesOtherRef.addEventListener('click', ()=>{
  ulCategoriesOtherRef.classList.remove('is-open')
  buttonCategoriesRef.classList.remove('is-open')
  categorieOthersBox.classList.remove('js-others-open')
});

