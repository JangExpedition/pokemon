import React from "react";
import PokemonSearchForm from "./PokemonSearchForm";

const Header = ({ searchHandler, pokemonsNameList }) => {
  return (
    <header className="Header">
      <img
        className="logo"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        onClick={() => {
          window.location.href = "/";
        }}
      ></img>
      <PokemonSearchForm searchHandler={searchHandler} pokemonsNameList={pokemonsNameList} />
      <button className="button">로그인</button>
    </header>
  );
};

export default Header;
