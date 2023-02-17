import {fetchCategories} from './fetchSemanticList'
import {onSerchByCategori} from './clickByCategoriesLink'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const buttonCategoriesRef = document.querySelector('.button-categories')
const ulCategoriesRef = document.querySelector('.categories-list')
const ulCategoriesOtherRef = document.querySelector('.categories-list-others')
const categorieItem = [];
const categorieOther = [];

let counterSection = 0;
searchCategories()
onSerchByCategori()
function onFilterCategories(arrayNews) {
  // const arrayCategories = arrayNews.map(categorie => {  })
      if (window.matchMedia("(max-width: 768px)").matches) {
        const arrayCategories = arrayNews.map(categorie => `<li class="categories-item"><a class="categories-link">${onFormatingString(categorie.section)}</a></li>`).join('')

        onMarkupMobil(onFormatingString(arrayCategories))

      } else if (window.matchMedia("(min-width: 768px)").matches && window.matchMedia("(max-width: 1280px)").matches) {
        const arrayCategories = arrayNews.map(
          (categorie, i) => {
            if (i < 4) {
              categorieItem.push(`<li class="categories-item-tablet"><a class="categories-link">${onFormatingString(categorie.section)}</a></li>`) 
              return categorieItem
            }else{
              categorieOther.push(`<li class="categories-item-tablet-other"><a class="categories-link">${onFormatingString(categorie.section)}</a></li>`)
              return categorieOther
            }
          })
             
        onMarkupTablet(categorieItem.join(''), categorieOther.join(''))

      } else {
        const arrayCategories = arrayNews.map(
          (categorie, i) => {
            if (i < 6) {
              categorieItem.push(`<li class="categories-item-tablet"><a class="categories-link">${onFormatingString(categorie.section)}</a></li>`) 
              return categorieItem
            }else{
              categorieOther.push(`<li class="categories-item-tablet-other"><a class="categories-link">${onFormatingString(categorie.section)}</a></li>`)
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
  ulCategoriesRef.classList.toggle('is-open')
  buttonCategoriesRef.classList.toggle('is-open')
  ulCategoriesOtherRef.classList.toggle('is-open')
}
async function searchCategories() {
  const result = await fetchCategories()
  onFilterCategories(result)
}

buttonCategoriesRef.addEventListener('click', categoriesIsOpen)


function onFormatingString(string) {
  const formatingString = string[0].toUpperCase() + string.slice(1, string.length)
  return formatingString;
}
