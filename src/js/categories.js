import {
  fetchRecipes,
  fetchRecipesByCategory,
  fetchCategories,
} from '../js/service/API';
import { createMarkup } from './create-markup';

const containerWidth = document.querySelector('.container');
const allCategoriesBtn = document.querySelector('.categories-btn');
const categories = document.querySelector('.categories-list');
const gallery = document.querySelector('.gallery');

allCategoriesBtn.addEventListener('click', async () => {
  gallery.innerHTML = '';

  const recipes = await fetchRecipes();
  const { results } = recipes;

  createMarkup(results);
});

categories.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') return;

  gallery.innerHTML = '';

  const categoryName = e.target.textContent.trim();
  const recipes = await fetchRecipesByCategory(categoryName);
  const { results } = recipes;

  createMarkup(results);
});

const createCategoryButtons = async () => {
  const categoryListEl = document.querySelector('.categories-list');

  const categories = await fetchCategories();

  const markup = categories
    .map(
      ({ name }) => `
              <li class="categories-item">
                <button class="category-btn" type="button">
                  ${name}
                </button>
              </li>`
    )
    .join('');

  categoryListEl.insertAdjacentHTML('beforeend', markup);
};
createCategoryButtons();
