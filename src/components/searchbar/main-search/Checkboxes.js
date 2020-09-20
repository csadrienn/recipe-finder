import React from "react";
import Checkbox from "./Checkbox";
import PropTypes from "prop-types";

const Checkboxes = ({ checkboxList, name, toggleChecked }) => {
  return (
    <div className="filter-checkboxes">
      {checkboxList.map(checkbox => {
        return (
          <Checkbox key={checkbox.id} checkbox={checkbox} name={name} onChange={toggleChecked} />
        );
      })}
    </div>
  );
};

Checkboxes.prototypes = {
  checkboxList: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  toggleChecked: PropTypes.func.isRequired,
};

export default Checkboxes;
