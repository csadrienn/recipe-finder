import React, { Fragment, useState, useEffect, useContext } from "react";

import SelectedArea from "./SelectedArea";
import Filters from "./Filters";
import { checkboxLists as chLists } from "./checkboxList";
import RecipeContext from "../../../context/recipeContext";
import PropTypes from "prop-types";

const FilterArea = ({ shown }) => {
  const recipeContext = useContext(RecipeContext);
  const [checkboxLists, setcheckboxLists] = useState(chLists);
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const { text } = recipeContext;

  useEffect(() => {
    clearFilters();
    // eslint-disable-next-line
  }, [text]);

  // Find the selected chexbox and toggles it's checked attribute
  const toggleChecked = (selectedId, selectedName) => {
    const newcheckboxLists = { ...checkboxLists };
    Object.keys(newcheckboxLists).forEach(key => {
      if (key === selectedName) {
        newcheckboxLists[key].forEach(checkbox => {
          if (checkbox.id === selectedId) {
            checkbox.checked = !checkbox.checked;
          }
        });
      }
    });
    setcheckboxLists(newcheckboxLists);
    sendSelectedToContext();
  };

  // Filter the checked elements and pass the updated list to the recipe context
  const sendSelectedToContext = () => {
    let selected = [];
    const filtered = { ...checkboxLists };
    Object.keys(filtered).forEach(listName => {
      const checkedElement = filtered[listName].filter(el => el.checked);
      checkedElement.forEach(el => (el.name = listName));
      filtered[listName] = checkedElement;
      selected = selected.concat(checkedElement);
    });
    setSelectedBoxes(selected);
    recipeContext.updateRecipes(filtered);
  };

  //Remove all from selectedBoxes list
  const removeAllSelected = () => {
    clearFilters();
    recipeContext.searchRecipes(text);
  };

  // Clear all the filters
  const clearFilters = () => {
    const newcheckboxLists = { ...checkboxLists };
    Object.keys(newcheckboxLists).forEach(key => {
      newcheckboxLists[key].forEach(checkbox => {
        checkbox.checked = false;
      });
    });
    setSelectedBoxes([]);
    setcheckboxLists(newcheckboxLists);
  };

  return (
    <Fragment>
      {shown && <Filters checkboxLists={checkboxLists} toggleChecked={toggleChecked} />}
      {selectedBoxes.length > 0 && (
        <SelectedArea
          selectedBoxes={selectedBoxes}
          removeSelected={toggleChecked}
          removeAll={removeAllSelected}
        />
      )}
    </Fragment>
  );
};

FilterArea.propTypes = {
  shown: PropTypes.bool.isRequired,
};

export default FilterArea;
