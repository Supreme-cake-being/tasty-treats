import { fetchRecipes, fetchRecipesByCategory, fetchCategories, fetchRecipesByFilters } from '../js/service/API';
import { createMarkup } from "./create-markup";

const containerWidth = document.querySelector('.container');
const allCategoriesBtn = document.querySelector('.categories-btn');
const categories = document.querySelector('.categories-list');
const gallery = document.querySelector('.gallery');


// allCategoriesBtn.addEventListener('click', async () => {
//     gallery.innerHTML = '';
//     // const pageLimit = getPageLimit();

//     const recipes = await fetchRecipes();
//     const { results } = recipes;

//     createMarkup(results);
// })

// categories.addEventListener('click', async (e) => {
//     if (e.target.nodeName !== 'BUTTON')
//         return;
    
//     gallery.innerHTML = '';
//     // const pageLimit = getPageLimit();
    
//     const categoryName = e.target.textContent.trim();
//     const recipes = await fetchRecipesByFilters(
//       categoryName,
//       searchName.value.trim(),
//       searchIngredients.value,
//       searchArea.value,
//       searchTime.value
//     );
//     const { results } = recipes;

//     createMarkup(results);
// });

// const getPageLimit = () => {
//     let pageLimit;
//     switch (containerWidth.clientWidth) {
//         case 1280:
//             pageLimit = 9;
//             break;
        
//         case 768:
//             pageLimit = 8;
//             break;
        
//         default:
//             pageLimit = 6;
//             break;   
//     }
//     return pageLimit;
// }

const createCategoryButtons = async () => {
  const categoryListEl = document.querySelector('.categories-list');

  const categories = await fetchCategories();

  const markup = categories.map(({ name }) => `
              <li class="categories-item">
                <button class="category-btn" type="button">
                  ${name}
                </button>
              </li>`).join('');
  
  categoryListEl.insertAdjacentHTML('beforeend', markup);
}
createCategoryButtons();
