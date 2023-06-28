import {
  fetchRecipes,
  fetchArea,
  fetchIngredient,
  fetchRecipesByFilters,
} from './service/API';
import { createMarkup } from './create-markup';
import debounce from 'lodash.debounce';

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form')
const searchName = document.querySelector('.input-search');
const searchIngredients = document.querySelector('.select-ingredients');
const searchArea = document.querySelector('.select-area');
const searchTime = document.querySelector('.select-time');
const allCategoriesBtn = document.querySelector('.categories-btn');
const categories = document.querySelector('.categories-list');

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
      categoryPlaceHolder,
      searchName.value.trim(),
      searchIngredients.value,
      searchArea.value,
      searchTime.value
    );
    const { results } = filteredRecipes;
    gallery.innerHTML = '';
    console.log(filteredRecipes);
    console.log(searchName.value.trim());
    console.log(searchIngredients.value);
    console.log(searchArea.value);
    console.log(searchTime.value);
    createMarkup(results);
  } catch (error) {
    console.log(error);
  }
}

function preventDefault(e){
  e.preventDefault();
}

let categoryPlaceHolder;


searchIngredients.addEventListener('change', createFilteredMarkup);
searchArea.addEventListener('change', createFilteredMarkup);
searchTime.addEventListener('change', createFilteredMarkup);
searchName.addEventListener('input', debounce(createFilteredMarkup, 300));
searchForm.addEventListener('submit', preventDefault);

allCategoriesBtn.addEventListener('click', async () => {
  gallery.innerHTML = '';
  categoryPlaceHolder = '';

  const recipes = await fetchRecipesByFilters(
    categoryPlaceHolder,
    searchName.value.trim(),
    searchIngredients.value,
    searchArea.value,
    searchTime.value
  );
  const { results } = recipes;

  createMarkup(results);
})

categories.addEventListener('click', async (e) => {
  if (e.target.nodeName !== 'BUTTON')
      return;
  
  gallery.innerHTML = '';
  
  categoryPlaceHolder = e.target.textContent.trim();
  const recipes = await fetchRecipesByFilters(
    categoryPlaceHolder,
    searchName.value.trim(),
    searchIngredients.value,
    searchArea.value,
    searchTime.value
  );
  const { results } = recipes;

  createMarkup(results);
});