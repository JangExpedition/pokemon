import axios from "axios";
import "../../scss/main.scss";
import React, { useEffect, useState } from "react";
import PokemonCard from "../../components/PokemonCard";
import PokemonSearchForm from "../../components/PokemonSearchForm";

const MainPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const allPokemonUrl = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  const [displayPokemon, setDisplayPokemon] = useState([]);
  const [pokemonsNameList, setPokemonsNameList] = useState([]);
  const [totalLength, setTotalLength] = useState(0);
  const [limit, setLimit] = useState(15);

  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (searchData.length) {
      setDisplayPokemon(searchData.slice(0, limit));
      setTotalLength(searchData.length);
    } else {
      setDisplayPokemon(pokemons.slice(0, limit));
      setTotalLength(pokemons.length);
    }
  }, [limit]);

  useEffect(() => {
    if (searchData.length > 0) {
      setTotalLength(searchData.length);
      setDisplayPokemon(searchData.slice(0, limit));
      setPokemonsNameList(searchData.map((pokemon) => pokemon.name));
    }
  }, [searchData]);

  const searchHandler = (value) => {
    if (value.length > 0) {
      console.log(value);
      setSearchData(pokemons.filter((pokemon) => pokemon.name.includes(value)));
    } else {
      fetchPokemonData();
    }
  };

  const fetchPokemonData = async () => {
    try {
      const response = await axios.get(allPokemonUrl);
      const results = response.data.results;
      setPokemons(results);
      setTotalLength(results.length);
      setDisplayPokemon(results.slice(0, limit));
      setSearchData([]);
    } catch (error) {
      setPokemons([]);
      setTotalLength(0);
      console.log(error);
    }
  };

  const showMore = () => {
    setLimit(limit + 15);
  };

  return (
    <div className="MainPage">
      <PokemonSearchForm searchHandler={searchHandler} pokemonsNameList={pokemonsNameList} setLimit={setLimit} />
      <div className="pokemon-container">
        {displayPokemon.length > 0 ? (
          displayPokemon.map((pokemon) => <PokemonCard key={pokemon.url} pokemon={pokemon} />)
        ) : (
          <h1 className="no-pokemon">포켓몬이 없습니다.</h1>
        )}
      </div>
      {displayPokemon.length < totalLength && (
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
      )}
    </div>
  );
};

export default MainPage;
