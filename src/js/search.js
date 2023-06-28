import {
  fetchArea,
  fetchIngredient,
  fetchRecipesByFilters,
} from './service/API';
import { createMarkup } from './create-markup';
import debounce from 'lodash.debounce';

const gallery = document.querySelector('.gallery-list');
const searchForm = document.querySelector('.search-form');
const searchName = document.querySelector('.input-search');
const searchIngredients = document.querySelector('.select-ingredients');
const searchArea = document.querySelector('.select-area');
const searchTime = document.querySelector('.select-time');
const allCategoriesBtn = document.querySelector('.categories-btn');
const categories = document.querySelector('.categories-list');

let categoryPlaceHolder;
let currentPage = 1;

(async function addSelectAreas() {
  try {
    const areas = await fetchArea();
    const markup = areas.map(area => `<option>${area}</option>`).join('');
    searchArea.insertAdjacentHTML('beforeend', markup);
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

async function createFilteredMarkup() {
  try {
    const filteredRecipes = await fetchRecipesByFilters(
      currentPage,
      categoryPlaceHolder,
      searchName.value.trim(),
      searchIngredients.value,
      searchArea.value,
      searchTime.value
    );
    const { results } = filteredRecipes;
    gallery.innerHTML = '';
    console.log(results);
    createMarkup(results);
  } catch (error) {
    console.log(error);
  }
}
createFilteredMarkup();

searchForm.addEventListener('submit', preventDefault);
function preventDefault(e) {
  e.preventDefault();
}

searchIngredients.addEventListener('change', createFilteredMarkup);
searchArea.addEventListener('change', createFilteredMarkup);
searchTime.addEventListener('change', createFilteredMarkup);
searchName.addEventListener('input', debounce(createFilteredMarkup, 300));

allCategoriesBtn.addEventListener('click', async () => {
  gallery.innerHTML = '';
  categoryPlaceHolder = '';

  const recipes = await fetchRecipesByFilters(
    currentPage,
    categoryPlaceHolder,
    searchName.value.trim(),
    searchIngredients.value,
    searchArea.value,
    searchTime.value
  );
  const { results } = recipes;

  createMarkup(results);
});

categories.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') return;

  gallery.innerHTML = '';

  categoryPlaceHolder = e.target.textContent.trim();
  const recipes = await fetchRecipesByFilters(
    currentPage,
    categoryPlaceHolder,
    searchName.value.trim(),
    searchIngredients.value,
    searchArea.value,
    searchTime.value
  );
  const { results } = recipes;

  createMarkup(results);
});
