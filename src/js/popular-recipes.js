
import  { fetchPopularRecipes } from './service/API.js';

const loadBtn = document.querySelector('.load-more');
const recipesList = document.querySelector('.popular-recipes-list');

document.addEventListener("DOMContentLoaded", onClick)

function onClick (e) {
    fetchPopularRecipes()
    .then(json => createMarkup(json))
    .then(markup => addMarkup(markup))
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

    const maxLength = 75;

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
  

  
