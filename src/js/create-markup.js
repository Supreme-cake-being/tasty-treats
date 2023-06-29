import { addToFavorites } from './add-favorites';

const gallery = document.querySelector('.gallery-list');

export const createMarkup = (array) => {
    const markup = array.map(({ _id, preview, title, description, rating }) => {
        const starRating = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {    
                starRating.push(`<li>
                                    <svg class="card-star" width="18" height="18">
                                        <use href="./img/icons.svg#icon-star-colored"></use>
                                    </svg>
                                </li>`);
            }
            else {
                starRating.push(`<li>
                                    <svg class="card-star" width="18" height="18">
                                        <use href="./img/icons.svg#icon-star-no-colored"></use>
                                    </svg>
                                </li>`);
            }
        }
        return `<li class="card-recipe">
            <img class="card-img" src="${preview}" />
            <button class="card-favorites-btn" data-id="${_id}" type="button">
                <svg class="icon-heart" width="22" height="22">
                    <use href="../img/icons.svg/heart"></use>
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
        </li>`
    }).join('');
    

    gallery.insertAdjacentHTML('beforeend', markup);
    
    addToFavorites();
}