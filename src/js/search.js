// import debounce from 'lodash.debounce';

// const inputEl = document.querySelector('.input');
// const galleryEl = document.querySelector('.gallery');
// let fetchTimeout;

// function createGallery(data, keyword) {
//   galleryEl.innerHTML = '';

//   if (data && data.length > 0) {
//     const card = data
//       .filter(
//         item =>
//           item.title && item.title.toLowerCase().includes(keyword.toLowerCase())
//       )
//       .map(recipe => {
//         return `<div class="card-recipe" style="background-image: url(${recipe.preview})">
//                   <svg class="card-heart"
//                     src="./images/heart-card.svg"
//                     width="22"
//                     height="22" />
//                   <h3 class="card-title">${recipe.title}</h3>
//                   <p class="card-description">${recipe.description}</p>
//                   <button type="button" class="card-button">
//                     See recipe
//                   </button>
//                 </div>`;
//       })
//       .join('');
//     galleryEl.innerHTML += card;
//   } else {
//     console.log('Немає даних для виведення заголовків');
//   }
// }

// // Функція для виконання запиту на отримання рецептів за заданим ключовим словом
// async function fetchDataAndPrintTitles(keyword) {
//   const data = await fetchAllRecipes();
//   createGallery(data, keyword);
// }

// // Використовуємо debounce для затримки виконання функції fetchDataAndPrintTitles
// // після зміни значення в input протягом 300 мс
// const debouncedFetchDataAndPrintTitles = debounce(fetchDataAndPrintTitles, 300);

// // Додаємо обробник події input для виклику функції з пошуком і виводом заголовків.
// inputEl.addEventListener('input', () => {
//   const keyword = inputEl.value.trim();

//   clearTimeout(fetchTimeout); // Скидаємо попередній таймер запиту

//   if (keyword.length > 0) {
//     fetchTimeout = setTimeout(() => {
//       debouncedFetchDataAndPrintTitles(keyword);
//     }, 300);
//   } else {
//     console.log('Введіть ключове слово для пошуку');
//     clearTimeout(fetchTimeout); // Скидаємо таймер запиту, якщо поле вводу порожнє
//     galleryEl.innerHTML = '';
//   }
// });


// const searchForm = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');

// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
// });


// searchForm.addEventListener('input', (e) => {

// });
