import { fetchRecipesById } from "./service/API";

export const addToFavorites = async () => {
    const favoritesBtns = document.querySelectorAll('.card-favorites-btn');

    favoritesBtns.forEach(button => {
        const id = button.getAttribute('data-id');
        const heart = button.querySelector('.icon-heart');
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.find(favorite => favorite._id === id))
            heart.classList.add('is-favorite');

        button.addEventListener('click', async () => {
            const result = await fetchRecipesById(id);
            const { _id, preview, title, description, rating, category } = result;

            if (heart.classList.contains('is-favorite')) {
                heart.classList.remove('is-favorite');
                const newFavorites = favorites.filter(favorite => favorite._id !== result._id);
                localStorage.setItem('favorites', JSON.stringify(newFavorites));
                return;
            }

            heart.classList.add('is-favorite');
            localStorage.setItem('favorites', JSON.stringify([favorites, { _id, preview, title, description, rating, category }].flat()));
        });
    });
}   