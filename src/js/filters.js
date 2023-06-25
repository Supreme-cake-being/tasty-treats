// import { fetchAllRecipes, fetchIngredient } from '../js/service/API';

// async function createTimeOptions(times) {
//   const selectTimeEl = document.querySelector('.select-time');

//   const options = ['<option value=""></option>', ...new Set(times)]
//     .sort((a, b) => a - b)
//     .map(time => `<option value="">${time} min</option>`);

//   selectTimeEl.innerHTML = options.join('');
// }

// async function createAreaOptions(areas) {
//   const selectAreaEl = document.querySelector('.select-area');

//   const options = ['<option value=""></option>', ...new Set(areas)]
//     .sort()
//     .map(area => `<option value="">${area}</option>`);

//   selectAreaEl.innerHTML = options.join('');
// }

// async function initializeOptions() {
//   const { times, areas } = await fetchAllRecipes();
//   await createTimeOptions(times);
//   await createAreaOptions(areas);
// }

// initializeOptions();

// async function createIngredientOptions() {
//   const ingredients = await fetchIngredient();
//   const selectIngredientEl = document.querySelector('.select-ingredients');

//   const options = ['<option value=""></option>', ...new Set(ingredients)]
//     .sort()
//     .map(ingredientId => `<option value="">${ingredientId}</option>`);

//   selectIngredientEl.innerHTML = options.join('');
// }

// createIngredientOptions();
