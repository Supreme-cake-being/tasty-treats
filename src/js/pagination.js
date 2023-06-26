import axios from 'axios';
import Pagination from 'tui-pagination';

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const imageContainer = document.querySelector('#image-container');
const paginationContainer = document.querySelector('#tui-pagination-container');

const pagination = new Pagination(paginationContainer, {
  totalItems: 1,
  itemsPerPage: 9,
  visiblePages: 10,
  page: 1,
  centerAlign: false,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
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
});

const prevButton = document.querySelector('.tui-ico-prev');
const nextButton = document.querySelector('.tui-ico-next');
prevButton.textContent = '«';
nextButton.textContent = '»';

const moveButtons = document.querySelectorAll('.tui-page-btn.tui-move');
moveButtons.forEach(button => {
  if (button.textContent === 'prev') {
    button.textContent = '<';
  } else if (button.textContent === 'next') {
    button.textContent = '>';
  }
});

paginationContainer.classList.remove('is-hidden');

async function updateData(pageNum) {
  const allRecipes = await fetchAllRecipes();
  if (allRecipes) {
    pagination.setTotalItems(allRecipes.length);

    const itemsPerPage = pagination.options.itemsPerPage;
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = allRecipes.slice(startIndex, endIndex);

    displayData(pageData);

    if (allRecipes.length > itemsPerPage) {
      container.classList.remove('is-hidden');
    } else {
      container.classList.add('is-hidden');
    }
  } else {
    container.classList.add('is-hidden');
  }
}

Pagination.prototype.reset = function (totalItems) {
  this.setTotalItems(totalItems);
  this.reset();
  this.movePageTo(1);
};

function getCurrentPage() {
  return pagination.getCurrentPage();
}

updateData(1);

async function fetchAllRecipes() {
  try {
    const response = await axios.get(`${BASE_URL}/recipes`);
    const data = response.data;
    const totalPages = data.totalPages;

    const promises = [];
    for (let page = 1; page <= totalPages; page += 1) {
      promises.push(fetchRecipes(page));
    }

    const results = await Promise.all(promises);
    const allRecipes = results.flatMap(result => result.results);

    return allRecipes;
  } catch (error) {
    console.error('Error while fetching recipes:', error);
    return null;
  }
}

async function fetchRecipes(page) {
  try {
    const response = await axios.get(`${BASE_URL}/recipes?page=${page}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error('Error while fetching recipes:', error);
    return null;
  }
}

function displayData(data) {
  imageContainer.innerHTML = '';

  for (let i = 0; i < data.length; i++) {
    const recipe = data[i];
    const imageElement = document.createElement('img');
    imageElement.src = recipe.imageUrl;
    imageContainer.appendChild(imageElement);
  }
}
