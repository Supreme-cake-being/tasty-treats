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

const fetchIngredient = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/ingredients`
    );
    const ingredients = response.map(ingredient => ingredient.name);
    console.log(ingredients);
    return ingredients;
  } catch (error) {
    console.log(error.message);
  }
};

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

export async function fetchEvents() {
  try {
    let response = await axios.get(`${BASE_URL}/events`);
    let result = await response.data;
    console.log(result);

    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export { fetchRecipes, fetchRecipesByCategory, fetchIngredient, fetchCategories };

