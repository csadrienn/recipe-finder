import React, { Fragment, useState, useEffect } from "react";
import Checkboxes from "./Checkboxes";
import PropTypes from "prop-types";

const Filters = ({ checkboxLists, toggleChecked }) => {
  const [filterDown, setFilterDown] = useState({});

  //Set the filters with false values
  useEffect(() => {
    const filters = {};
    Object.keys(checkboxLists).forEach(listName => (filters[listName] = false));
    setFilterDown(filters);
    // eslint-disable-next-line
  }, []);

  //Toggle filter's visibility
  const toggleFilter = name => {
    const newFilterDown = { ...filterDown };
    Object.keys(newFilterDown).forEach(el => {
      el === name ? (newFilterDown[el] = !newFilterDown[el]) : (newFilterDown[el] = false);
    });
    setFilterDown(newFilterDown);
  };

  //Close all the filters
  const closeFilters = name => {
    const newFilterDown = { ...filterDown };
    Object.keys(newFilterDown).forEach(el => {
      if (el === name) {
        newFilterDown[el] = false;
      }
    });
    setFilterDown(newFilterDown);
  };

  return (
    <ul className="filters">
      {Object.keys(checkboxLists).map((checkboxList, index) => {
        return (
          <Fragment key={checkboxList + index}>
            {filterDown[checkboxList] && (
              <div
                className="background-element"
                style={{ height: `${window.document.body.offsetHeight + 500}px` }}
                onClick={() => closeFilters(checkboxList)}
              ></div>
            )}
            <li className="filter">
              <button
                type="button"
                className="filter-btn"
                onClick={() => toggleFilter(checkboxList)}
              >
                {checkboxList}
                <i
                  className={
                    filterDown[checkboxList] ? "fas fa-caret-up caret" : "fas fa-caret-down caret"
                  }
                />
              </button>

              {filterDown[checkboxList] && (
                <Checkboxes
                  checkboxList={checkboxLists[checkboxList]}
                  name={checkboxList}
                  toggleChecked={toggleChecked}
                />
              )}
            </li>
          </Fragment>
        );
      })}
    </ul>
  );
};

Filters.prototypes = {
  checkboxLists: PropTypes.object.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};

export default Filters;
