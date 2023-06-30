import {
  fetchArea,
  fetchIngredient,
  fetchRecipesByFilters,
} from './service/API';
import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import { createMarkup } from './create-markup';

const gallery = document.querySelector('.gallery-list');
const searchForm = document.querySelector('.search-form');
const searchName = document.querySelector('.input-search');
const searchIngredients = document.querySelector('.select-ingredients');
const searchArea = document.querySelector('.select-area');
const searchTime = document.querySelector('.select-time');
const allCategoriesBtn = document.querySelector('.categories-btn');
const categories = document.querySelector('.categories-list');
const message = document.querySelector('.no-result-message');
const containerWidth = document.querySelector('.container');
const container = document.querySelector('#tui-pagination-container');

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
    message.classList.add('is-hidden');
    gallery.innerHTML = '';

    const response = await fetchRecipesByFilters(
      currentPage,
      categoryPlaceHolder,
      searchName.value.trim(),
      searchIngredients.value,
      searchArea.value,
      searchTime.value
    );

    if (response.results.length === 0) {
      message.classList.remove('is-hidden');
    }

    if (response.results.length === 0)
      return container.classList.add('is-hidden');

    pagination.reset(response.totalPages * pageLimit);

    createMarkup(response.results);
    container.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}
// createFilteredMarkup();

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

  const response = await fetchRecipesByFilters(
    currentPage,
    categoryPlaceHolder,
    searchName.value.trim(),
    searchIngredients.value,
    searchArea.value,
    searchTime.value
  );

  if (response.results.length === 0)
    return container.classList.add('is-hidden');

  pagination.reset(response.totalPages * pageLimit);

  createMarkup(response.results);
  container.classList.remove('is-hidden');
});

categories.addEventListener('click', async e => {
  if (e.target.nodeName !== 'BUTTON') return;

  gallery.innerHTML = '';

  categoryPlaceHolder = e.target.textContent.trim();
  const response = await fetchRecipesByFilters(
    currentPage,
    categoryPlaceHolder,
    searchName.value.trim(),
    searchIngredients.value,
    searchArea.value,
    searchTime.value
  );

  console.log(response.totalPages);

  if (response.results.length === 0)
    return container.classList.add('is-hidden');

  pagination.reset(response.totalPages * pageLimit);

  createMarkup(response.results);
});

const getPaginationSettings = () => {
  let pageLimit;
  let visiblePages;
  switch (containerWidth.clientWidth) {
    case 1144:
      pageLimit = 9;
      visiblePages = 3;
      break;

    case 768:
      pageLimit = 8;
      visiblePages = 3;
      break;

    default:
      pageLimit = 6;
      visiblePages = 2;
      break;
  }
  return { pageLimit, visiblePages };
};
const { pageLimit, visiblePages } = getPaginationSettings();

const options = {
  totalItems: 0,
  itemsPerPage: pageLimit,
  visiblePages: visiblePages,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn tui-page">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}"></span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

const onRenderPage = async page => {
  try {
    const response = await fetchRecipesByFilters(
      page,
      categoryPlaceHolder,
      searchName.value.trim(),
      searchIngredients.value,
      searchArea.value,
      searchTime.value
    );

    if (response.results.length === 0)
      return container.classList.add('is-hidden');

    createMarkup(response.results);
    container.classList.remove('is-hidden');

    pagination.reset(response.totalPages * pageLimit);
  } catch (error) {
    console.log(error.message);
  }
};
onRenderPage(page);

const createPagination = async event => {
  try {
    gallery.innerHTML = '';

    const currentPage = event.page;

    const response = await fetchRecipesByFilters(
      currentPage,
      categoryPlaceHolder,
      searchName.value.trim(),
      searchIngredients.value,
      searchArea.value,
      searchTime.value
    );

    createMarkup(response.results);
  } catch (error) {
    console.log(error.message);
  }
};

pagination.on('afterMove', createPagination);
