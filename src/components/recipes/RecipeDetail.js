import React, { useEffect, useContext } from "react";
import RecipeContext from "../../context/recipeContext";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import "./RecipeDetail.css";

const RecipeDetail = ({ match }) => {
  const recipeContext = useContext(RecipeContext);
  const { recipe, recipeDietInfo, ingredients, steps, getRecipe, loading } = recipeContext;
  const {
    title,
    image,
    summary,
    preparationMinutes,
    cookingMinutes,
    servings,
    sourceName,
    sourceUrl,
  } = recipe;

  useEffect(() => {
    getRecipe(match.params.id);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="single-recipe-container">
        <div className="back-btn-wrapper">
          <Link to={match.params.from === "search" ? "/" : "/fridge"} className="back-btn">
            Back to search
          </Link>
        </div>

        <h1>{title}</h1>
        <div className="single-recipe-card">
          <div className="single-recipe-img">
            <img src={image} alt={title} />
          </div>
          <div className="single-recipe-info">
            <ul>
              <li className="info-block">
                <span className="tag">preparation:</span>
                <span className="info">{preparationMinutes} minutes</span>
              </li>
              <li className="info-block">
                <span className="tag">cooking:</span>
                <span className="info">{cookingMinutes} minutes</span>
              </li>
              <li className="info-block">
                <span className="tag">servings:</span>
                <span className="info">{servings}</span>
              </li>
              <li className="info-block">
                <span className="tag">dietary:</span>
                <ul className="info info-list">
                  {recipeDietInfo.map((diet, index) => (
                    <li key={index}>{diet}</li>
                  ))}
                </ul>
              </li>
            </ul>
            <p>{summary}</p>
          </div>
        </div>
        <div className="recipe-content">
          <div className="list-container">
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={`${ingredient.id}i${index}`}>
                  <div className="img-container">
                    <img
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                      alt={ingredient.name}
                    />
                  </div>
                  <div className="ingredient-info">
                    <span>
                      {ingredient.amount} {ingredient.unit}
                    </span>
                    <span>{ingredient.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="instructions">
            <h3>Method</h3>
            {steps && (
              <ul>
                {steps.map(step => (
                  <li key={step.number}>
                    <span>{step.number}.</span>
                    {step.step}
                  </li>
                ))}
              </ul>
            )}
            <p>
              See detailed instructions on
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                {sourceName ? ` ${sourceName}` : ` ${sourceUrl}`}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default RecipeDetail;
