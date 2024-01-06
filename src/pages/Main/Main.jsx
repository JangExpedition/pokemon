import styles from "./Main.module.scss";

import React, { useEffect, useRef, useState } from "react";

import { PokemonCard } from "../../components";

import { getPokemonList } from "../../api/api";

const Main = () => {
  const [pokemons, setPokemons] = useState([]); // 화면에 표시될 리스트
  const [page, setPage] = useState(1); // 페이지
  const [loading, setLoading] = useState(false); // 로딩중인지 아닌지
  const pageEnd = useRef(); // 관찰 대상

  // 페이지가 변화하면 포켓몬 리스트를 더 요청한다.
  useEffect(() => {
    fetchPokemonData(page);
  }, [page]);

  // 데이터 로딩이 끝나면 observer 객체를 생성하고 관찰 대상 전체가 교차 영역으로 진입하면 실행한다.
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 } // 관찰 대상 전체가 진입 했을 때 콜백 실행
      );
      observer.observe(pageEnd.current); // 관찰 시작
    }
  }, [loading]);

  // 데이터를 가져오고 나면 로딩이 완료됐음을 알려준다.
  const fetchPokemonData = async (page) => {
    try {
      getPokemonList(page).then((result) => {
        setPokemons(result);
        setLoading(true);
      });
    } catch (error) {
      setPokemons([]);
      console.log(error);
    }
  };

  // 페이지를 수를 올려준다.
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.pokemonContainer}>
        {pokemons.length > 0 ? (
          <>
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
            <div className={styles.loading} ref={pageEnd}>
              <span>...loading</span>
            </div>
          </>
        ) : (
          <h1 className={styles.noPokemon}>포켓몬이 없습니다.</h1>
        )}
      </div>
    </>
  );
};

export default Main;
