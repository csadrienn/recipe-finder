import React, { useState, useContext } from "react";
import RecipeContext from "../../../context/recipeContext";
import Autocomplates from "./Autocomplates";
import Alert from "../../layout/Alert";
import axios from "axios";

let apiKey = process.env.REACT_APP_API_KEY;

const FridgeSearchbar = () => {
  const recipeContext = useContext(RecipeContext);
  const [autoCompList, setAutocompList] = useState([]);
  const [input, setInput] = useState("");
  const [dropDownShown, setDropDownShown] = useState(false);
  const [autocompFocus, setAutocompFocus] = useState(null);
  const { selectedIngredients, alert } = recipeContext;

  //Set the input state end call getIngredients when the user's input changes
  const onChange = e => {
    const value = e.target.value;
    setInput(value);
    if (value.length > 0) {
      setDropDownShown(true);
      getIngredients(value);
    } else {
      setDropDownShown(false);
    }
  };

  //Get ingredients from API
  const getIngredients = async value => {
    const url = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${value}&number=5`;
    const res = await axios.get(url);
    const list = res.data;
    const newAutoCompList = list.map(ing => ing.name);
    setAutocompList(newAutoCompList);
  };

  //Search when the form submits
  const onSubmit = e => {
    e.preventDefault();
    search(input);
  };

  //Call searchByIngredients function if the input field not empty
  const search = value => {
    if (value === "") {
      recipeContext.setAlert("Please enter an ingredient!");
    } else if (selectedIngredients.includes(value)) {
      recipeContext.setAlert("This ingredient is already selected!");
      hideDropDown();
    } else {
      recipeContext.searchByIngredients(value);
      setInput("");
      hideDropDown();
    }
  };

  const hideDropDown = () => setDropDownShown(false);
  const removeAutocompFocus = () => setAutocompFocus(null);

  //Set the focus of Autocomplates if arrow down pressed
  const onKeyDown = e => {
    const key = e.key || e.keyCode;
    if (dropDownShown && (key === "ArrowDown" || key === 40)) {
      setAutocompFocus(-1);
    }
  };

  //Handle key events of Autocomplates
  const handleAutoComplateOnKeyDowns = (e, index, ul) => {
    const key = e.key || e.keyCode;
    const value = ul[index];
    if ((key === "ArrowUp" || key === 38) && index > 0) {
      setAutocompFocus(index - 1);
    } else if ((key === "ArrowDown" || key === 40) && index < ul.length - 1) {
      setAutocompFocus(index + 1);
    } else if (key === "Enter" || key === 13) {
      setInput(value);
      search(value);
    }
  };

  //Set the input to the value of a list element and search
  const handleAutoComplateOnClick = (e, index, ul) => {
    const value = ul[index];
    setInput(value);
    search(value);
  };

  return (
    <div onSubmit={onSubmit} className="form-container">
      <form>
        <div className="search-container">
          <div className="input-wrapper">
            <div className="input">
              <input
                type="text"
                name="input"
                placeholder="Ingredient"
                autoComplete="off"
                value={input}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={removeAutocompFocus}
              />
              {dropDownShown && (
                <Autocomplates
                  listItems={autoCompList}
                  focus={autocompFocus}
                  onKeyDown={handleAutoComplateOnKeyDowns}
                  onClick={handleAutoComplateOnClick}
                />
              )}
            </div>
            <button type="submit" className="btn">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
        {alert && <Alert />}
      </form>
      {dropDownShown && (
        <div
          className="background-element"
          style={{ height: `${window.document.body.offsetHeight + 500}px` }}
          onClick={hideDropDown}
        ></div>
      )}
    </div>
  );
};

export default FridgeSearchbar;
