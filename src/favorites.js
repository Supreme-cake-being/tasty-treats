import { fetchCategories } from './js/service/API';

const refs = {
  categories: document.querySelector('.categories'),
  favorites: document.querySelector('.favorites'),
  noData: document.querySelector('.no-data'),
};

function renderCategories(categories, favorites) {
  refs.categories.innerHTML = '';
  if (!categories) {
    return;
  }
  const items = categories
    .filter(element => {
      return favorites.some(favorite => {
        return element.name === favorite.category;
      });
    })
    .map(category => {
      const item = document.createElement('button');
      item.setAttribute('type', 'button');
      item.classList.add('categories-btn', 'btn');
      item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
          renderFavotites(favorites, null);
          return;
        }
        items.forEach(element => {
          element.classList.remove('active');
        });
        item.classList.add('active');
        renderFavotites(favorites, category.name);
      });
      item.textContent = category.name;
      return item;
    });
  const allCategories = document.createElement('button');
  allCategories.classList.add('categories-btn', 'btn', 'all-categories');
  allCategories.textContent = 'All categories';
  allCategories.addEventListener('click', () => {
    renderFavotites(favorites, null);
    items.forEach(element => {
      element.classList.remove('active');
    });
  });
  refs.categories.append(allCategories, ...items);
}

function renderFavotites(favorites, selectedCategory) {
  refs.favorites.innerHTML = '';
  const items = favorites
    .filter(element => {
      if (!selectedCategory) {
        return true;
      }
      return element.category === selectedCategory;
    })
    .map(favorite => {
      const item = document.createElement('li');
      item.innerHTML = renderCard(favorite);
      item.querySelector('.favorites-btn').addEventListener('click', () => {
        const newFavorites = favorites.filter(element => {
          return element._id !== favorite._id;
        });
        localStorage.setItem('favorites', JSON.stringify(newFavorites));
        renderPage();
      });
      item.setAttribute('data-id', favorite._id);
      return item;
    });
  refs.favorites.append(...items);
}

function renderPage() {
  const favorites = JSON.parse(localStorage.getItem('favorites'));
  if (!favorites || !favorites.length) {
    refs.noData.style.display = 'flex';
    renderFavotites(favorites);
    renderCategories(null, favorites);
  } else
    fetchCategories().then(categories => {
      renderFavotites(favorites);
      renderCategories(categories, favorites);
    });
}

function renderCard(favorite) {
  return `
    <li class="card-recipe">
            <img class="card-img" src="${favorite.preview}" />
            <button class="favorites-btn" data-id="${favorite._id}" type="button">
                <svg class="is-favorite" width="22" height="22">
                    <use href="./img/icons.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${favorite.title}</h3>
                <p class="card-description">${favorite.description}</p>
                <div class="card-additional-info">
                    <p>${favorite.rating}</p>
                    <ul class="card-rating">
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>    
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg> 
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>   
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>     
                        </li>
                        <li>
                            <svg class="card-star" width="22" height="22">
                                <use href="./img/icons.svg#star"></use>
                            </svg>     
                        </li>
                    </ul>
                    <button type="button" class="card-button" data-id="${favorite._id}">See recipe</button>
                </div>
            </div>
        </li>
  `;
}

renderPage();
