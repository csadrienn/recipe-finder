import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ checkbox: { id, value, checked }, name, onChange }) => {
  return (
    <div className="filter-checkbox">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={e => onChange(e.target.id, e.target.name)}
      />
      <label htmlFor={id}>{value}</label>
    </div>
  );
};

Checkbox.prototypes = {
  checkbox: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
