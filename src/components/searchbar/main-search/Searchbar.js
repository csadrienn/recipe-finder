import React, { useState, useContext } from "react";
import RecipeContext from "../../../context/recipeContext";
import FilterArea from "./FilterArea";
import Alert from "../../layout/Alert";

const Searchbar = () => {
  const recipeContext = useContext(RecipeContext);

  const [input, setInput] = useState("");
  const [filter, setFilter] = useState(false);

  const { text, alert } = recipeContext;

  //Set the input state when the user's input changes
  const onChange = e => setInput(e.target.value);

  //Call the searchRecipes function if the input is not empty
  const onSubmit = e => {
    e.preventDefault();
    if (input === "") {
      recipeContext.setAlert("Please enter something to search!");
    } else {
      recipeContext.searchRecipes(input);
      setInput("");
    }
  };

  //Show or hide the filter area by setting filter state
  const toggleFilter = () => setFilter(!filter);

  return (
    <div onSubmit={onSubmit} className="form-container">
      <form>
        <div className="search-container">
          <div className="input-wrapper">
            <div className="input">
              <input
                type="text"
                name="input"
                placeholder="Search Recipes..."
                value={input}
                onChange={onChange}
              />
              <button type="submit" className="btn">
                <i className="fas fa-search" />
              </button>
            </div>

            {text.length > 0 && (
              <div className="sep-btn">
                <button type="button" className="btn" onClick={toggleFilter}>
                  <i className="fas fa-sliders-h" />
                </button>
              </div>
            )}
          </div>
        </div>
        {alert && <Alert />}
        {text.length > 0 && <h3>Recipes for "{text}"</h3>}

        <FilterArea shown={filter} />
      </form>
    </div>
  );
};

export default Searchbar;
