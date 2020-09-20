import React from "react";
import FridgeSearchbar from "../searchbar/ingredient-search/FridgeSearchbar";
import Recipes from "../recipes/Recipes";
import Ingredients from "../searchbar/ingredient-search/Ingredients";
import "./Fridge.css";

const Frigde = () => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <FridgeSearchbar />
      <div className="flex-container">
        <div className="ingredients-container">
          <Ingredients />
        </div>
        <div className="recipes-container" style={{ flex: "4" }}>
          <Recipes path="fridge" />
        </div>
      </div>
    </div>
  );
};

export default Frigde;
