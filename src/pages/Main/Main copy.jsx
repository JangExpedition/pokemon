import styles from "./Main.module.scss";

import React, { useEffect, useRef, useState } from "react";

import { PokemonCard, PokemonSearchForm } from "../../components";

import { ALL_POKEMONS_URL, getAllPokemon } from "../../api/api";

const Main = () => {
  const [pokemons, setPokemons] = useState([]); // 전체 포켓몬 리스트
  const [displayPokemon, setDisplayPokemon] = useState([]); // 화면에 보여질 포켓몬 리스트
  const [pokemonsNameList, setPokemonsNameList] = useState([]); // 포켓몬 이름 리스트
  const [totalLength, setTotalLength] = useState(0); // 전체 길이
  const [limit, setLimit] = useState(15); // 화면에 보여질 포켓몬 개수

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageEnd = useRef();

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
      getAllPokemon(ALL_POKEMONS_URL).then((result) => {
        setPokemons(result);
        setTotalLength(result.length);
        setDisplayPokemon(result.slice(0, limit));
      });
      setSearchData([]);
    } catch (error) {
      setPokemons([]);
      setTotalLength(0);
      console.log(error);
    }
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      //옵져버 탐색 시작
      observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <>
      <PokemonSearchForm
        searchHandler={searchHandler}
        pokemonsNameList={pokemonsNameList}
        setLimit={setLimit}
      />
      <div className={styles.pokemonContainer}>
        {displayPokemon.length > 0 ? (
          displayPokemon.map((pokemon) => <PokemonCard key={pokemon.url} pokemon={pokemon} />)
        ) : (
          <h1 className={styles.noPokemon}>포켓몬이 없습니다.</h1>
        )}
      </div>
      <div ref={pageEnd}>...loading</div>
    </>
  );
};

export default Main;
