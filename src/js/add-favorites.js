import { fetchRecipesById } from "./service/API";

export const addToFavorites = async () => {
    const favoritesBtns = document.querySelectorAll('.favorites-btn');

    favoritesBtns.forEach(button => {
        button.addEventListener('click', async () => {
            const id = button.getAttribute('data-id');
            const result = await fetchRecipesById(id);
            const { _id, preview, title, description, rating } = result;

            const heart = button.querySelector('.icon-heart');
            const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.find(favorite => favorite._id === result._id)) {
                heart.classList.add('is-favorite');
                localStorage.setItem('favorites', JSON.stringify([favorites, { _id, preview, title, description, rating }].flat()));
                return;
            }
            
            heart.classList.remove('is-favorite');
            const newFavorites = favorites.filter(favorite => favorite._id !== result._id);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        });
    });
}   