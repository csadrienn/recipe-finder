import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const RecipeItem = ({ recipe: { id, title, image, missedIngredients }, path }) => {
  return (
    <div className="recipe">
      <img src={image} alt={title} />
      <Link to={`/${path}/recipe/${id}`} className="recipe-info">
        <h3>{title}</h3>
        {missedIngredients && (
          <Fragment>
            <p>You will also need:</p>
            <ul>
              {missedIngredients.map((ing, index) => (
                <li key={`${ing.id}i${index}`}>{ing.name}</li>
              ))}
            </ul>
          </Fragment>
        )}
      </Link>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired,
};

export default RecipeItem;
