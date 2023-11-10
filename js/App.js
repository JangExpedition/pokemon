import axios from "axios";
import "../scss/main.scss";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import PokemonCard from "../components/PokemonCard";
import Header from "../components/Header";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(15);
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`;

  const searchHandler = async (e) => {
    if (e.target.value.length > 0) {
      try {
        const response = await axios(`https://pokeapi.co/api/v2/pokemon/${e.target.value}`);
        const pokemon = response.data;
        setPokemons([pokemon]);
      } catch (error) {
        setPokemons([]);
        console.log(error);
      }
    } else {
      fetchPokemonData();
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, [limit]);

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(url);
      setPokemons(response.data.results);
    } catch (error) {
      setPokemons([]);
      console.log(error);
    }
  };

  const showMore = () => {
    setLimit(limit + 15);
  };

  return (
    <div className="App">
      <Header searchHandler={searchHandler} />
      <div className="pokemon-container">
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => <PokemonCard key={pokemon.url} pokemon={pokemon} />)
        ) : (
          <h1 className="no-pokemon">포켓몬이 없습니다.</h1>
        )}
      </div>
      <div className="button-wrapper">
        <button
          className="button"
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
