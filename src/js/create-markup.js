import { addToFavorites } from './add-favorites';

const gallery = document.querySelector('.gallery-list');

export const createMarkup = (array) => {
    const markup = array.map(({ _id, preview, title, description, rating }) => 
        `<li class="card-recipe">
            <img class="card-img" src="${preview}" />
            <button class="favorites-btn" data-id="${_id}" type="button">
                <svg class="icon-heart" width="22" height="22">
                    <use href="./img/icons.svg#heart"></use>
                </svg>
            </button>
            <div class="card-info">
                <h3 class="card-title">${title}</h3>
                <p class="card-description">${description}</p>
                <div class="card-additional-info">
                    <p>${rating}</p>
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
                    <button type="button" class="card-button" data-id="${_id}">See recipe</button>
                </div>
            </div>
        </li>`
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    
    addToFavorites();
}