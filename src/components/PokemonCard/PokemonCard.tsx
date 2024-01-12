import styles from "./PokemonCard.module.scss";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PokemonCardProps } from "./PokemonCard.type";

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const [loading, setLoading] = useState(true);

  return (
    <Link to={`/pokemon/${pokemon?.id}`} className={styles.card}>
      <p>#{String(pokemon?.id).padStart(3, "0")}</p>
      <div className={styles.pokemonImageWrapper}>
        {loading && (
          <div className={styles.loading}>
            <span>...loading</span>
          </div>
        )}
        <img
          src={pokemon?.image}
          alt={pokemon?.name}
          loading="lazy"
          onLoad={() => {
            setLoading(false);
          }}
        />
      </div>
      <div className={`${styles.pokemonNameWrapper} type-back-${pokemon?.types[0].en}`}>
        <span className={styles.pokemonName}>{pokemon.name}</span>
      </div>
    </Link>
  );
};
