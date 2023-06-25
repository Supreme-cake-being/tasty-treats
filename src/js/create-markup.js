const gallery = document.querySelector('.gallery');

export const createMarkup = (array) => {
    const markup = array.map((element) => 
        `<div class="card-recipe" style="background-image: url(${element.preview})">
            <h3 class="card-title">${element.title}</h3>
            <p class="card-description">${element.description}</p>
            <button type="button" class="card-button" data-id="${element._id}">See recipe</button>
        </div>`
    ).join('');
    gallery.insertAdjacentHTML('beforeend', markup);
}