import React, { useContext } from "react";
import RecipeContext from "../../context/recipeContext";

const Alert = () => {
  const recipeContext = useContext(RecipeContext);

  const { alert } = recipeContext;

  return (
    alert !== null && (
      <div className="alert">
        <i className="fas fa-info-circle" /> {alert}
      </div>
    )
  );
};

export default Alert;
