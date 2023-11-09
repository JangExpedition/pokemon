import axios from "axios";
import React from "react";

const PokemonSearchForm = ({ searchHandler }) => {
  return (
    <form className="PokemonSearchFrom">
      <input
        type="text"
        className="pokemon-search"
        onChange={(e) => {
          searchHandler(e);
        }}
      ></input>
      <button type="submit" className="search-button">
        검색
      </button>
    </form>
  );
};

export default PokemonSearchForm;
