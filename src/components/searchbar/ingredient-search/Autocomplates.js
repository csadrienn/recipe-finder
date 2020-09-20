import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Autocomplates = ({ listItems, focus, onKeyDown, onClick }) => {
  const suggestionEl = useRef(null);

  //Changes the focus of list element when the focus prop changes
  useEffect(() => {
    if (focus !== null) {
      const list = suggestionEl.current.children;
      if (focus === -1) {
        list[0].focus();
      }

      for (let i = 0; i < list.length; i++) {
        focus === i && list[i].focus();
      }
    }
  }, [focus]);

  return (
    <div className="autocomplate-suggestions">
      <ul ref={suggestionEl}>
        {listItems.map((listItem, index, ul) => (
          <li
            key={index}
            tabIndex="-1"
            onKeyDown={e => onKeyDown(e, index, ul)}
            onClick={e => onClick(e, index, ul)}
          >
            {listItem}
          </li>
        ))}
      </ul>
    </div>
  );
};

Autocomplates.prototypes = {
  listItems: PropTypes.array.isRequired,
  focus: PropTypes.number.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Autocomplates;
