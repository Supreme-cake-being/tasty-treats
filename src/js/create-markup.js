import { addToFavorites } from './add-favorites';

const gallery = document.querySelector('.gallery');

export const createMarkup = (array) => {
    const markup = array.map((element) => 
        `<div class="card-recipe" style="background-image: url(${element.preview})">
            <button class="favorites-btn" data-id="${element._id}" type="button">
                <svg class="icon-heart" width="22" height="22">
                    <use href="./img/icons.svg#heart"></use>
                </svg>
            </button>
            <h3 class="card-title">${element.title}</h3>
            <p class="card-description">${element.description}</p>
            <button type="button" class="card-button" data-id="${element._id}">See recipe</button>
        </div>`
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    
    addToFavorites();
}
