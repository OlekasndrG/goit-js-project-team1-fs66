import {fetchCategories} from './fetchSemanticList'
import {onSerchByCategori} from './clickByCategoriesLink'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const buttonCategoriesRef = document.querySelector('.button-categories')
const ulCategoriesRef = document.querySelector('.categories-list')
const ulCategoriesOtherRef = document.querySelector('.categories-list-others')
const screenWidth = window.screen.width
let counterSection = 0;
searchCategories()
onSerchByCategori()
function onFilterCategories(arrayNews) {
  const arraySection = []
  const arrayCategories = arrayNews.map(categorie => {
    if (arraySection.includes(categorie.section)) {
      console.log(arraySection);
      return
    } else {
      arraySection.push(categorie.section)
      if (screenWidth < 768) {
      onMarkupMobil(onFormatingString(categorie.section))
      } else if (screenWidth >= 768 && screenWidth < 1280) {
        onMarkupTablet(onFormatingString(categorie.section))
      } else {
        onMarkupSixCategories(onFormatingString(categorie.section))
      }
    }
  })
}

function onMarkupMobil(section) {
  ulCategoriesRef.classList.add('is-mobil')
  ulCategoriesRef.insertAdjacentHTML('beforeend',`<li class="categories-item"><a class="categories-link">${section}</a></li>`)
}

function onMarkupTablet(section) {
  counterSection += 1
  if (counterSection < 5) {
    ulCategoriesRef.classList.add('is-tablet')
    ulCategoriesRef.insertAdjacentHTML('beforeend',`<li class="categories-item-tablet"><a class="categories-link">${section}</a></li>`)
    return
  } else {
    ulCategoriesOtherRef.insertAdjacentHTML('beforeend',`<li class="categories-item-tablet-other"><a class="categories-link">${section}</a></li>`)
  }
}

function onMarkupSixCategories(section) {
  counterSection += 1
  if (counterSection < 7) {
    ulCategoriesRef.classList.add('is-desktop')
    ulCategoriesRef.insertAdjacentHTML('beforeend',`<li class="categories-item-tablet"><a class="categories-link">${section}</a></li>`)
    return
  } else {
    ulCategoriesOtherRef.insertAdjacentHTML('beforeend',`<li class="categories-item-tablet-other"><a class="categories-link">${section}</a></li>`)
  }

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
