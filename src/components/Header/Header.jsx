import "./Header.style.scss";
import React from "react";

export const Header = () => {
  return (
    <header className="Header">
      <img
        className="logo"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        onClick={() => {
          window.location.href = "/";
        }}
      ></img>
    </header>
  );
};
