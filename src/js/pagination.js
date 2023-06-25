import Pagination from 'tui-pagination';

const container = document.querySelector('#tui-pagination-container');
// Eкземпляр пагінації із  опціями
const pagination = new Pagination(container, {
  totalItems: 10,
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
});
// Функція оновлення даних при зміні сторінки
async function updateData(pageNum) {
  const allRecipes = await fetchAllRecipes();
  if (allRecipes) {
    pagination.setTotalItems(allRecipes.length);

    // початковий і кінцевий індекси для елементів, що відображаються на сторінці
    const itemsPerPage = pagination.options.itemsPerPage;
    const startIndex = (pageNum - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = allRecipes.slice(startIndex, endIndex);

    //Відображаємо дані на сторінці
    displayData(pageData);
  }
}

// Метод reset для пагінації
Pagination.prototype.reset = function (totalItems) {
  this.setTotalItems(totalItems);
  this.reset();
  this.movePageTo(1);
};

//Функція для отримання поточної сторінки пагінації
function getCurrentPage() {
  return pagination.getCurrentPage();
}

updateData(1);

// Функція для отримання всіх рецептів із стороннього API
async function fetchAllRecipes() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes'
    );
    const data = await response.json();
    const totalPages = data.totalPages;

    const promises = [];
    for (let page = 1; page <= totalPages; page += 1) {
      promises.push(fetchRecipes(page));
    }

    const results = await Promise.all(promises);
    const allRecipes = results.flatMap(result => result.results);

    return allRecipes;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
}

//Функція для отримання рецептів за заданим номером сторінки
async function fetchRecipes(page) {
  try {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
}
