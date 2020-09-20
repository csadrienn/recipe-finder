import React from "react";
import Searchbar from "../searchbar/main-search/Searchbar";
import Recipes from "../recipes/Recipes";
import "./Search.css";

const Search = () => {
  return (
    <div style={{ padding: "1rem 2rem" }}>
      <Searchbar />
      <Recipes path="search" />
    </div>
  );
};

export default Search;
