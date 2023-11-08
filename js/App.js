import axios from "axios";
import "../scss/main.scss";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import PokemonCard from "../components/PokemonCard";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(15);
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;

  useEffect(() => {
    fetchPokemonData();
  }, [limit]);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(url);
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const showMore = () => {
    setLimit(limit + 15);
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
      <div className="button-wrapper">
        <button
          className="show-more-button"
          onClick={() => {
            showMore();
          }}
        >
          더보기
        </button>
      </div>
    </div>
  );
};
createRoot(document.getElementById("app")).render(<App />);
