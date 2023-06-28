
import  { fetchPopularRecipes } from './service/API.js';

const loadBtn = document.querySelector('.load-more');
const recipesList = document.querySelector('.popular-recipes-list');

document.addEventListener("DOMContentLoaded", onClick)

function onClick (e) {
    fetchPopularRecipes()
    .then(json => createMarkup(json))
    .then(markup => addMarkup(markup))
    .then(data => moveElement())
}

//функция создания разметки - принимает массив, возвращает строку разметки
function createMarkup(recipes){
    
    const markup = recipes
    .map((recipe) => {
      return `
      <li class="recipe-card">
        <img class="recipe-image" src="${recipe.preview}" alt="${recipe.title}" loading="lazy" />
        <div class="recipe-info">
            <h3 class="recipe-title">${truncateTitle(recipe.title)}</h3>
            <p class="recipe-description">${truncateText(recipe.description)}</p>
        </div>
      </li>
      `;
    })
    .join("");
    return markup
}

// функция вставить разметку
function addMarkup(markup){
    recipesList.innerHTML = markup; 
}

// функция обрезки описания
function truncateText(text) {

    const maxLength = makeMaxLength();

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
}

// функция обрезки названия
function truncateTitle(text) {

    const maxLength = 10;

    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

// функция проверки ширины окна браузера --> возращает максимальную длину строки 
function makeMaxLength() {

    if (window.innerWidth < 768) {
      const maxLength = 80;
      return maxLength;
    }
    if (window.innerWidth < 1280) {
      const maxLength = 60;
      return maxLength;
    }
    const maxLength = 95;
    return maxLength;
  }


  window.addEventListener('resize', function() {
    moveElement();
  });

  // функция перестановки блока
  function moveElement() {
    let screenWidth = window.innerWidth;
  
    if (screenWidth > 767) { // Пороговое значение ширины экрана для перемещения элемента
      const element = document.getElementById('popular-recipes');
      const newParent = document.querySelector('.categories-section');
      newParent.appendChild(element);
    }

    if (screenWidth < 768) { // Пороговое значение ширины экрана для перемещения элемента
      const element = document.getElementById('popular-recipes');
      const newParent = document.querySelector('main');
      newParent.appendChild(element);
    }
  }

  



  

