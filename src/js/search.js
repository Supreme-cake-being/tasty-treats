import debounce from 'lodash.debounce';

const inputEl = document.querySelector('.input');
const galleryEl = document.querySelector('.gallery');
let fetchTimeout;

// Функція для отримання всіх рецептів зі стороннього API.
async function fetchAllRecipes() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes'
    );
    const data = await response.json();
    const totalPages = data.totalPages;

    const promises = [];
    for (let page = 1; page <= totalPages; page += 1) {
      promises.push(fetchRecipes(page));
    }

    const results = await Promise.all(promises);
    const allRecipes = results.flatMap(result => result.results);

    return allRecipes;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
}

// Функція для створення розмітки карток рецептів, що містять задане ключове слово.
function createGallery(data, keyword) {
  galleryEl.innerHTML = '';

  if (data && data.length > 0) {
    data
      .filter(
        item =>
          item.title && item.title.toLowerCase().includes(keyword.toLowerCase())
      )
      .forEach(recipe => {
        const card = document.createElement('div');
        card.classList.add('card-recipe');
        card.innerHTML = `<svg class="card-heart"
                           src="./images/heart-card.svg"
                           width="22"
                           height="22" />
                          <h3 class="card-title">${recipe.title}</h3>
                          <p class="card-description">${recipe.description}</p>
                          <button type="button" class="card-button">
                            See recipe
                          </button>`;
        card.style.backgroundImage = `url(${recipe.preview})`;
        galleryEl.appendChild(card);
      });
  } else {
    console.log('Немає даних для виведення заголовків');
  }
}

// Функція для виконання запиту на отримання рецептів за заданим номером сторінки.
async function fetchRecipes(page) {
  try {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
}

// Функція для виконання запиту на отримання рецептів за заданим ключовим словом
// та виведення заголовків, що містять це слово у консоль.
async function fetchDataAndPrintTitles(keyword) {
  const data = await fetchAllRecipes();
  createGallery(data, keyword);
}

// Використовуємо debounce для затримки виконання функції fetchDataAndPrintTitles
// після зміни значення в input протягом 300 мс
const debouncedFetchDataAndPrintTitles = debounce(fetchDataAndPrintTitles, 300);

// Додаємо обробник події input для виклику функції з пошуком і виводом заголовків.
inputEl.addEventListener('input', () => {
  const keyword = inputEl.value.trim();

  clearTimeout(fetchTimeout); // Скидаємо попередній таймер запиту

  if (keyword.length > 0) {
    fetchTimeout = setTimeout(() => {
      debouncedFetchDataAndPrintTitles(keyword);
    }, 300);
  } else {
    console.log('Введіть ключове слово для пошуку');
    clearTimeout(fetchTimeout); // Скидаємо таймер запиту, якщо поле вводу порожнє
    galleryEl.innerHTML = '';
  }
});
