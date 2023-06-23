import debounce from 'lodash.debounce';

const input = document.querySelector('.input');

async function fetchRecipes() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
}

function printTitles(data, keyword) {
  if (data && data.results) {
    const titles = data.results
      .filter(item => item.title.includes(keyword))
      .map(item => item.title);
    console.log(titles);
  } else {
    console.log('Немає даних для виведення заголовків');
  }
}

async function fetchDataAndPrintTitles(keyword) {
  const data = await fetchRecipes();
  printTitles(data, keyword);
}

const debouncedFetchDataAndPrintTitles = debounce(fetchDataAndPrintTitles, 300);

input.addEventListener('input', () => {
  const keyword = input.value.trim();
  debouncedFetchDataAndPrintTitles(keyword);
});

async function fetchDataTitles() {
  const data = await fetchRecipes();
  printTitles(data);
}
fetchDataTitles();

async function recipes() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes'
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
  }
}
recipes();

async function recipes() {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes'
    );
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
  }
}
recipes();

// async function fetchRecipes() {
//   try {
//     let totalPages = 1;
//     let results = [];

//     for (let page = 1; page <= totalPages; page++) {
//       const response = await fetch(
//         `https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}`
//       );
//       const data = await response.json();
//       results = results.concat(data.results);

//       if (data.totalPages) {
//         totalPages = data.totalPages;
//       }
//     }

//     return results;
//   } catch (error) {
//     console.error('Помилка під час виконання запиту:', error);
//     return [];
//   }
// }

// function printTitles(data) {
//   if (data.length > 0) {
//     const titles = data.map(item => item.title);
//     console.log(titles);
//   } else {
//     console.log('Немає даних для виведення заголовків');
//   }
// }
