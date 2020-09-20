import React, { Fragment } from "react";
import PropTypes from "prop-types";

const SelectedArea = ({ selectedBoxes, removeSelected, removeAll }) => {
  return (
    <Fragment>
      <ul className="selected-boxes">
        {selectedBoxes.map(selectedBox => (
          <li key={selectedBox.id} className="selected-box">
            <span>{selectedBox.value}</span>
            <button
              type="button"
              className="remove-btn"
              onClick={() => removeSelected(selectedBox.id, selectedBox.name)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="remove-all-btn" onClick={removeAll}>
        Clear All
      </button>
    </Fragment>
  );
};

SelectedArea.prototypes = {
  selectedBoxes: PropTypes.array.isRequired,
  removeSelected: PropTypes.func.isRequired,
  removeAll: PropTypes.func.isRequired,
};

export default SelectedArea;
