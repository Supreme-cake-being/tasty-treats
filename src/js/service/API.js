export const fetchAllRecipes = async () => {
  try {
    const mainResponse = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/recipes'
    );
    const { totalPages } = await mainResponse.json();

    const recipesPromises = Array.from(
      { length: totalPages },
      async (_, index) => {
        const response = await fetchRecipes(index + 1);
        return response.results;
      }
    );
    const recipesResults = await Promise.all(recipesPromises);

    const recipes = recipesResults.flat();

    const { times, areas, titles, previews, categories, descriptions } =
      recipes.reduce(
        (acc, recipe) => {
          const { time, area, title, preview, category, description } = recipe;
          acc.times.push(time);
          acc.areas.push(area);
          acc.titles.push(title);
          acc.previews.push(preview);
          acc.categories.push(category);
          acc.descriptions.push(description);
          return acc;
        },
        {
          times: [],
          areas: [],
          titles: [],
          previews: [],
          categories: [],
          descriptions: [],
        }
      );

    return {
      recipes,
      times,
      areas,
      titles,
      previews,
      categories,
      descriptions,
    };
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
};

async function fetchRecipes(page) {
  try {
    const response = await fetch(
      `https://tasty-treats-backend.p.goit.global/api/recipes?page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return null;
  }
}

export const fetchIngredient = async () => {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/ingredients'
    );
    const data = await response.json();

    const ingredients = data.map(ingredient => ingredient.name);

    return ingredients;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return [];
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(
      'https://tasty-treats-backend.p.goit.global/api/categories'
    );
    const data = await response.json();

    const categories = data.map(category => category.name);

    return categories;
  } catch (error) {
    console.error('Помилка під час виконання запиту:', error);
    return [];
  }
};
