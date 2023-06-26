import { fetchCategories, fetchRecipes } from './js/service/API';

const refs = {
    categories: document.querySelector('.categories'),
    favorites: document.querySelector('.favorites'),
    noData: document.querySelector('.no-data')
}

// console.log(refs);
function renderCategories(categories, favorites) {
    refs.categories.innerHTML = '';
    const items = categories
        .filter((element) => {
            return favorites.some((favorite) => {
                return element.name === favorite.category;
            })
        })
        .map((category) => {
            const item = document.createElement('li')
            item.textContent = category.name;
            return item;
        })
    refs.categories.append(...items);
}

function renderFavotites(favorites) {
    refs.favorites.innerHTML = '';
    const items = favorites.map((favorite) => {
        const item = document.createElement('li')
        item.addEventListener('click', () => {
            const newFavorites = favorites.filter((element) => {
                return element._id !== favorite._id;
            })
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            renderPage();
        })
        item.textContent = favorite.title;
        item.setAttribute('data-id', favorite._id)
        return item;
    })
    refs.favorites.append(...items);
}

function renderPage() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    if (!favorites) {
        refs.noData.style.display = 'flex';
    } else (
        fetchCategories().then((categories) => {
            renderFavotites(favorites);
            renderCategories(categories, favorites);
        })
    )
}

function makeFakeFavorites() {
    localStorage.setItem('favorites', JSON.stringify([
    {
        "_id": "6462a8f74c3d0ddd28897fc1",
        "title": "Chocolate Gateau",
        "category": "Dessert",
        "area": "French",
        "description": "A French dessert consisting of layers of chocolate sponge cake and chocolate ganache, typically topped with chocolate glaze and chocolate decorations.",
        "preview": "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560403/zyahxajhkglf8sisiqlh.jpg",
        "time": "75",
        "rating": 3
    },
    {
        "_id": "6462a8f74c3d0ddd28897fbc",
        "title": "Irish stew",
        "category": "Beef",
        "area": "Irish",
        "description": "A traditional Irish dish made with lamb, potatoes, carrots, onions, and herbs, cooked in a broth or gravy.",
        "preview": "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560408/kknfjaqupiqhufj5kspx.jpg",
        "time": "160",
        "rating": 3
    },
    {
        "_id": "6462a8f74c3d0ddd28897fb9",
        "title": "Lamb tomato and sweet spices",
        "category": "Lamb",
        "area": "Moroccan",
        "description": "A Moroccan-inspired dish made with lamb, tomatoes, onions, and spices (such as cinnamon, ginger, and cumin), typically served with couscous or bread.",
        "preview": "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560405/zlxxkd81sadgwzbugyzl.jpg",
        "time": "90",
        "rating": 1
    },
    {
        "_id": "6462a8f74c3d0ddd28897fdf",
        "title": "Lamb Rogan josh",
        "category": "Lamb",
        "area": "Indian",
        "description": "A spicy lamb dish from Kashmiri cuisine, flavored with a blend of aromatic spices and yogurt.",
        "preview": "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560404/dyf7xtdw6aoggvc8ymuk.jpg",
        "time": "90",
        "rating": 5
    },
    {
        "_id": "6462a8f74c3d0ddd28897fbf",
        "title": "Teriyaki Chicken Casserole",
        "category": "Chicken",
        "area": "Japanese",
        "description": "A Japanese-inspired casserole made with chicken, teriyaki sauce, rice, and vegetables.",
        "preview": "https://res.cloudinary.com/ddbvbv5sp/image/upload/v1678560401/g7gww5fdeu7kjti0fk7s.jpg",
        "time": "75",
        "rating": 1
    }
]));
}

fetchRecipes().then((recipes) => {
    console.log(recipes);
})

makeFakeFavorites();

renderPage();