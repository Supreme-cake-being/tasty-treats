import { fetchCategories, fetchAllRecipes } from '../js/service/API';

const galleryEl = document.querySelector('.gallery');

async function createCategoryButtons() {
  const categoryListEl = document.querySelector('.categories-list');

  const categories = await fetchCategories();

  const itemBtn = categories
    .map(category => {
      return `<li class="categories-item">
                <button class="category-btn"
                  type="button">${category}
                </button>
              </li>`;
    })
    .join('');

  categoryListEl.innerHTML += itemBtn;
}

createCategoryButtons();

// const categoryBtns = document.querySelectorAll('.category-btn');

// categoryBtns.forEach(btn => {
//   btn.addEventListener('click', async event => {
//     const category = event.target.textContent.trim();

//     galleryEl.innerHTML = '';

//     const { recipes } = await fetchAllRecipes(category);

//     recipes.forEach(recipe => {
//       const card = `<div class="card-recipe" style="background-image: url(${recipe.preview})">
//                     <svg class="card-heart" src="./images/heart-card.svg" width="22" height="22"></svg>
//                     <h3 class="card-title">${recipe.title}</h3>
//                     <p class="card-description">${recipe.description}</p>
//                     <button type="button" class="card-button">Дивитися рецепт</button>
//                   </div>`;
//       galleryEl.innerHTML += card;
//     });
//   });
// });
