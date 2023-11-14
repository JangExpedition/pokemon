import axios from "axios";
import "../../scss/main.scss";
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard";
import { useDebounce } from "../../hooks/useDebounce";

const MainPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const allPokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  const [displayPokemon, setDisplayPokemon] = useState([]);
  const [pokemonsNameList, setPokemonsNameList] = useState([]);
  const [limit, setLimit] = useState(15);

  const [searchValue, setSearchValue] = useState("");
  const debounceValue = useDebounce(searchValue, 1000);

  useEffect(() => {
    fetchPokemonData();
  }, [limit]);

  useEffect(() => {
    searchHandler(debounceValue);
  }, [debounceValue]);

  const searchHandler = (value) => {
    if (value.length > 0) {
      setDisplayPokemon(pokemons.filter((pokemon) => pokemon.name.includes(value)));
      setPokemonsNameList(pokemons.filter((pokemon) => pokemon.name.includes(value)).map((pokemon) => pokemon.name));
    } else {
      fetchPokemonData();
    }
  };

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(allPokemonUrl);
      setPokemons(response.data.results);
      setDisplayPokemon(response.data.results.slice(0, limit));
    } catch (error) {
      setPokemons([]);
      console.log(error);
    }
  };

  const showMore = () => {
    setLimit(limit + 15);
  };

  return (
    <div className="MainPage">
      <div className="pokemon-container">
        {displayPokemon.length > 0 ? (
          displayPokemon.map((pokemon) => <PokemonCard key={pokemon.url} pokemon={pokemon} />)
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

export default MainPage;
