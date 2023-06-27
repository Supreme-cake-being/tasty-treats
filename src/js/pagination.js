// import axios from 'axios';
// import Pagination from 'tui-pagination';
// const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
// const imageContainer = document.querySelector('#image-container');
// const paginationContainer = document.querySelector('#tui-pagination-container');

// const pagination = new Pagination(paginationContainer, {
//   totalItems: 1,
//   itemsPerPage: 9,
//   visiblePages: 10,
//   page: 1,
//   centerAlign: false,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage:
//       '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}"></span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}"></span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// });

// const prevButton = document.querySelector('.tui-ico-prev');
// const nextButton = document.querySelector('.tui-ico-next');
// prevButton.textContent = '«';
// nextButton.textContent = '»';

// const moveButtons = document.querySelectorAll('.tui-page-btn.tui-move');
// moveButtons.forEach(button => {
//   if (button.textContent === 'prev') {
//     button.textContent = '<';
//   } else if (button.textContent === 'next') {
//     button.textContent = '>';
//   }
// });

// paginationContainer.classList.remove('is-hidden');

// async function updateData(pageNum) {
//   const allRecipes = await fetchAllRecipes();
//   if (allRecipes) {
//     const itemsPerPage = pagination.options.itemsPerPage;
//     const startIndex = (pageNum - 1) * itemsPerPage;
//     const endIndex = startIndex + itemsPerPage;
//     const pageData = allRecipes.slice(startIndex, endIndex);

//     displayData(pageData);

//     pagination.reset(allRecipes.length);

//     if (allRecipes.length > itemsPerPage) {
//       imageContainer.classList.remove('is-hidden');
//     } else {
//       imageContainer.classList.add('is-hidden');
//     }
//   } else {
//     imageContainer.classList.add('is-hidden');
//   }
// }

// Pagination.prototype.reset = function (totalItems) {
//   this.setTotalItems(totalItems);
//   this.reset();
//   this.movePageTo(1);
// };

// function getCurrentPage() {
//   return pagination.getCurrentPage();
// }

// async function fetchAllRecipes() {
//   try {
//     const recipes = [];
//     const response = await axios.get(`${BASE_URL}/recipes`);
//     const { data } = response;
//     const { totalPages } = data;

//     for (let i = 1; i <= totalPages; i += 1) {
//       const response = await axios.get(`${BASE_URL}/recipes`, {
//         params: {
//           page: i,
//         },
//       });
//       const { data } = response;
//       const { results } = data;
//       recipes.push(results);
//     }

//     const cards = recipes.flat();
//     return cards;
//   } catch (error) {
//     console.error('Error while fetching recipes:', error);
//     return null;
//   }
// }

// function displayData(data) {
//   imageContainer.innerHTML = '';

//   for (let i = 0; i < data.length; i++) {
//     const recipe = data[i];
//     const imageElement = document.createElement('img');
//     imageElement.src = recipe.imageUrl;
//     imageContainer.appendChild(imageElement);
//   }
// }

// prevButton.addEventListener('click', () => {
//   const currentPage = getCurrentPage();
//   if (currentPage > 1) {
//     updateData(currentPage - 1);
//   }
// });

// nextButton.addEventListener('click', () => {
//   const currentPage = getCurrentPage();
//   const totalPages = pagination.options.totalPages();
//   if (currentPage < totalPages) {
//     updateData(currentPage + 1);
//   }
// });

// updateData(1);

import { fetchRecipes } from './service/API';
import { Pagination } from 'tui-pagination';
import axios from 'axios';
import { createMarkup } from './create-markup';

const imageContainer = document.querySelector('#image-container');
const container = document.querySelector('#tui-pagination-container');

const options = {
  totalItems: 10,
  itemsPerPage: 6,
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
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(container, options);

const renderPage = async page => {
  try {
    const response = await fetchRecipes(page);
    if (response.data.result.length === 0) {
      return container.classList.add('is-hidden');
    }
    imageContainer.innerHTML = createMarkup(response.data.result);
    pagination.reset(response.data.total);
    container.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
};

const createPagination = async event => {
  try {
    const currentPage = event.page;
    const response = await fetchRecipes(currentPage);
    imageContainer.innerHTML = createMarkup(response.data.result);
  } catch (error) {
    console.log(error);
  }
};

pagination.on('afterMove', createPagination);

renderPage(options.page);
