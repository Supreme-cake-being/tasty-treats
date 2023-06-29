import axios from 'axios';
const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';

const fetchRecipes = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes`
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const fetchRecipesByCategory = async (categoryName) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes`, {
        params: {
          category: categoryName,
        }
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const fetchRecipesByFilters = async(currentPage, categoryName, keyword, ingredientName, areaName, selectedTime) => {
  try {
    let perPageLocal;

    if (window.innerWidth >= 1280) {
      perPageLocal = 9;
    } else if (window.innerWidth >= 768) {
      perPageLocal = 8;
    } else {
      perPageLocal = 6;
    }
    const response = await axios.get(
      `${BASE_URL}/recipes`, {
        params: {
          page: currentPage,
          limit: perPageLocal,
          category: categoryName,
          title: keyword,
          ingredient: ingredientName,
          area: areaName,
          time: selectedTime,
        }
      }
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const fetchIngredient = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ingredients`
    );
    const ingredientName = response.data.map(ingredient => ingredient.name);
    const ingredientId = response.data.map(ingredient => ingredient._id)
    return {ingredientName, ingredientId};
  } catch (error) {
    console.log(error.message);
  }
};

const fetchArea = async () => {
  try{
    const response = await axios.get(
      `${BASE_URL}/areas`
    );
    const areas = response.data.map(area => area.name);
    console.log(areas);
    return areas;
  } catch (error) {
    console.log(error.message);
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/categories`
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchRecipesById = async (id) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes/${id}`
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const fetchEvents = async () => {
  try {
    let response = await axios.get(`${BASE_URL}/events`);
    let result = await response.data;
    console.log(result);

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

const fetchPopularRecipes = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/recipes/popular`
    );
    const { data } = response;
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export { fetchRecipes, fetchRecipesByCategory, fetchIngredient, fetchArea, fetchRecipesByFilters, fetchCategories, fetchRecipesById, fetchEvents, fetchPopularRecipes };
