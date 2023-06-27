import {
  fetchRecipes,
  fetchArea,
  fetchIngredient,
  fetchRecipesByFilters,
} from './service/API';
import { createMarkup } from './create-markup';
import debounce from 'lodash.debounce';

const gallery = document.querySelector('.gallery');
const searchName = document.querySelector('.input-search');
const searchIngredients = document.querySelector('.select-ingredients');
const searchArea = document.querySelector('.select-area');
const searchCategory = document.querySelector('.categories-list');
const searchTime = document.querySelector('.select-time');

(async function addSelectAreas() {
  try {
    const areas = await fetchArea();
    areas.forEach(area => {
      const option = document.createElement('option');
      option.text = area;
      searchArea.appendChild(option);
    });
  } catch (error) {
    console.log(error.message);
  }
})();

(async function addSelectIngredients() {
  try {
    const ingredients = await fetchIngredient();
    const { ingredientId, ingredientName } = ingredients;

  for (let i = 0; i < ingredientId.length; i++) {
    const optionElement = document.createElement('option');
    optionElement.value = ingredientId[i];
    optionElement.text = ingredientName[i];
    searchIngredients.appendChild(optionElement);
  }
  } catch (error) {
    console.log(error.message);
  }
})();

searchIngredients.addEventListener('change', createFilteredMarkup());

async function createFilteredMarkup() {
  try {
    const filteredRecipes = await fetchRecipesByFilters(
      searchName.value.trim(),
      searchIngredients.value,
      searchArea.value,
      searchTime.value,
    );
    const { results } = filteredRecipes;
    gallery.innerHTML = '';
    console.log(results);
    console.log(searchName.value.trim());
    console.log(searchIngredients.value);
    console.log(searchArea.value);
    console.log(searchTime.value);
    createMarkup(results);
  } catch (error) {
    console.log(error);
  }
}

// import debounce from 'lodash.debounce';

// const inputEl = document.querySelector('.input');
// const galleryEl = document.querySelector('.gallery');
// let fetchTimeout;

// function createGallery(data, keyword) {
//   galleryEl.innerHTML = '';

//   if (data && data.length > 0) {
//     const card = data
//       .filter(
//         item =>
//           item.title && item.title.toLowerCase().includes(keyword.toLowerCase())
//       )
//       .map(recipe => {
//         return `<div class="card-recipe" style="background-image: url(${recipe.preview})">
//                   <svg class="card-heart"
//                     src="./images/heart-card.svg"
//                     width="22"
//                     height="22" />
//                   <h3 class="card-title">${recipe.title}</h3>
//                   <p class="card-description">${recipe.description}</p>
//                   <button type="button" class="card-button">
//                     See recipe
//                   </button>
//                 </div>`;
//       })
//       .join('');
//     galleryEl.innerHTML += card;
//   } else {
//     console.log('Немає даних для виведення заголовків');
//   }
// }

// // Функція для виконання запиту на отримання рецептів за заданим ключовим словом
// async function fetchDataAndPrintTitles(keyword) {
//   const data = await fetchAllRecipes();
//   createGallery(data, keyword);
// }

// // Використовуємо debounce для затримки виконання функції fetchDataAndPrintTitles
// // після зміни значення в input протягом 300 мс
// const debouncedFetchDataAndPrintTitles = debounce(fetchDataAndPrintTitles, 300);

// // Додаємо обробник події input для виклику функції з пошуком і виводом заголовків.
// inputEl.addEventListener('input', () => {
//   const keyword = inputEl.value.trim();

//   clearTimeout(fetchTimeout); // Скидаємо попередній таймер запиту

//   if (keyword.length > 0) {
//     fetchTimeout = setTimeout(() => {
//       debouncedFetchDataAndPrintTitles(keyword);
//     }, 300);
//   } else {
//     console.log('Введіть ключове слово для пошуку');
//     clearTimeout(fetchTimeout); // Скидаємо таймер запиту, якщо поле вводу порожнє
//     galleryEl.innerHTML = '';
//   }
// });

// const searchForm = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');

// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
// });

// searchForm.addEventListener('input', (e) => {

// });
