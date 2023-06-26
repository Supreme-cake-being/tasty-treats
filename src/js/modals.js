import { fetchRecipesById, fetchRecipes } from "./service/API";
import { createMarkup } from "./create-markup";

//const data = await fetchRecipesById('6462a8f74c3d0ddd288980d4')
//console.log(data);
//// заглушка для відпрацювання модалки

const gallery = document.querySelector('.gallery');
 const fetch = async () => {
    gallery.innerHTML = '';
    // const pageLimit = getPageLimit();
    const recipes = await fetchRecipes();
    const { results } = recipes;
  createMarkup(results);
}
fetch();

////

const refs = {
    recipeName: document.querySelector(".modal-recipe-name"),
    recipeInstructions: document.querySelector(".modal-recipe-desk"),
    recipeVideo: document.querySelector(".modal-recipe-video"),
    recipeRating: document.querySelector(".modal-recipe-raiting"),
    recipeCookTime: document.querySelector(".modal-time-cooking"),
    recipeTags: document.querySelector(".modal-tag"),
    recipeIngredients: document.querySelector(".modal-ingredients"),
    recipeStarRating: document.querySelector(".modal-star-raiting"),
    recipe: document.querySelector(".gallery"),
    overlay: document.querySelector(".modal-overlay"),
    modal: document.querySelector(".modal"),
    favBtn: document.querySelector(".modal-fav-btn"),
    closeModalBtn: document.querySelector(".modal-close"),
}
// заповнення модалки даними рецепту
const renderModals = (data) => {

    refs.recipeStarRating.innerHTML = '';
    refs.recipeTags.innerHTML = '';
    refs.recipeIngredients.innerHTML = '';

    refs.recipeName.textContent = data.title;
    refs.recipeRating.textContent = data.rating;

    const starRating = [];
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(data.rating)) {    
            starRating.push(`<svg class="star">
                                <use href="./img/icons.svg#icon-star-colored"></use>
                            </svg>`);
        }
        else {
            starRating.push(`<svg class="star">
                                <use href="./img/icons.svg#icon-star-no-colored"></use>
                            </svg>`);
        }
    }
    refs.recipeStarRating.insertAdjacentHTML("afterBegin", starRating.join(""))

    refs.recipeCookTime.textContent = data.time+' min';
  
    const tags = data.tags.map((tag) => {
        return `<li class="modal-tag-item">#${tag}</li>`
    })
    refs.recipeTags.insertAdjacentHTML("afterBegin", tags.join(""))

    const ingredients = data.ingredients.map((ingredient) => {
        return `<li class="modal-ingredients-item">
                <p class="modal-ingredients-name">${ingredient.name}</p>
                <p class="modal-ingredients-weight">${ingredient.measure}</p>
                </li>`
    })
    refs.recipeIngredients.insertAdjacentHTML("afterBegin", ingredients.join(""))
    
    refs.recipeInstructions.textContent = data.instructions;
}

// const overlay = document.querySelector(".modal-overlay");
// const modal = document.querySelector(".modal")
// const favBtn = document.querySelector(".modal-fav-btn");
// const closeModalBtn = document.querySelector(".modal-close");
let escList
// закриття модалки
const closeModal = () => { 
    refs.overlay.classList.remove("active");
    refs.modal.classList.remove("active");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", escList);
} 

//відкриття модалки
const openModal = () => {
    document.body.style.overflow = "hidden";
    refs.overlay.classList.add("active")
    refs.modal.classList.add("active")
    escList = document.addEventListener("keydown", (evt) => {
        if (evt.keyCode === 27) {
            closeModal()
        }  
    })
} 

//лістнери модалки
refs.recipe.addEventListener("click", (evt) => {
    fetchRecipesById(evt.target.attributes["data-id"].value)
        .then((data) => {
            evt.stopPropagation();
            renderModals(data);
            openModal()
        })
})

refs.closeModalBtn.addEventListener("click", closeModal);
refs.favBtn.addEventListener("click", closeModal);
refs.overlay.addEventListener("click",closeModal)