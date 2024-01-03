import styles from "./PokemonCard.module.scss";

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPokemonData } from "../../api/api";

export const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonData(pokemon.url).then((data) => {
      setPokemonData(data);
    });
  }, []);

  return (
    <Link to={`/pokemon/${pokemonData?.name}`} className={styles.card}>
      <p>#{String(pokemonData?.id).padStart(3, "0")}</p>
      <div className={styles.pokemonImageWrapper}>
        {loading && (
          <div className={styles.loading}>
            <span>...loading</span>
          </div>
        )}
        <img
          src={pokemonData?.image}
          alt={pokemonData?.name}
          loading="lazy"
          onLoad={() => {
            setLoading(false);
          }}
        />
      </div>
      <div className={`${styles.pokemonNameWrapper} type-${pokemonData?.type}`}>
        <span className={styles.pokemonName}>{pokemonData.name?.toUpperCase()}</span>
      </div>
    </Link>
  );
};
