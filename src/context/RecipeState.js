import React, { useReducer } from "react";
import axios from "axios";
import RecipeContext from "./recipeContext";
import RecipeReducer from "./recipeReducer";
import {
  SEARCH_RECIPES,
  SET_LOADING,
  UPDATE_RECIPES,
  GET_RECIPE,
  SET_ALERT,
  REMOVE_ALERT,
  SEARCH_BY_INGREDIENTS,
  CLEAR_RECIPES,
} from "./types";

let apiKey = process.env.REACT_APP_API_KEY;

const RecipeState = props => {
  const initialState = {
    text: "",
    recipes: [],
    recipe: {},
    recipeDietInfo: [],
    steps: [],
    ingredients: [],
    selectedIngredients: [],
    loading: false,
    alert: null,
  };

  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  // Search Recipes
  const searchRecipes = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${text}&number=20`
    );

    dispatch({
      type: SEARCH_RECIPES,
      payload: { results: res.data.results, text },
    });
  };

  //Update search with filters
  const updateRecipes = async selectedLists => {
    setLoading();

    let url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${state.text}&number=20`;

    Object.keys(selectedLists).forEach(listName => {
      if (selectedLists[listName].length > 0) {
        let text = "&" + listName.toLowerCase().slice(0, listName.length - 1) + "=";
        const selectedValues = selectedLists[listName].map(el => el.value);
        text += selectedValues.join(",");
        url += text;
      }
    });

    const res = await axios.get(url);

    dispatch({
      type: UPDATE_RECIPES,
      payload: res.data.results,
    });
  };

  //Get detailed recipe
  const getRecipe = async id => {
    setLoading();
    const res = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}&includeNutrition=false`
    );

    const regex = /<\s*b>|<\s*\/b>|<\s*a[^>]*>|<\s*\/a>/g;
    const rec = res.data;
    rec.summary = rec.summary.replace(regex, "");
    const method =
      rec.analyzedInstructions && rec.analyzedInstructions.length > 0
        ? rec.analyzedInstructions[0].steps
        : [];
    dispatch({
      type: GET_RECIPE,
      payload: {
        recipe: rec,
        recipeDietInfo: rec.diets,
        steps: method,
        ingredients: rec.extendedIngredients,
      },
    });
  };

  //Search recipes based on a list of ingredients
  const searchByIngredients = async input => {
    setLoading();
    let newIngredients = [...state.selectedIngredients];
    if (newIngredients.includes(input)) {
      const index = newIngredients.indexOf(input);
      newIngredients.splice(index, 1);
    } else {
      newIngredients.push(input);
    }

    let data = [];
    if (newIngredients.length > 0) {
      let ingText = newIngredients.join(",+");
      const url = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ranking=1&ingredients=${ingText}&number=15`;
      const res = await axios.get(url);
      data = res.data;
    }

    dispatch({
      type: SEARCH_BY_INGREDIENTS,
      payload: { selectedIngredients: newIngredients, recipes: data },
    });
  };

  // Clear recipes, text and selected ingredients
  const clearRecipes = () => dispatch({ type: CLEAR_RECIPES });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  // Set the alert
  const setAlert = message => {
    dispatch({ type: SET_ALERT, payload: message });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 5000);
  };

  return (
    <RecipeContext.Provider
      value={{
        text: state.text,
        recipes: state.recipes,
        recipe: state.recipe,
        recipeDietInfo: state.recipeDietInfo,
        steps: state.steps,
        ingredients: state.ingredients,
        selectedIngredients: state.selectedIngredients,
        loading: state.loading,
        alert: state.alert,
        searchRecipes,
        setLoading,
        getRecipe,
        updateRecipes,
        clearRecipes,
        searchByIngredients,
        setAlert,
      }}
    >
      {props.children}
    </RecipeContext.Provider>
  );
};

export default RecipeState;
