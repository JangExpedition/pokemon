// Main.tsx
import styles from "./Main.module.scss";
import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPokemonList } from "../../slice/pokemonSlice";
import { RootState } from "../../store/store";
import { PokemonCard } from "../../components";
import { PokemonData } from "../../type/global.type";

const Main = () => {
  const dispatch = useDispatch();
  const pokemons: PokemonData[] = useSelector((state: RootState) => state.pokemon.list);
  const loading = useSelector((state: RootState) => state.pokemon.loading);
  const error = useSelector((state: RootState) => state.pokemon.error);
  const pageEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            console.log("교차!");
            dispatch(fetchPokemonList());
          }
        },
        { threshold: 1 }
      );
      if (pageEnd.current instanceof HTMLDivElement) observer.observe(pageEnd.current);
    }
  }, [loading]);

  return (
    <>
      <div className={styles.pokemonContainer}>
        {pokemons.length > 0 ? (
          <>
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
            <div className={styles.loading} ref={pageEnd}>
              <span>{loading ? "...loading" : ""}</span>
            </div>
          </>
        ) : (
          <h1 className={styles.noPokemon}>{error || "포켓몬이 없습니다."}</h1>
        )}
      </div>
    </>
  );
};

export default Main;
