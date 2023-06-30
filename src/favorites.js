import './js/modals';
import { fetchCategories } from './js/service/API';
import Pagination from 'tui-pagination';

const refs = {
  categories: document.querySelector('.categories'),
  favorites: document.querySelector('.favorites'),
  noData: document.querySelector('.no-data'),
};

let selectedCategory;
let pagination;
const itemsPerPage = 12;

pagination = new Pagination(
    document.getElementById('tui-pagination-container'),
    {
      page: 1,
      visiblePages: 3,
      itemsPerPage: itemsPerPage,
      totalItems: 0,
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
  );

function renderCategories(categories, favorites) {
  refs.categories.innerHTML = '';
  if (!categories) {
    return;
  }
  const filteredCategories = categories.filter(element => {
    return favorites.some(favorite => {
      return element.name === favorite.category;
    });
  });
  if (
    !filteredCategories.some(category => category.name === selectedCategory)
  ) {
    selectedCategory = null;
  }
  const items = filteredCategories.map(category => {
    const item = document.createElement('button');
    item.setAttribute('type', 'button');
    item.classList.add('categories-btn', 'btn', 'favotites-btn');
    if (category.name === selectedCategory) {
      item.classList.add('active');
    }
    item.addEventListener('click', () => {
      pagination.movePageTo(1);
      if (item.classList.contains('active')) {
        item.classList.remove('active');
        renderFavotites(favorites, null);
        selectedCategory = null;
        return;
      }
      items.forEach(element => {
        element.classList.remove('active');
      });
      item.classList.add('active');
      renderFavotites(favorites, category.name);
      selectedCategory = category.name;
    });
    item.textContent = category.name;
    return item;
  });
  const allCategories = document.createElement('button');
  allCategories.classList.add(
    'categories-btn',
    'btn',
    'all-categories',
    'favotites-btn'
  );
  allCategories.textContent = 'All categories';
  allCategories.addEventListener('click', () => {
    renderFavotites(favorites, null);
    selectedCategory = null;
    items.forEach(element => {
      element.classList.remove('active');
    });
  });
  refs.categories.append(allCategories, ...items);
}

function renderFavotites(favorites, selectedCategory) {
  refs.favorites.innerHTML = '';
  const filteredFavorites = favorites.filter(element => {
    if (!selectedCategory) {
      return true;
    }
    return element.category === selectedCategory;
  });

  renderPagination(
    favorites,
    filteredFavorites.length,
    pagination.getCurrentPage()
  );
  const items = filteredFavorites
    .slice(
      itemsPerPage * (pagination.getCurrentPage() - 1),
      itemsPerPage * pagination.getCurrentPage()
    )
    .map(favorite => {
      const item = document.createElement('li');
      item.classList.add('card-recipe', 'favorit-recipe');
      item.innerHTML = renderCard(favorite);
      item
        .querySelector('.card-favorites-btn')
        .addEventListener('click', () => {
          const newFavorites = favorites.filter(element => {
            return element._id !== favorite._id;
          });
          localStorage.setItem('favorites', JSON.stringify(newFavorites));
          renderPage();
        });
      return item;
    });
  refs.favorites.append(...items);
}

function renderPage() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favorites || !favorites.length) {
    refs.noData.style.display = 'flex';
    // if (window.innerWidth < 767)
      document.querySelector('.hero-favotites').style.display = 'none';
    // else
      document.querySelector('.hero-favotites').style.display = 'block'; 
    document.getElementById('tui-pagination-container').style.display = 'none';
    renderFavotites(favorites);
    renderCategories(null, favorites);
  } else
    fetchCategories().then(categories => {
      renderCategories(categories, favorites);
      renderPagination(favorites, 100, 1);
      renderFavotites(favorites, selectedCategory);
    });
}

function renderCard({ _id, preview, title, description, rating }) {
  const starRating = [];

  rating = Math.floor(rating);
  if (rating > 5) rating = 5;

  for (let i = 0; i < 5; i++) {
    if (i < Math.floor(rating)) {
      starRating.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="/tasty-treats/assets/icons-e30ccde6.svg#icon-star-colored"></use>
                          </svg>
                      </li>`);
    } else {
      starRating.push(`<li>
                          <svg class="card-star" width="18" height="18">
                              <use href="/tasty-treats/assets/icons-e30ccde6.svg#icon-star-no-colored"></use>
                          </svg>
                      </li>`);
    }
  }
  return `
            <img class="card-img" src="${preview}" />
            <button class="card-favorites-btn" data-id="${_id}" type="button">
                <svg class="icon-heart is-favorite" width="22" height="22">
                    <use href="/tasty-treats/assets/icons-e30ccde6.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${title}</h3>
                <p class="card-description">${description}</p>
                <div class="card-additional-info">
                    <p>${rating}</p>
                    <ul class="card-rating">${starRating.join('')}</ul>
                    <button type="button" class="card-button" data-id="${_id}">See recipe</button>
                </div>
            </div>
        `;
}

function renderPagination(favorites, totalItems, page) {
  if (totalItems <= itemsPerPage) {
    document.getElementById('tui-pagination-container').style.display = 'none';
    return;
  }
  pagination = new Pagination(
    document.getElementById('tui-pagination-container'),
    {
      page: page,
      visiblePages: 3,
      itemsPerPage: itemsPerPage,
      totalItems: totalItems,
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
  );
  pagination.on('afterMove', event => {
    renderFavotites(favorites, selectedCategory);
  });
}

renderPage();

// window.onresize = () => {
//   renderPage();
// }

export {renderPage}