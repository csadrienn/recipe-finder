import React, { useContext } from "react";
import RecipeContext from "../../../context/recipeContext";

const Ingredients = () => {
  const recipeContext = useContext(RecipeContext);

  const { selectedIngredients } = recipeContext;

  const removeIngredient = (e, ingredient) => recipeContext.searchByIngredients(ingredient);

  const removeAll = () => recipeContext.clearRecipes();

  return (
    <div className="ingredients">
      <div className="ingredient-list">
        <h3>Ingredients:</h3>
        <ul>
          {selectedIngredients.map((si, index, ul) => (
            <li key={`${si}${index}`} className="ingredient">
              <span>
                <i className="fas fa-check"></i> {si}
              </span>
              <button className="remove-btn" onClick={e => removeIngredient(e, si)}>
                X
              </button>
            </li>
          ))}
        </ul>
      </div>
      {selectedIngredients.length > 0 && (
        <button type="button" className="remove-all-btn" onClick={removeAll}>
          Clear All
        </button>
      )}
    </div>
  );
};

export default Ingredients;
