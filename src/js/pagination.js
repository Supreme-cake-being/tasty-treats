import axios from 'axios';
import Pagination from 'tui-pagination';
import { createMarkup } from "./create-markup";

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const containerWidth = document.querySelector('.container');

const getPaginationSettings = () => {
  let pageLimit;
  let visiblePages;
  switch (containerWidth.clientWidth) {
    case 1280:
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
}
const { pageLimit, visiblePages } = getPaginationSettings();

const fetchRecipes = async (page) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes`, {
        params: {
          page: page,
          limit: pageLimit,
        }
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const container = document.querySelector('#tui-pagination-container');
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
}

const pagination = new Pagination(container, options);

const page = pagination.getCurrentPage();

const onRenderPage = async (page) => {
  try {
    const response = await fetchRecipes(page);

    if (response.results.length === 0)
      return container.classList.add('is-hidden');

    createMarkup(response.results);
    container.classList.remove('is-hidden');

    pagination.reset(response.totalPages * pageLimit);
  } catch (error) {
    console.log(error.message);
  }
}
onRenderPage(page);

const createPagination = async (event) => {
  try {
    const gallery = document.querySelector('.gallery-list');
    gallery.innerHTML = '';

    const currentPage = event.page;

    const response = await fetchRecipes(currentPage);

    createMarkup(response.results);
  } catch (error) {
    console.log(error.message);
  }
}

pagination.on('afterMove', createPagination);