import {
  SEARCH_RECIPES,
  SET_LOADING,
  UPDATE_RECIPES,
  GET_RECIPE,
  SET_ALERT,
  REMOVE_ALERT,
  SET_SELECTED_INGREDIENTS,
  SEARCH_BY_INGREDIENTS,
  CLEAR_RECIPES,
} from "./types";

export default (state, action) => {
  switch (action.type) {
    case SEARCH_RECIPES:
      return {
        ...state,
        recipes: action.payload.results,
        text: action.payload.text,
        loading: false,
      };
    case UPDATE_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        loading: false,
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload.recipe,
        recipeDietInfo: action.payload.recipeDietInfo,
        steps: action.payload.steps,
        ingredients: action.payload.ingredients,
        loading: false,
      };

    case SET_SELECTED_INGREDIENTS:
      return {
        ...state,
        selectedIngredients: action.payload,
      };
    case SEARCH_BY_INGREDIENTS:
      return {
        ...state,
        recipes: action.payload.recipes,
        selectedIngredients: action.payload.selectedIngredients,
        loading: false,
      };

    case CLEAR_RECIPES:
      return {
        ...state,
        recipes: [],
        selectedIngredients: [],
        text: "",
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};
