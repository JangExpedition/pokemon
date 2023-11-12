import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPokemonData(pokemon);
  }, []);

  const getPokemonData = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      setPokemonData({
        id: response.data.id,
        image: response.data.sprites.other["official-artwork"].front_default,
        name: response.data.name,
        type: response.data.types[0].type.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link to={`/pokemon/${pokemonData?.name}`} className="PokemonCard">
      <p className={`${pokemonData?.type}`}>#{String(pokemonData?.id).padStart(3, "0")}</p>
      <div className="pokemon-image-wrapper">
        {loading && (
          <div className="loading">
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
      <div className={`pokemon-name-wrapper ${pokemonData?.type}`}>
        <span className="pokemon-name">{pokemonData.name?.toUpperCase()}</span>
      </div>
    </Link>
  );
};

export default PokemonCard;
