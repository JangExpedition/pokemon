import axios from "axios";
import React, { useEffect, useState } from "react";

const PokemonCard = ({ pokemon }) => {
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    getPokemonData(pokemon);
  }, []);

  const getPokemonData = async (pokemon) => {
    try {
      const response = await axios.get(pokemon.url);
      console.log(response.data.sprites.other["official-artwork"].front_default);
      setPokemonData({
        id: response.data.id,
        image: response.data.sprites.other["official-artwork"].front_default,
        name: response.data.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="PokemonCard">
      <p>#{String(pokemonData?.id).padStart(3, "0")}</p>
      <div className="pokemon-image-wrapper">
        <img src={pokemonData?.image} />
      </div>
      <div className="pokemon-name-wrapper">
        <span className="pokemon-name">{pokemonData.name?.toUpperCase()}</span>
      </div>
    </div>
  );
};

export default PokemonCard;
