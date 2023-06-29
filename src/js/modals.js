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
    recipe: document.querySelector(".gallery-list"),
    overlay: document.querySelector(".modal-overlay"),
    modal: document.querySelector(".modal"),
    modalRating: document.querySelector(".modal-rating"),
    favBtn: document.querySelector(".modal-fav-btn"),
    closeModalBtn: document.querySelector(".modal-close"),
    ratingBtn: document.querySelector(".modal-rating-btn"),
    ratingDesc: document.querySelector(".modal-rating-desk"),
    submitRatingBth: document.querySelector(".modal-rate-btn"),
    submitRatingEmail: document.querySelector(".modal-rate-input"),
    submitRecipeRating: document.querySelector(".modal-rating-raiting")
}
// заповнення модалки даними рецепту

const renderModals = (data) => {
// console.log(data);
   
    refs.recipeName.textContent = data.title;
    refs.recipeRating.textContent = data.rating;
    
    if ( data.youtube === "" ){
        refs.recipeVideo.src = data.preview
    }
    else {
        refs.recipeVideo.src = data.youtube.replace("watch?v=", "embed/")
    }

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
    refs.favBtn.setAttribute("data-id", data._id)
    if (findIdiInFavorites(data._id)) {
        refs.favBtn.textContent = "Remove from favorite"
        refs.favBtn.setAttribute("favorites",1)
    }
    else { 
        refs.favBtn.textContent = "Add to favorite"
        refs.favBtn.setAttribute("favorites",0)
    }
    refs.ratingBtn.setAttribute("id", data._id)
    refs.ratingBtn.setAttribute("desc", data.description)
}
// очистка полів модалки
const clearModalFields = () => {
    refs.recipeName.textContent = "";
    refs.recipeRating.textContent = "";
    refs.recipeStarRating.innerHTML = "";
    refs.recipeVideo.src = "";
    refs.recipeCookTime.textContent = "";
    refs.recipeTags.innerHTML = "";
    refs.recipeIngredients.innerHTML = "";
    refs.recipeInstructions.textContent = "";
}
//перевірка зноходження рецепта в favorites
const findIdiInFavorites = (id) => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    const finded = favorites.some(fav => fav._id === id)
    return finded;
}

// const addToFavorite = (name,data) => {
//     let existing = localStorage.getItem(name);
// 	existing = existing ? existing.split(',') : [];
// 	existing.push(data);
//     localStorage.setItem(name, existing.toString());
// }

let escList
// закриття модалки
const closeModal = () => { 
    refs.overlay.classList.remove("active");
    refs.modal.classList.remove("active");
    document.body.style.overflow = "";
    clearModalFields();
    document.removeEventListener("keydown", escList);
    closeModalRating();
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

const openModalRating = () => {
    refs.ratingDesc.textContent = refs.ratingBtn.attributes.desc.value;
    document.body.style.overflow = "hidden";
    refs.modalRating.classList.add("active")
    refs.modal.classList.remove("active");
}

const closeModalRating = () => { 
    refs.overlay.classList.remove("active");
    refs.modalRating.classList.remove("active");
    document.body.style.overflow = "";
    clearModalFields();
    document.removeEventListener("keydown", escList);
    refs.submitRatingEmail.value = "";
        refs.ratingBtn.attributes.id.value = "";
        document.querySelector("#rating-1").checked = true;
        refs.submitRecipeRating.textContent = 1;
} 

//лістнери модалки
refs.recipe.addEventListener("click", (evt) => {
    if (evt.target.nodeName !== "BUTTON")
        return;

    fetchRecipesById(evt.target.getAttribute('data-id'))
        .then((data) => {
            evt.stopPropagation();
            renderModals(data);
            openModal();
        })
})

refs.closeModalBtn.addEventListener("click", closeModal);

refs.overlay.addEventListener("click", (evt) => {
    if (evt.target === evt.currentTarget) {
        closeModal();
        closeModalRating();
    }
    if (evt.target.type === "button") {
        if (evt.target.attributes.favorites.value === "1") {                
            refs.favBtn.textContent = "Add to favorite"
            refs.favBtn.setAttribute("favorites",0)

        }
        else {
            refs.favBtn.textContent = "Remove from favorite"
            refs.favBtn.setAttribute("favorites",1)
           
        }
    }
})

const rating = document.querySelector(".modal-staring")
const rat = document.querySelector(".modal-rating-raiting")

rating.addEventListener("change",(evt)=>{rat.textContent = evt.target.value;})
refs.ratingBtn.addEventListener("click", openModalRating)
refs.submitRatingBth.addEventListener("click", (evt) => {
    evt.preventDefault();
    const emailFormat = "[a-z, A-Z, 0-9, ._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
    if (refs.submitRatingEmail.value.match(emailFormat)) {
        console.log(refs.ratingBtn.attributes);
        console.log(`{ID: "${refs.ratingBtn.attributes.id.value}" , email: ${refs.submitRatingEmail.value}, rating: ${refs.submitRecipeRating.textContent}}`);
        closeModalRating();    
    }
    else {
        refs.submitRatingEmail.value = refs.submitRatingEmail.value;
    }
})