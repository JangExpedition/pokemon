import React from "react";

const Header = () => {
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

export default Header;
