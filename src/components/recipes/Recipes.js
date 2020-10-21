import React, { useContext, useEffect } from "react";
import RecipeItem from "./RecipeItem";
import Spinner from "../layout/Spinner";
import RecipeContext from "../../context/recipeContext";
import "./Recipes.css";

let pathName = "";

const Recipes = ({ path }) => {
  const recipeContext = useContext(RecipeContext);
  const { text, loading, recipes, error } = recipeContext;

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
    if (!error) {
      if (recipes.length > 0) {
        return (
          <div className="recipes">
            {recipes.map(recipe => (
              <RecipeItem key={recipe.id} recipe={recipe} path={path} />
            ))}
          </div>
        );
      } else {
        return (
          <div>
            {text.length > 0 && (
              <h3 style={{ margin: "2rem auto", textAlign: "center" }}>No results..."{text}"</h3>
            )}
          </div>
        );
      }
    } else {
      return (
        <div>
          <h1
            style={{
              margin: "4rem auto 0",
              color: "#e97666",
              textAlign: "center",
            }}
          >
            {error.status}
          </h1>
          <h3 style={{ margin: "1rem auto", textAlign: "center" }}>Something went wrong...</h3>
          <p style={{ margin: "1rem auto", textAlign: "center" }}>{error.data.message}</p>
        </div>
      );
    }
  }
};

export default Recipes;
