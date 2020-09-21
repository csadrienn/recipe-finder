import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [burgerClicked, setBurgerClicked] = useState(false);

  const onClick = () => setBurgerClicked(!burgerClicked);

  return (
    <nav>
      <div className="logo-container">
        <Link to="/" className="logo" onClick={onClick}>
          <h1>Recipe Finder</h1>
        </Link>
        <div className={`burger${burgerClicked ? " toggled" : ""}`} onClick={onClick}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      </div>

      <ul className={`nav-links${burgerClicked ? " toggled" : ""}`}>
        <li className="nav-link">
          <Link to="/" onClick={onClick}>
            Search
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/fridge" onClick={onClick}>
            What's in your fridge?
          </Link>
        </li>
        <li className="nav-link">
          <Link to="/about" onClick={onClick}>
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
