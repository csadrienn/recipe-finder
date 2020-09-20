import React, { useContext, useEffect } from "react";
import RecipeItem from "./RecipeItem";
import Spinner from "../layout/Spinner";
import RecipeContext from "../../context/recipeContext";
import "./Recipes.css";

let pathName = "";

const Recipes = ({ path }) => {
  const recipeContext = useContext(RecipeContext);
  const { text, loading, recipes } = recipeContext;

  //Clear the repices if arrives from a different search path
  useEffect(() => {
    if (path !== pathName) {
      recipeContext.clearRecipes();
      pathName = path;
    }
    // eslint-disable-next-line
  }, [path]);

  if (loading) {
    return <Spinner />;
  } else {
    if (recipes.length > 0) {
      return (
        <div className="recipes">
          {recipes.map(recipe => (
            <RecipeItem key={recipe.id} recipe={recipe} path={path} />
          ))}
        </div>
      );
    } else {
      return <div>{text.length > 0 && <h3 className="mt-2">No results..."{text}"</h3>}</div>;
    }
  }
};

export default Recipes;
