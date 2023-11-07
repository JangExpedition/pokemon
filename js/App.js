import axios from "axios";
import "../scss/main.scss";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import PokemonCard from "../components/PokemonCard";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=1008&offset=0";

  useEffect(() => {
    fetchPokemonData();
  }, []);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(url);
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h1>Hello World!</h1>
      <div className="pokemon-container">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => <PokemonCard key={pokemon.url} pokemon={pokemon} />)
        ) : (
          <h1>포켓몬이 없습니다.</h1>
        )}
      </div>
    </div>
  );
};
createRoot(document.getElementById("app")).render(<App />);
